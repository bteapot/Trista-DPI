//
// Обработка картинок
//
// v1.0
//
// Денис Либит
// Студия КолорБокс
// denis@boxcolor.ru
// www.boxcolor.ru
// -----------------------------------------------------------------------------------

#target indesign

var myAppVersion;

var myStatusWindow;
var myStatusWindowPhase;
var myStatusWindowObject;
var myStatusWindowGauge;

var myPreferences = {};
var myPreferencesFileName;
var myTempFolder;

var mySmallFont;
var myHeaderColor = [0.1, 0.1, 0.1];

var myDocuments = {};
var myPages = [];
var myGraphics = {};
var myActiveDocument;

const keyDocumentsObject = "documentsObject";
const keyDocumentsName = "documentsName";
const keyDocumentsLinksTotal = "documentsLinksTotal";
const keyDocumentsLinksBad = "documentsLinksBad";
const keyDocumentsBackupList = "documentsBackupList";

const keyGraphicsName = "graphicsName";
const keyGraphicsNewFilePath = "graphicsNewFilePath";
const keyGraphicsDoRelink = "graphicsDoRelink";
const keyGraphicsWrongFormat = "graphicsWrongFormat";
const keyGraphicsLowestDPI = "graphicsLowestDPI";
const keyGraphicsHasClippingPath = "graphicsHasClippingPath";
const keyGraphicsWithinBleeds = "graphicsWithinBleeds";
const keyGraphicsObjectList = "graphicsObjectList";

const keyListItemDocument = "listItemObject";

var myFlagStopExecution = false;

var myAllDocsCode = 0;
var myActiveDocCode = 1;
var mySelectedPagesCode = 2;
var mySelectedImagesCode = 3;
var myScopeOptions = [
	[myAllDocsCode, "Все открытые документы"], // Code, UI text
	[myActiveDocCode, "Активный документ"],
	[mySelectedPagesCode, "Выбранные страницы"],
	[mySelectedImagesCode, "Выбранные изображения"]];



main();

// "Стартую!" (эпитафия на могиле Неизвестной Секретарши)
// ------------------------------------------------------
function main() {
	if (!initialSettings()) return;
	if (!makeStatusWindow()) return;
	if (!checkDocuments()) return;
	if (!displayPreferences()) return;
	if (!checkGraphics()) return;
	if (!backupImages()) return;
	if (!processImages()) return;
	if (!relinkImages()) return;
	if (!saveDocuments()) return;
}

// Стартовые настройки
// ------------------------------------------------------
function initialSettings() {
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	app.scriptPreferences.enableRedraw = true;
	
	myAppVersion = Number(app.version.match(/^\d+/));
	
	// Настройки по умолчанию
	myPreferences["changeFormat"] = true;
	myPreferences["clippedImagesToPSD"] = true;
	myPreferences["removeClipping"] = true;
	myPreferences["deleteOriginals"] = true;
	
	myPreferences["targetDPI"] = 300;
	
	myPreferences["scope"] = 1;
	
	myPreferences["includePasteboard"] = false;
	
	myPreferences["downsample"] = true;
	myPreferences["downsampleThreshold"] = 300;
	myPreferences["upsample"] = false;
	myPreferences["upsampleThreshold"] = 300;
	
	myPreferences["backup"] = true;
	
	// Определение платформы
	if ($.os.toLowerCase().indexOf("macintosh") != -1) {
		// Маки
		myPreferencesFileName = "~/Library/Preferences/ru.colorbox.trista-dpi.txt";
		myPreferences["backupFolder"] = Folder.encode(Folder.myDocuments + "/300dpi backup/");
		myTempFolder = Folder.temp + "/";
	} else if ($.os.toLowerCase().indexOf("windows") != -1) {
		// Виндовз
		myPreferencesFileName = Folder.userData + "/ru.colorbox.trista-dpi.txt";
		myPreferences["backupFolder"] = Folder.encode(Folder.myDocuments + "/300dpi backup/");
		myTempFolder = Folder.temp + "/";
	}

	// Загрузить настройки
	var myPreferencesFile = new File(myPreferencesFileName);
	if (myPreferencesFile.exists) {
		var myPreferencesFile = new File(myPreferencesFileName);
		if (myPreferencesFile.open("r")) {
			var myPreferencesArray = myPreferencesFile.read(myPreferencesFile.length).split("\n");
			var myPreferenceRecord = [];
			
			for (i = 0; i < myPreferencesArray.length; i++) {
				myPreferenceRecord = myPreferencesArray[i].split("\t");
				if (myPreferenceRecord[1] == "boolean") {
					myPreferences[myPreferenceRecord[0]] = (myPreferenceRecord[2] == "true");
				} else if (myPreferenceRecord[1] == "number") {
					myPreferences[myPreferenceRecord[0]] = Number(myPreferenceRecord[2]);
				} else {
					myPreferences[myPreferenceRecord[0]] = myPreferenceRecord[2];
				}
			}
			
			myPreferencesFile.close();
		} else {
			alert("Ошибка при чтении настроек.\nТо-есть файл-то с настройками есть, да вот открыть его не получается.\n\nВыполнение скрипта прекращаем.");
			return false;
		}
	}
	
	return true;
}

// Соберём окно с градусником
// ------------------------------------------------------
function makeStatusWindow() {
	var myPanelWidth = 300;
	
	// Собираем палитру
	myStatusWindow = new Window("palette", "Выполнение");
	myStatusWindow.orientation = "row";
	myStatusWindow.alignChildren = ["fill", "top"];
	
	// Константы
	mySmallFont = myStatusWindow.graphics.font = ScriptUI.newFont("dialog", "Regular", 10);
	
	// Область отображения статусных данных
	var myDisplayZone = myStatusWindow.add("group");
	myDisplayZone.orientation = "column";
	myDisplayZone.minimumSize.width = myPanelWidth;
	myDisplayZone.maximumSize.width = myPanelWidth;
	myDisplayZone.alignChildren = ["fill", "top"];
	
	// Элементы статусных данных
	
	// Фаза
	myStatusWindowPhase = myDisplayZone.add("statictext", undefined, "");
	myStatusWindowPhase.minimumSize.height = 30;
	myStatusWindowPhase.alignment = ["fill", "top"];
	myStatusWindowPhase.justify = "left";
	myStatusWindowPhase.graphics.font = ScriptUI.newFont("dialog", "Bold", 12);
	myStatusWindowPhase.graphics.foregroundColor = myStatusWindowPhase.graphics.newPen(myStatusWindowPhase.graphics.PenType.SOLID_COLOR, myHeaderColor, 1);
	
	// Объект и градусник
	myStatusWindowObject = myDisplayZone.add("statictext", undefined, "");
	myStatusWindowObject.alignment = ["fill", "top"];
	myStatusWindowObject.justify = "left";
	myStatusWindowObject.graphics.font = mySmallFont;
	
	myStatusWindowGauge = myDisplayZone.add ("progressbar", undefined, 0, 100);
	
	// Область отображения кнопок
	var myButtonsGroup = myStatusWindow.add("group");
	myButtonsGroup.orientation = "column";
	myButtonsGroup.alignment = ["right", "bottom"];
	
	// Кнопки окошка
	var myCancelButton = myButtonsGroup.add("button", undefined, "Отмена", {name: "cancel"});
	myCancelButton.onClick = function() {
		myFlagStopExecution = true;
	}
	
	return true;
}

// Покажем статус в окне с градусником
// ------------------------------------------------------
function showStatus(myPhase, myObject, myGaugeCurrent, myGaugeMax) {
	if (!myStatusWindow.visible) myStatusWindow.show();
	
	// Обновим что нужно
	if (myPhase != undefined) myStatusWindowPhase.text = myPhase;
	if (myObject != undefined) myStatusWindowObject.text = myObject;
	if (myGaugeCurrent != undefined) myStatusWindowGauge.value = myGaugeCurrent;
	if (myGaugeMax != undefined) myStatusWindowGauge.maxvalue = myGaugeMax;
	
	// Отрисуем окошко
	if (myAppVersion >= 6) { myStatusWindow.update(); }
}

// Спрячем окно с градусником
// ------------------------------------------------------
function hideStatus() {
	// Очистим окошко
	myStatusWindowPhase.text = "";
	myStatusWindowObject.text = "";
	myStatusWindowGauge.value = 0;
	myStatusWindowGauge.maxvalue = 1;
	
	if (myAppVersion >= 6) { myStatusWindow.update(); }
	myStatusWindow.hide();
}

// Проверим открытые документы
// ------------------------------------------------------
function checkDocuments() {
	if (app.documents.length == 0) {
		alert("Невозможно работать в таких условиях.\nДля начала откройте хотя бы один документ, что-ли.");
		return false;
	}
	
	showStatus("ПРОВЕРКА ОТКРЫТЫХ ДОКУМЕНТОВ", "", 0, app.documents.length);
	
	for (var i = 0; i < app.documents.length; i++) {
		var myDocument = app.documents[i];
		
		showStatus(undefined, myDocument.name, i, undefined);
		
		// Посчитаем и разберём линки
		var myLinksNormal = 0;
		var myLinksOutOfDate = 0;
		var myLinksMissing = 0;
		var myLinksEmbedded = 0;
		
		for (var n = 0; n < myDocument.links.length; n++) {
			
			switch (myDocument.links[n].status) {
				case LinkStatus.NORMAL:
					myLinksNormal++;
					break;
				case LinkStatus.LINK_OUT_OF_DATE:
					myLinksOutOfDate++;
					break;
				case LinkStatus.LINK_MISSING:
					myLinksMissing++;
					break;
				case LinkStatus.LINK_EMBEDDED:
					myLinksEmbedded++;
					break;
				default:
					break;
			}
		}
		
		// Проверим, сохранён ли документ
		if (myDocument.modified) {
			if (!confirm("Документ " + myDocument.name + " изменён с момента последнего сохранения.\nЧтобы продолжить выполнение скрипта, документ необходимо сохранить.\n\nСохранить и продолжить?"))
				return false;
			myDocument.save();
		}
		
		// Добавим документ в список
		var myDocumentPath = myDocument.fullName;
		myDocuments[myDocumentPath] = {};
		myDocuments[myDocumentPath][keyDocumentsName] = myDocument.name;
		myDocuments[myDocumentPath][keyDocumentsObject] = myDocument;
		myDocuments[myDocumentPath][keyDocumentsLinksTotal] = myDocument.links.length;
		myDocuments[myDocumentPath][keyDocumentsLinksBad] = myLinksOutOfDate + myLinksMissing;
		myDocuments[myDocumentPath][keyDocumentsBackupList] = {};
		if (myDocument == app.activeDocument) {
			myActiveDocument = myDocumentPath;
		}
		
		if (myFlagStopExecution) { break }
	}
	
	showStatus(undefined, undefined, app.documents.length, undefined);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Покажем диалог с настройками
// ------------------------------------------------------
function displayPreferences() {
	// Собираем диалоговое окно
	var myDialog = new Window("dialog", "Параметры");
	
	// Константы
	var myPanelWidth = 400;
	var mySubPanelMargins = [14, 14, 10, 10];
	var mySubControlMargins = [18, 0, 0, 0];
	var myStatusPanelMargins = [10, 10, 10, 10];
	var mySubControlWidth = 300;
	
	// Картинки интерфейса
	var myCircleGreenData = "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACLSURBVHja1NK9CQJBEIbhZ8X8arAEc8HISLATwQ7kChAEO7n0UnNL2A6Eq2BNVjiOuw0WDPxggvl5YeZjQkpJjVYqVQ2ux0loA2xwxy6Xn7ggpmuaBzP0QjOqnbDHFnFp1dsE+qrBo3TjsXDW4Seu9oXZvgSeMcxAQ+4tgjG71+Gdo5s6CuF/Xu4zALGGGhU58X7YAAAAAElFTkSuQmCC";
	var myCircleRedData = "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACNSURBVHja1NIxCgIxEIXhL7L9nmGPYC9YWQmW3kLwIoLgLSy33dbeI+wNhD1BbCKE4KZYsPDBFJnkH/IeE2KMlmhloRaDTX64hwAdrtik9gNnjMfMVlMM6vBEm/UO2GKNce6rlwL6qMWt5nFfsbX7SapD5e1QA0+YvkBTupsFx5Rej1eqvkwUwv+s3HsAtqYaFURyO9gAAAAASUVORK5CYII=";
	
	// Функция декодирования картинок
	function decode64(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		do {
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);

		return unescape(output);
	}
	
	// Функция записи картинок
	function writePicture(myFileName, myData) {
		var myFile = new File(myTempFolder + myFileName);
		if (myFile.open("w")) {
			myFile.encoding = "BINARY";
			myFile.write(decode64(myData));
			myFile.close();
			return myFile;
		}
	}
	
	// Делаем временные файлы с картинками
	var myCircleGreenFile = writePicture("img_green.png", myCircleGreenData);
	var myCircleRedFile = writePicture("img_red.png", myCircleRedData);
	
	// Поехали
	var myCommonGroup = myDialog.add("group");
	myCommonGroup.orientation = "row";
	
	var myParametersGroup = myCommonGroup.add("group");
	myParametersGroup.orientation = "column";
	myParametersGroup.minimumSize.width = myPanelWidth;
	myParametersGroup.alignChildren = ["fill", "top"];
	
	// Группа изменения формата
	with (myParametersGroup.add("panel", undefined, "Формат файлов")) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
		margins = mySubPanelMargins;
		
		var myChangeFormat = add("checkbox", undefined, "JPEG, PNG и т.п. в TIFF");
		myChangeFormat.onClick = function() {
			myPreferences["changeFormat"] = myChangeFormat.value;
			myChangeFormatGroup.enabled = myChangeFormat.value;
		}
		myChangeFormat.value = myPreferences["changeFormat"];
		
		var myChangeFormatGroup = add("group");
		myChangeFormatGroup.orientation = "column";
		myChangeFormatGroup.alignChildren = ["left", "top"];
		myChangeFormatGroup.margins = mySubControlMargins;
		
		with (myChangeFormatGroup.add("group")) {
			orientation = "column";
			alignChildren = ["fill", "top"];
			
			var myClippedImagesToPSD = add("checkbox", undefined, "С обтравкой в PSD");
			myClippedImagesToPSD.onClick = function() {
				myPreferences["clippedImagesToPSD"] = myClippedImagesToPSD.value;
				myClippingGroup.enabled = myClippedImagesToPSD.value;
			}
			myClippedImagesToPSD.value = myPreferences["clippedImagesToPSD"];
			
			var myClippingGroup = add("group");
			with (myClippingGroup) {
				orientation = "column";
				alignChildren = ["fill", "top"];
				margins = mySubControlMargins;
				
				var myRemoveClipping = add("checkbox", undefined, "Убрать обтравку");
				myRemoveClipping.onClick = function() {
					myPreferences["removeClipping"] = myRemoveClipping.value;
				}
				myRemoveClipping.value = myPreferences["removeClipping"];
			}
		
			var myDeleteOriginals = add("checkbox", undefined, "Удалять оригиналы изображений");
			myDeleteOriginals.onClick = function() {
				myPreferences["deleteOriginals"] = myDeleteOriginals.value;
			}
			myDeleteOriginals.value = myPreferences["deleteOriginals"];
		}
	}
	
	// Группа изменения разрешения
	with (myParametersGroup.add("panel", undefined, "Разрешение (dpi)")) {
		orientation = "row";
		minimumSize.width = myPanelWidth;
		alignChildren = ["left", "bottom"];
		margins = mySubPanelMargins;
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["left", "top"];
			minimumSize.width = myPanelWidth / 4;
			
			var myUpsample = add("checkbox", undefined, "Увеличивать");
			myUpsample.onClick = function() {
				myPreferences["upsample"] = myUpsample.value;
				myUpsampleThreshold.enabled = myUpsample.value;
			}
			myUpsample.value = myPreferences["upsample"];
			
			var myUpsampleThreshold = add("edittext");
			myUpsampleThreshold.characters = 6;
			myUpsampleThreshold.text = myPreferences["upsampleThreshold"];
			myUpsampleThreshold.justify = "right";
			myUpsampleThreshold.onChange = function() {
				if (parseInt(myUpsampleThreshold.text) >= parseInt(myTargetDPI.text)) {
					alert("Логическая ошибка.\nЖелаемое разрешение должно быть больше нижнего порога.");
					myUpsampleThreshold.text = myPreferences["upsampleThreshold"];
					return;
				}
				myPreferences["upsampleThreshold"] = parseInt(myUpsampleThreshold.text);
			}
		}
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["center", "top"];
			
			with (add("statictext", undefined, "<")) {
				justify = "center";
			}
		}
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["left", "top"];
			minimumSize.width = myPanelWidth / 4;
			
			with (add("statictext", undefined, "Желаемое")) {
				justify = "left";
			}
			
			var myTargetDPI = add("edittext");
			myTargetDPI.characters = 6;
			myTargetDPI.text = myPreferences["targetDPI"];
			myTargetDPI.justify = "right";
			myTargetDPI.onChange = function() {
				if (parseInt(myUpsampleThreshold.text) >= parseInt(myTargetDPI.text)) {
					alert("Логическая ошибка.\nЖелаемое разрешение должно быть больше нижнего порога.");
					myTargetDPI.text = myPreferences["targetDPI"];
					return;
				}
				if (parseInt(myTargetDPI.text) >= parseInt(myDownsampleThreshold.text)) {
					alert("Логическая ошибка.\nЖелаемое разрешение должно быть меньше верхнего порога.");
					myTargetDPI.text = myPreferences["targetDPI"];
					return;
				}
				myPreferences["targetDPI"] = parseInt(myTargetDPI.text);
			}
		}
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["center", "top"];
			
			with (add("statictext", undefined, "<")) {
				justify = "left";
			}
		}
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["left", "top"];
			minimumSize.width = myPanelWidth / 4;
			
			var myDownsample = add("checkbox", undefined, "Уменьшать");
			myDownsample.onClick = function() {
				myPreferences["downsample"] = myDownsample.value;
				myDownsampleThreshold.enabled = myDownsample.value;
			}
			myDownsample.value = myPreferences["downsample"];
			
			var myDownsampleThreshold = add("edittext");
			myDownsampleThreshold.characters = 6;
			myDownsampleThreshold.text = myPreferences["downsampleThreshold"];
			myDownsampleThreshold.justify = "right";
			myDownsampleThreshold.onChange = function() {
				if (parseInt(myTargetDPI.text) >= parseInt(myDownsampleThreshold.text)) {
					alert("Логическая ошибка.\nЖелаемое разрешение должно быть меньше верхнего порога.");
					myDownsampleThreshold.text = myPreferences["downsampleThreshold"];
					myDownsampleThreshold.active = false;
					myDownsampleThreshold.active = true;
					return;
				}
				myPreferences["downsampleThreshold"] = parseInt(myDownsampleThreshold.text);
			}
		}
	}
	
	// Группа выбора области деятельности
	var myScopeGroup = myParametersGroup.add("panel", undefined, "Область действия");
	with (myScopeGroup) {
		orientation = "row";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "fill"];
		margins = mySubPanelMargins;
	}
	
	var myScopeControlGroup = myScopeGroup.add("group");
	with (myScopeControlGroup) {
		orientation = "column";
		alignChildren = ["fill", "fill"];
	}
	
	var myScopeRadioGroup = myScopeControlGroup.add("group");
	with (myScopeRadioGroup) {
		orientation = "column";
		//minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
	}
	
	function myButtonClicked() {
		for (var i = 0; i < myScopeRadioGroup.children.length; i++)
			if (myScopeRadioGroup.children[i].value == true) {
				myPreferences["scope"] = i;
				
				// очистить список
				myItemsList.removeAll();
				
				// прореагировать в зависимости от кнопки
				switch (myPreferences["scope"]) {
					case myAllDocsCode:
						// Все открытые документы
						myScopeItemsGroup.enabled = true;
						for (var doc in myDocuments) {
							var newListItem = myItemsList.add("item", myDocuments[doc][keyDocumentsName]);
							newListItem[keyListItemDocument] = doc;
							if (myDocuments[doc][keyDocumentsLinksBad] == 0) {
								newListItem.image = ScriptUI.newImage(myCircleGreenFile);
								myItemsList.selection = myItemsList.items.length - 1;
							} else {
								newListItem.image = ScriptUI.newImage(myCircleRedFile);
							}
						}
						break;
					case myActiveDocCode:
						// Активный документ
						myScopeItemsGroup.enabled = false;
						var newListItem = myItemsList.add("item", myDocuments[myActiveDocument][keyDocumentsName]);
						if (myDocuments[myActiveDocument][keyDocumentsLinksBad] == 0) {
							newListItem.image = ScriptUI.newImage(myCircleGreenFile);
						} else {
							newListItem.image = ScriptUI.newImage(myCircleRedFile);
						}
						break;
					case mySelectedPagesCode:
						// Выбранные страницы
						myScopeItemsGroup.enabled = (myDocuments[myActiveDocument][keyDocumentsLinksBad] == 0);
						for (var n = 0; n < myDocuments[myActiveDocument][keyDocumentsObject].pages.length; n++) {
							var newListItem = myItemsList.add("item", myDocuments[myActiveDocument][keyDocumentsObject].pages[n].name, n);
							newListItem[keyListItemDocument] = myDocuments[myActiveDocument][keyDocumentsObject].pages[n];
							myItemsList.selection = n;
						}
						break;
					case mySelectedImagesCode:
						// Выбранные изображения
						myScopeItemsGroup.enabled = true;
						break;
				}
				myItemsList.onClick();
			}
	}
	
	for (var i = 0; i < myScopeOptions.length; i++) {
		var myButton = myScopeRadioGroup.add("radiobutton", undefined, myScopeOptions[i][1]);
		myButton.value = (i == myActiveDocCode);
		myButton.onClick = myButtonClicked;
		
		if (i == myAllDocsCode) {
			myButton.enabled = (arrayLength(myDocuments) > 1);
		}
		if (i == mySelectedImagesCode) {
			// заглушка
			myButton.enabled = false;
		}
	}
	
	// Брать ли картинки с pasteboard
	with (myScopeControlGroup.add("group")) {
		orientation = "column";
		alignChildren = ["fill", "bottom"];
		margins = [0, 0, 0, 2];
		
		var myIncludePasteboard = add("checkbox", undefined, "Обрабатывать картинки на полях");
		myIncludePasteboard.onClick = function() {
			myPreferences["includePasteboard"] = myIncludePasteboard.value;
		}
		myIncludePasteboard.value = myPreferences["includePasteboard"];
	}
		
	// Список элементов
	var myScopeItemsGroup = myScopeGroup.add("group");
	with (myScopeItemsGroup) {
		orientation = "column";
		minimumSize = [180, 200];
		alignChildren = ["fill", "fill"];
	}
	
	function listItemClicked(item) {
		switch (myPreferences["scope"]) {
			case myAllDocsCode:
				var mySelectedCount = 0;
				for (var i = 0; i < myItemsList.items.length; i++) {
					if (myItemsList.items[i].selected) {
						if (myDocuments[myItemsList.items[i][keyListItemDocument]][keyDocumentsLinksBad] != 0) {
							myItemsList.items[i].selected = false;
						} else {
							mySelectedCount++;
						}
					}
				}
				myOKButton.enabled = (mySelectedCount > 0);
				break;
			case myActiveDocCode:
				myOKButton.enabled = (myDocuments[myActiveDocument][keyDocumentsLinksBad] == 0);
				break;
			case mySelectedPagesCode:
				var mySelectedCount = 0;
				for (var i = 0; i < myItemsList.items.length; i++) {
					if (myItemsList.items[i].selected) {
						mySelectedCount++;
					}
				}
				myOKButton.enabled = (mySelectedCount > 0);
				break;
			case mySelectedImagesCode:
				myOKButton.enabled = true;
				break;
		}
	}
	
	var myItemsList = myScopeItemsGroup.add("listbox", undefined, undefined, {multiselect: true});
	myItemsList.onClick = listItemClicked;
	
	
	// Группа резервного копирования
	with (myParametersGroup.add("panel", undefined, "Резервное копирование")) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
		margins = mySubPanelMargins;
		
		var myDoBackup = add("checkbox", undefined, "Резервное копирование");
		myDoBackup.onClick = function() {
			myPreferences["backup"] = myDoBackup.value;
			myBackupGroup.enabled = myDoBackup.value;
		}
		myDoBackup.value = myPreferences["backup"];
		
		var myBackupGroup = add("group");
		myBackupGroup.orientation = "row";
		myBackupGroup.alignChildren = ["fill", "top"];
		myBackupGroup.margins = mySubControlMargins;

		
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["fill", "top"];
			
			var myBackupPath = add("edittext", undefined, Folder.decode(myPreferences["backupFolder"]));
			myBackupPath.preferredSize.width = mySubControlWidth;
			myBackupPath.onChange = function() {
				myPreferences["backupFolder"] = Folder.encode(myBackupPath.text);
			}
		}
			
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["right", "top"];
			
			var myBackupChooseButton = add("button", undefined, "Выбрать");
			myBackupChooseButton.onClick = function() {
				var mySelectedFolder = Folder.selectDialog();
				if (mySelectedFolder != null) {
					myPreferences["backupFolder"] = Folder.encode(mySelectedFolder.fullName) + "/";
					myBackupPath.text = mySelectedFolder.fullName + "/";
				}
			}
		}
	}
	
	// Группа кнопок диалогового окна
	var myButtonsGroup = myCommonGroup.add("group");
	myButtonsGroup.orientation = "column";
	myButtonsGroup.alignment = ["right", "top"];
	
	var myOKButton = myButtonsGroup.add("button", undefined, "OK", {name: "OK"});
	var myCancelButton = myButtonsGroup.add("button", undefined, "Отмена", {name: "Cancel"});
	
	// Отработать включение/выключение групп
	myChangeFormat.onClick();
	myClippedImagesToPSD.onClick();
	myDoBackup.onClick();
	myDownsample.onClick();
	myUpsample.onClick();
	myScopeRadioGroup.children[0].onClick();
	
	// Показать диалог
	if (myDialog.show() == 2) {
		// Нажата отмена, удалить временные файлы
		myCircleGreenFile.remove();
		myCircleRedFile.remove();
		
		return false;
	}
	
	// Сделать список обрабатываемого
	switch (myPreferences["scope"]) {
		case myAllDocsCode:
			for (var i = 0; i < myItemsList.items.length; i++) {
				if (!myItemsList.items[i].selected) {
					delete myDocuments[myItemsList.items[i][keyListItemDocument]];
				}
			}
			break;
		case myActiveDocCode:
			for (var doc in myDocuments) {
				if (doc != myActiveDocument)
					delete myDocuments[doc];
			}
			break;
		case mySelectedPagesCode:
			for (var i = 0; i < myItemsList.items.length; i++) {
				if (myItemsList.items[i].selected) {
					myPages.push(myItemsList.items[i][keyDocumentsObject]);
				}
			}
			break;
		case mySelectedImagesCode:
			break;
		default:
			return false;
	}
	
	// Сохранить настройки
	var myPreferencesArray = [];
	for (var prf in myPreferences)
		myPreferencesArray.push(prf + "\t" + typeof myPreferences[prf] + "\t" + myPreferences[prf]);
	
	var myPreferencesFile = new File(myPreferencesFileName);
	if (myPreferencesFile.open("w")) {
		myPreferencesFile.write(myPreferencesArray.join("\n"));
		myPreferencesFile.close();
	} else {
		alert("Ошибка при сохранении настроек.\nВообще такого не должно было случиться, поэтому на всякий случай дальнейшее выполнение скрипта отменяется.");
	}
	
	// Удалить временные файлы
	myCircleGreenFile.remove();
	myCircleRedFile.remove();
	
	return true;
}

// Составим список картинок для обработки
// ------------------------------------------------------
function checkGraphics() {
	
	// Функция проверки
	function checkGraphic(myGraphic) {
		try {
			showStatus(undefined, myGraphic.itemLink.name, undefined, undefined);
		} catch (e) {
			showStatus(undefined, "<внедрённая картинка>", undefined, undefined);
		}
		
		// Линк в порядке (не embedded, не missing)?
		try {
			var myGraphicIsOK = true;
			if (!myGraphic.hasOwnProperty("itemLink")) myGraphicIsOK = false;
			if (myAppVersion >= 6) {
				if (!(myGraphic.imageTypeName in {"JPEG":0, "PNG":0, "Windows Bitmap":0, "CompuServe GIF":0, "TIFF":0, "Photoshop":0})) myGraphicIsOK = false;
			} else {
				if (!myGraphic.hasOwnProperty("effectivePpi")) myGraphicIsOK = false;
			}
			//if () myGraphicIsOK = false;
		} catch (e) {
			myGraphicIsOK = false;
		}
		
		// Не впорядке
		if (!myGraphicIsOK) {
			showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
			return;
		}
		
		// Проверим, не попадался уже ли этот файл
		var myGraphicPath = myGraphic.itemLink.filePath;
		if (myGraphicPath in myGraphics) {
			// Попадался
			if (lowestDPI(myGraphic) < myGraphics[myGraphicPath][keyGraphicsLowestDPI]) { myGraphics[myGraphicPath][keyGraphicsLowestDPI] = lowestDPI(myGraphic) }
			if (hasClippingPath(myGraphic)) { myGraphics[myGraphicPath][keyGraphicsHasClippingPath] = true }
			if (withinBleeds(myGraphic)) { myGraphics[myGraphicPath][keyGraphicsWithinBleeds] = true }
			myGraphics[myGraphicPath][keyGraphicsObjectList][myGraphic.id] = myGraphic;
		} else {
			// Не попадался, добавим первое вхождение
			myGraphics[myGraphicPath] = {};
			myGraphics[myGraphicPath][keyGraphicsName] = myGraphic.itemLink.name;
			myGraphics[myGraphicPath][keyGraphicsWrongFormat] = wrongGraphicFormat(myGraphic);
			myGraphics[myGraphicPath][keyGraphicsLowestDPI] = lowestDPI(myGraphic);
			myGraphics[myGraphicPath][keyGraphicsHasClippingPath] = hasClippingPath(myGraphic);
			myGraphics[myGraphicPath][keyGraphicsWithinBleeds] = withinBleeds(myGraphic);
			myGraphics[myGraphicPath][keyGraphicsObjectList] = {};
			myGraphics[myGraphicPath][keyGraphicsObjectList][myGraphic.id] = myGraphic;
		}
		
		showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
	}
	
	// Пройтись по всем картинкам документа
	function checkDocumentImages(myDocument) {
		for (var i = 0; i < myDocument.allGraphics.length; i++) {
			checkGraphic(myDocument.allGraphics[i]);
			if (myFlagStopExecution) { return }
		}
	}
	
	showStatus("ПРОВЕРКА КАРТИНОК", "", 0, 0);
	
	switch (myPreferences["scope"]) {
		case myAllDocsCode:
			var totalImages = 0;
			for (var doc in myDocuments) {
				totalImages += myDocuments[doc][keyDocumentsObject].allGraphics.length;
			}
			showStatus(undefined, undefined, 0, totalImages);
			
			for (var doc in myDocuments) {
				checkDocumentImages(myDocuments[doc][keyDocumentsObject]);
			}
			break;
		case myActiveDocCode:
			showStatus(undefined, undefined, 0, myDocuments[myActiveDocument][keyDocumentsObject].allGraphics.length);
			checkDocumentImages(myDocuments[myActiveDocument][keyDocumentsObject]);
			break;
		case mySelectedPagesCode:
			var totalImages = 0;
			for (var i = 0; i < myPages.length; i++) {
				totalImages += myPages[i].allGraphics.length;
			}
			showStatus(undefined, undefined, 0, totalImages);
			
			for (var i = 0; i < myPages.length; i++) {
				for (var n = 0; n < myPages[i].allGraphics.length; n++) {
					checkGraphic(myPages[i].allGraphics[n]);
					if (myFlagStopExecution) { return false }
				}
			}
			break;
		case mySelectedImagesCode:
			break;
		default:
			return false;
	}
	
	hideStatus();
	
	// Нажата отмена?
	if (myFlagStopExecution) { return false }
	
	// Убрать из списка некриминальные картинки
	for (var grc in myGraphics) {
		var myDoProcess = false;
		
		if ((myPreferences["changeFormat"]) && (myGraphics[grc][keyGraphicsWrongFormat])) { myDoProcess = true }
		if ((myPreferences["upsample"]) && (lowGraphicDPI(myGraphics[grc][keyGraphicsLowestDPI]))) { myDoProcess = true }
		if ((myPreferences["downsample"]) && (highGraphicDPI(myGraphics[grc][keyGraphicsLowestDPI]))) { myDoProcess = true }
		if ((!myPreferences["includePasteboard"]) && (!myGraphics[grc][keyGraphicsWithinBleeds])) { myDoProcess = false }
		
		// Обрабатываем?
		if (myDoProcess) {
			// Добавим все вхождения картинки в подокументный список для бэкапа
			for (var itm in myGraphics[grc][keyGraphicsObjectList]) {
				// получим документ этого вхождения
				var myDocument = documentOfGraphic(myGraphics[grc][keyGraphicsObjectList][itm]);
				
				// картинки ещё нет в списке бэкапа?
				var myItemLink = myGraphics[grc][keyGraphicsObjectList][itm].itemLink;
				var myBackupList = myDocuments[myDocument.fullName][keyDocumentsBackupList];
				if (!(myItemLink.filePath in myBackupList)) {
					myBackupList[myItemLink.filePath] = myItemLink;
				}
			}
		} else {
			delete myGraphics[grc];
		}
	}
	
	// Есть что делать-то?
	if (arrayLength(myGraphics) == 0) {
		alert("Нет картинок, нуждающихся в обработке.\nПоздравляю!");
		return false;
	}
	
	// Убрать из списка документы без картинок под обработку
	for (var doc in myDocuments) {
		if (arrayLength(myDocuments[doc][keyDocumentsBackupList]) == 0) { delete myDocuments[doc] }
	}
	
	return true;
}

// Сохраним оригиналы картинок
// ------------------------------------------------------
function backupImages() {
	// Надо?
	if (!myPreferences["backup"])
		return true;
	
	// Функция бэкапа документа со всеми картинками
	function backupDocument(myItemObject) {
		var myDocument = myItemObject[keyDocumentsObject];
		
		showStatus(undefined, myDocument.name, undefined, undefined);
		
		// Сделаем папку для бэкапа
		var myDate = new Date();
		var myBackupFolderName = myDocument.name + "-" + myDate.getFullYear() + "-" + fillZeros(myDate.getMonth()+1, 2) + "-" + fillZeros(myDate.getDate(), 2) + "-" + fillZeros(myDate.getHours(), 2) + fillZeros(myDate.getMinutes(), 2) + fillZeros(myDate.getSeconds(), 2);
		var myBackupFolder = new Folder(Folder.decode(myPreferences["backupFolder"]) + myBackupFolderName);
		if (!myBackupFolder.create()) {
			alert("Ошибка при создании папки резервных копий\nПроверьте правильность пути, слэш на конце, права доступа и т.п.");
			myFlagStopExecution = true;
			return;
		}
		
		// Вместе с картинками (чего уж там) сохраним и .indd документ
		if (!myDocument.fullName.copy(uniqueFileName(myBackupFolder.fullName, myDocument.name))) {
			alert("Ошибка при резервном копировании файла\n" + myDocument.name + "\n\nПроверьте права доступа, свободное место и т.п.");
			myFlagStopExecution = true;
			return;
		}
		
		// Скопируем оригиналы картинок
		var myBackupList = myItemObject[keyDocumentsBackupList];
		for (var grc in myBackupList) {
			showStatus(undefined, myBackupList[grc].name, myStatusWindowGauge.value + 1, undefined);
			showStatus(undefined,undefined, undefined, undefined);
			
			var myFile = new File(myBackupList[grc].filePath);
			if (!myFile.copy(uniqueFileName(myBackupFolder.fullName, myBackupList[grc].name))) {
				alert("Ошибка при резервном копировании файла\n" + myBackupList[grc].filePath + "\n\nПроверьте права доступа, свободное место и т.п.");
				myFlagStopExecution = true;
				return;
			}
			myFile.close();
			if (myFlagStopExecution) { return }
		}
		
		myStatusWindowGauge.value++;
	}
	
	// Посчитаем файлы для резервного копирования
	var backupFilesCount = 0;
	for (var doc in myDocuments) {
		backupFilesCount++;
		backupFilesCount += arrayLength(myDocuments[doc][keyDocumentsBackupList]);
	}
	
	showStatus("РЕЗЕРВНОЕ КОПИРОВАНИЕ", "", 0, backupFilesCount);
	
	// Пройдёмся по всем выбранным документам
	for (var doc in myDocuments) {
		backupDocument(myDocuments[doc]);
		if (myFlagStopExecution) { break }
	}
	
	showStatus(undefined, undefined, myStatusWindowGauge.maxvalue, myStatusWindowGauge.maxvalue);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Обработаем картинки
// ------------------------------------------------------
function processImages() {
	
	// Функция для передачи в Фотошоп
	function bridgeFunction(myFilePath, myNewFilePath, myDoResample, myTargetDPIFactor, myChangeFormatCode) {
		var mySavedDisplayDialogs = app.displayDialogs;
		app.displayDialogs = DialogModes.NO;
		
		try {
			var myFileRef = new File(myFilePath);
			var myDocument = app.open(myFileRef);
			if (myDocument == null)
				throw "Не удаётся открыть документ " + myFilePath;
			
			// Разрешение
			if (myDoResample) {
				myDocument.resizeImage(undefined, undefined, myDocument.resolution * myTargetDPIFactor, ResampleMethod.BICUBIC);
			}
			
			// Формат
			switch (myChangeFormatCode) {
				case 0:
					myDocument.close(SaveOptions.SAVECHANGES);
					break;
				case 1:
					var myTIFFSaveOptions = new TiffSaveOptions();
					with (myTIFFSaveOptions) {
						byteOrder = ByteOrder.MACOS;
						embedColorProfile = false;
						imageCompression = TIFFEncoding.TIFFLZW;
					}
					var myNewFile = new File(myNewFilePath);
					myDocument.saveAs(myNewFile, myTIFFSaveOptions, true, Extension.LOWERCASE);
					myDocument.close(SaveOptions.DONOTSAVECHANGES);
					break;
				case 2:
					var myPSDSaveOptions = new PhotoshopSaveOptions();
					with (myPSDSaveOptions) {
						embedColorProfile = false;
					}
					var myNewFile = new File(myNewFilePath);
					myDocument.saveAs(myNewFile, myPSDSaveOptions, true, Extension.LOWERCASE);
					myDocument.close(SaveOptions.DONOTSAVECHANGES);
					break;
			}
		} catch (e) {
			throw e;
		} finally {
			app.displayDialogs = mySavedDisplayDialogs;
		}
	}
	
	// Поехали
	showStatus("ОБРАБОТКА ИЗОБРАЖЕНИЙ", "", 0, arrayLength(myGraphics));
	
	for (var grc in myGraphics) {
		showStatus(undefined, myGraphics[grc][keyGraphicsName], undefined, undefined);
		
		// Параметры скрипта для Фотошопа
		var myDoChangeFormat = ((myPreferences["changeFormat"]) && (myGraphics[grc][keyGraphicsWrongFormat]));
		var myChangeFormatCode = (myDoChangeFormat ? (myGraphics[grc][keyGraphicsHasClippingPath] ? 2 : 1) : 0);
		var myDoResample = (
			((myPreferences["upsample"]) && (lowGraphicDPI(myGraphics[grc][keyGraphicsLowestDPI]))) ||
			((myPreferences["downsample"]) && (highGraphicDPI(myGraphics[grc][keyGraphicsLowestDPI]))));
		var myTargetDPIFactor = myPreferences["targetDPI"] / myGraphics[grc][keyGraphicsLowestDPI];
		
		var myNewFilePath = "";
		if (myDoChangeFormat) {
			var myFile = new File(grc);
			myNewFilePath = uniqueFileName(myFile.path, myFile.name.slice(0, myFile.name.lastIndexOf(".") + 1) + (myChangeFormatCode == 1 ? "tif" : "psd"));
			myGraphics[grc][keyGraphicsNewFilePath] = myNewFilePath;
			myGraphics[grc][keyGraphicsDoRelink] = true;
		} else {
			myGraphics[grc][keyGraphicsDoRelink] = false;
		}
		
		// Запускаем скрипт в фотошопе
		try {
			// Найти фотошоп
			var myPhotoshop = "photoshop";
			for (var n = 0; n < apps.length; n++){
				if (apps[n].indexOf("photoshop") != -1) {
					if (BridgeTalk.isRunning(apps[n])) {
						if (apps[n] > myPhotoshop) {
							myPhotoshop = apps[n];
						}
					}
				}
			}
			
			// Запустить фотошоп, ежели чего
			if (!BridgeTalk.isRunning(myPhotoshop)) {
				BridgeTalk.launch(myPhotoshop);
			}
			while (BridgeTalk.getStatus(myPhotoshop) != "IDLE") { BridgeTalk.pump() }
			BridgeTalk.bringToFront("indesign");
			
			// Функция запроса дополнительного ожидания
			function confirmTimeout() {
				if (confirm("Фотошоп не отвечает на запросы.\nВозможно, он там чем-то занят и всё-таки скоро освободится.\n\nПодождать ещё?")) {
					// ждём, увеличив таймаут
					myTimeout *= 1.5;
					return true;
				} else {
					// вываливаемся
					myReturnValue = false;
					myFlagStopExecution = true;
					return false;
				}
			}
			
			var myBT = new BridgeTalk;
			myBT.target = myPhotoshop;
			myBT.body = bridgeFunction.toString() + "\r\rbridgeFunction(\"";
			myBT.body += grc + "\", \"";
			myBT.body += myNewFilePath + "\", ";
			myBT.body += myDoResample + ", ";
			myBT.body += myTargetDPIFactor + ", ";
			myBT.body += myChangeFormatCode;
			myBT.body += ");";
			myBT.onReceived = function(obj) {
				// фотошоп принял посылку
				myProcessing = true;
			}
			myBT.onError = function(obj) {
				// фотошоп сообщил об ошибке
				myReturnMessage = obj.body
				myReturnValue = false;
			}
			myBT.onResult = function(obj) {
				// фотошоп отработал штатно
				myReturnValue = true;
			}
			myBT.onTimeout = function(obj) {
				// посылка до фотошопа не дошла
				if (myFlagStopExecution) { return }
				if (confirmTimeout()) { myBT.send(myTimeout) }
			}
			
			var myReturnValue;
			var myReturnMessage = "";
			var myProcessing = false;
			
			myBT.send(60);
			
			// ждём, пока фотошоп отработает
			// ибо, блин, эдоб не стал приделывать onTimeout()
			var myTimeout = 60;
			var myTimer = new Date();
			
			while ((myReturnValue == undefined) && !myFlagStopExecution) {
				//$.sleep(500);
				BridgeTalk.pump();
				showStatus(undefined, undefined, undefined, undefined);
				if (myProcessing) {
					var myNow = new Date();
					var myTimeLapsed = (myNow.getTime() - myTimer.getTime()) / 1000;
					if (myTimeLapsed > myTimeout) {
						if (confirmTimeout()) {
							myTimer = new Date();
						}
					}
				}
			}
		} catch (e) {
			myReturnMessage = e.description;
			myReturnValue = false;
		}
		
		if (myFlagStopExecution) { break }
		
		if (!myReturnValue) {
			alert("Ошибка при обработке изображения\n" + grc + "\n\n" + myReturnMessage);
			return false;
		}
		
		showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
	}
	
	showStatus(undefined, undefined, myStatusWindowGauge.maxvalue, myStatusWindowGauge.maxvalue);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Перецепить картинки
// ------------------------------------------------------
function relinkImages(myGraphic) {
	// посчитать линки
	var myTotalLinks = 0;
	for (var grc in myGraphics) {
		myTotalLinks += arrayLength(myGraphics[grc][keyGraphicsObjectList]);
	}
	
	showStatus("ПЕРЕЛИНКОВКА ИЗОБРАЖЕНИЙ", "", 0, myTotalLinks);
	
	// Пройдёмся по всем картинкам
	for (var grc in myGraphics) {
		// Пройдёмся по всем вхождениям
		var myGraphicsList = myGraphics[grc][keyGraphicsObjectList];
		for (var lnk in myGraphicsList) {
			showStatus(undefined, myGraphics[grc][keyGraphicsName], undefined, undefined);
			
			// Найдём линк в общедокументном списке линков
			var myDocument = documentOfGraphic(myGraphicsList[lnk]);
			var myLink;
			for (var dcl = 0; dcl < myDocument.links.length; dcl++) {
				if (myGraphicsList[lnk].itemLink.id == myDocument.links[dcl].id) {
					myLink = myDocument.links[dcl];
				}
			}
			
			// Это релинк?
			if (myGraphics[grc][keyGraphicsDoRelink]) {
				myLink.relink(myGraphics[grc][keyGraphicsNewFilePath]);
			}
			
			// Обновляем
			if (myLink.status == LinkStatus.LINK_OUT_OF_DATE) {
				myLink.update();
			}
			
			if (myFlagStopExecution) { break }
			
			showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
		}
		
		// Удалить исходник?
		if ((myPreferences["deleteOriginals"]) && (myGraphics[grc][keyGraphicsDoRelink])) {
			var myOriginalFile = new File(grc);
			myOriginalFile.remove();
		}
	}
	
	showStatus(undefined, undefined, myStatusWindowGauge.maxvalue, myStatusWindowGauge.maxvalue);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Сохранить документы
// ------------------------------------------------------
function saveDocuments() {
	showStatus("СОХРАНЕНИЕ ДОКУМЕНТОВ", "", 0, arrayLength(myDocuments));
	
	for (var doc in myDocuments) {
		showStatus(undefined, myDocuments[doc][keyDocumentsObject].name, undefined, undefined);
		
		myDocuments[doc][keyDocumentsObject].save();
		
		/*
		var myDocument = myDocuments[doc][keyDocumentsObject];
		var myCheck = false;
		var mySaved = myDocuments[doc][keyDocumentsObject].saved;
		debugPrintObject(myDocuments[doc][keyDocumentsObject].saved);
		debugPrintObject(mySaved);
		debugPrintObject(myCheck);
		$.writeln("-----------------");
		$.writeln("myDocum " + myDocument.saved);
		$.writeln("mySaved " + mySaved);
		$.writeln("myCheck " + myCheck);
		$.writeln("-----------------");
		
		if (!mySaved) {
			myDocuments[doc][keyDocumentsObject].save();
			$.writeln("SAVED----------------------------------------------------------");
		}
		*/
		showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
	}
	
	showStatus(undefined, undefined, myStatusWindowGauge.maxvalue, myStatusWindowGauge.maxvalue);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Лежит ли картинка на pasteboard
// ------------------------------------------------------
function withinBleeds(myGraphic) {
	// Получим документ этой картинки
	var myDocument = documentOfGraphic(myGraphic);
	
	// Найдём разворот, на котором лежит картинка
	var mySpread;
	for (var i = 0; i < myDocument.spreads.length; i++) {
		for (var n = 0; n < myDocument.spreads[i].allGraphics.length; n++) {
			if (myGraphic.id == myDocument.spreads[i].allGraphics[n].id) {
				mySpread = myDocument.spreads[i];
				break;
			}
		}
	}
	
	var myRulerOrigin = myDocument.viewPreferences.rulerOrigin;
	myDocument.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
	
	// Вычислим рамки страниц разворота
	var myRawPageBounds = [mySpread.pages[0].bounds, mySpread.pages[-1].bounds];
	var myBleed = [myDocument.documentPreferences.documentBleedTopOffset, myDocument.documentPreferences.documentBleedInsideOrLeftOffset, myDocument.documentPreferences.documentBleedBottomOffset, myDocument.documentPreferences.documentBleedOutsideOrRightOffset]
	var myPagesBounds = [
		myRawPageBounds[0][0] - myBleed[0],
		myRawPageBounds[0][1] - myBleed[1],
		myRawPageBounds[1][2] + myBleed[2],
		myRawPageBounds[1][3] + myBleed[3]];
	
	var myGraphicBounds = myGraphic.visibleBounds;
	
	// Выпала?
	var myOffBleeds = (
		(myGraphicBounds[0] > myPagesBounds[2]) ||
		(myGraphicBounds[1] > myPagesBounds[3]) ||
		(myGraphicBounds[2] < myPagesBounds[0]) ||
		(myGraphicBounds[3] < myPagesBounds[1]));
	
	/* дебаг
	function writeBounds(myBounds) {
		function roundNumber(number, digits) {
			var multiple = Math.pow(10, digits);
			var rndedNum = Math.round(number * multiple) / multiple;
			return rndedNum;
		}
		function clearNumber(myNumber) {
			return roundNumber(myNumber, 0);
		}
		return "[" + clearNumber(myBounds[0]) + ", " + clearNumber(myBounds[1]) + ", " + clearNumber(myBounds[2]) + ", " + clearNumber(myBounds[3]) + "]";
	}
	
	if (myOffBleeds) {
		$.writeln("-------------------------------------------------");
		$.writeln("pagesBounds: " + writeBounds(myPagesBounds));
		$.writeln(myGraphic.itemLink.name + ": " + writeBounds(myGraphic.visibleBounds));
		$.writeln("offBleeds: " + myOffBleeds + "\n\n");
		$.writeln("");
	}
	*/
	
	myDocument.viewPreferences.rulerOrigin = myRulerOrigin;
	
	return !myOffBleeds;
}

// Получить документ картинки
// ------------------------------------------------------
function documentOfGraphic(myGraphic) {
	var myParentDocument = myGraphic.parent;
	while (myParentDocument.reflect.name != "Document") {
		myParentDocument = myParentDocument.parent;
	}
	
	return myParentDocument;
}

// Проверка картинки на кривость формата файла
// ------------------------------------------------------
function wrongGraphicFormat(myGraphic) {
	try {
		if (myAppVersion >= 6) {
			return (myGraphic.imageTypeName in {"JPEG":0, "PNG":0, "Windows Bitmap":0, "CompuServe GIF":0});
		} else {
			return (myGraphic.itemLink.linkType in {"JPEG":0, "Portable Network Graphics (PNG)":0, "Windows Bitmap":0, "CompuServe GIF":0});
		}
	} catch (e) {
		return false;
	}
}

// Проверка картинки на низкое dpi
// ------------------------------------------------------
function lowGraphicDPI(myGraphicDPI) {
	return (myGraphicDPI <= myPreferences["upsampleThreshold"]);
}

// Проверка картинки на высокое dpi
// ------------------------------------------------------
function highGraphicDPI(myGraphicDPI) {
	return (myGraphicDPI >= myPreferences["downsampleThreshold"]);
}

// Получить самый низкий effective dpi
// ------------------------------------------------------
function lowestDPI(myGraphic) {
	return (myGraphic.effectivePpi[0] < myGraphic.effectivePpi[1] ? myGraphic.effectivePpi[0] : myGraphic.effectivePpi[1]);
}

// Проверка картинки на clipping
// ------------------------------------------------------
function hasClippingPath(myGraphic) {
	return (myGraphic.clippingPath.clippingType != ClippingPathType.NONE);
}

// Размер dictionary
// ------------------------------------------------------
function arrayLength(myArrayObject) {
	var myLength = 0;
	
	for (var key in myArrayObject)
		if (myArrayObject.hasOwnProperty(key)) myLength++;
	return myLength;
};

// Доливка нулями
// ------------------------------------------------------
function fillZeros(myNumber, myMinDigits) {
	var myString = new String(myNumber);
	while (myString.length < myMinDigits)
		myString = "0" + myString;
	return myString;
}

// Получим уникальное имя файла
// ------------------------------------------------------
function uniqueFileName(myFolderName, myFileName) {
	var myFile = new File(myFolderName + "/" + myFileName);
	var i = 1;
	while (myFile.exists) {
		myFile = new File(myFolderName + "/" + myFileName.substr(0, myFileName.lastIndexOf(".")) + " " + i + myFileName.substr(myFileName.lastIndexOf("."), myFileName.length));
		i++;
	}
	return myFile;
}

// Дебаг
// ------------------------------------------------------
function debugPrintObject(f) {
	$.writeln("\n\n" + f.reflect.name + "\n----------------------------------------------------------");
	var props = f.reflect.properties;
	var array = [];
	for (var i = 0; i < props.length; i++)
		try {array.push(props[i].name + ": " + f[props[i].name])} catch (_){}
	array.sort();
	$.writeln(array.join("\r"));
	
	$.writeln("\rMethods");
	for (var i = 0; i < props.length; i++)
		$.writeln (props[i].name);
}
