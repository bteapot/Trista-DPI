// Пакетная обработка растровых изображений в документах Adobe InDesign
//
// Денис Либит
// Студия КолорБокс
// denis@boxcolor.ru
// www.boxcolor.ru
// -----------------------------------------------------------------------------------

#target indesign

// Локализованные сообщения
const kLocalesList = [
	["ru", "Русский"],
	["en", "English"]];

const msgCheckingOpenedDocumentsStatus = {
	ru: "ПРОВЕРКА ОТКРЫТЫХ ДОКУМЕНТОВ",
	en: "CHECKING OPENED DOCUMENTS" };
const msgCheckingImagesStatus = {
	ru: "ПРОВЕРКА КАРТИНОК",
	en: "CHECKING IMAGES" };
const msgBackupStatus = {
	ru: "РЕЗЕРВНОЕ КОПИРОВАНИЕ",
	en: "BACKUP" };
const msgProcessingImagesStatus = {
	ru: "ОБРАБОТКА ИЗОБРАЖЕНИЙ",
	en: "PROCESSING IMAGES" };
const msgRelinkingImagesStatus = {
	ru: "ПЕРЕЛИНКОВКА ИЗОБРАЖЕНИЙ",
	en: "UPDATING IMAGES" };
const msgSavingDocumentsStatus = {
	ru: "СОХРАНЕНИЕ ДОКУМЕНТОВ",
	en: "SAVING DOCUMENTS" };
const msgPreferencesError = {
	ru: "Ошибка при чтении настроек.\nТо-есть файл-то с настройками есть, да вот открыть его не получается.\n\nВыполнение скрипта прекращаем.",
	en: "Error reading preferences file.\nFile exists, but can't be opened.\n\nTerminating execution." };
const msgExecution = {
	ru: "Выполнение",
	en: "Execution" };
const msgOK = {
	ru: "OK",
	en: "OK" };
const msgCancel = {
	ru: "Отмена",
	en: "Cancel" };
const msgCantWorkInSuchConditions = {
	ru: "Невозможно работать в таких условиях.\nДля начала откройте хотя бы один документ, что-ли.",
	en: "Unable to work in such conditions.\nOpen at least one document to proceed." };
const msgConfirmDocumentSave = {
	ru: "Документ %1 изменён с момента последнего сохранения.\nЧтобы документ можно было обработать, его необходимо сохранить.\n\nСохранить?",
	en: "Document %1 was changed since last save.\nThis document needs be saved to be processed. Save document?" };
const msgConfirmOutdatedImages = {
	ru: "В открытых документах есть необновлённые изображения.\n%1.\n\nВсё равно продолжить?",
	en: "There are outdated images in opened documents.\n%1\n\nContinue anyway?" };
const msgPreferences = {
	ru: "Параметры",
	en: "Preferences" };
const msgCommonParameters = {
	ru: "Общие параметры",
	en: "Common parameters" };
const msgProcessBitmaps = {
	ru: "Обрабатывать Bitmap",
	en: "Process Bitmaps" };
const msgLeaveImagesOpen = {
	ru: "Оставлять картинки открытыми в Фотошопе",
	en: "Leave images opened in Photoshop" };
const msgFormatOfImages = {
	ru: "Формат файлов",
	en: "Format of image files" };
const msgResaveJPEGInFormat = {
	ru: "Пересохранять JPEG, PNG и т.п. в формате:",
	en: "Resave JPEG, PNG etc. with format:" };
const msgTIFF = {
	ru: "TIFF",
	en: "TIFF" };
const msgTIFFAndPSD = {
	ru: "TIFF, с обтравкой в PSD",
	en: "TIFF, with clipping to PSD" };
const msgPSD = {
	ru: "PSD",
	en: "PSD" };
const msgBackgroundLayerToNormalLayer = {
	ru: "Оторвать слой от фона",
	en: "Background layer to normal layer" };
const msgRemoveClipping = {
	ru: "Убрать обтравку",
	en: "Remove clipping" };
const msgRemoveSourceImages = {
	ru: "Удалять оригиналы изображений",
	en: "Remove source images" };
const msgChangeResolution = {
	ru: "Изменять разрешение (dpi)",
	en: "Change resolution (dpi)" };
const msgColorAndGrayscale = {
	ru: "Color и Grayscale:",
	en: "Color and Grayscale:" };
const msgTo = {
	ru: " до:",
	en: " to:" };
const msgDelta = {
	ru: "∆:",
	en: "∆:" };
const msgBitmap = {
	ru: "Bitmap:",
	en: "Bitmap:" };
const msgMethod = {
	ru: "Метод:",
	en: "Method:" };
const msgScope = {
	ru: "Область действия",
	en: "Scope" };
const msgProcessOffBleedImages = {
	ru: "Обрабатывать картинки на полях",
	en: "Process off-bleed images" };
const msgBackup = {
	ru: "Резервное копирование",
	en: "Backup" };
const msgDoBackup = {
	ru: "Делать",
	en: "Do backup" };
const msgChoose = {
	ru: "Выбрать",
	en: "Choose" };
const msgErrorSavingPreferences = {
	ru: "Ошибка при сохранении настроек.\nВообще такого не должно было случиться, поэтому на всякий случай дальнейшее выполнение скрипта отменяется.",
	en: "Error saving preferences.\nIn general, this should not happen, so just in case the further execution of the script is canceled." };
const msgEmbeddedImage = {
	ru: "<внедрённая картинка>",
	en: "<embedded image>" };
const msgNoImagesToProcess = {
	ru: "Нет картинок, нуждающихся в обработке.\nПоздравляю!",
	en: "There is no images to process.\nCongratulations!" };
const msgErrorCreatingBackupFolder = {
	ru: "Ошибка при создании папки резервных копий.\nПроверьте правильность пути, слэш на конце, права доступа и т.п.",
	en: "Error creating backup folder.\nCheck path, trailing slash, permissions, etc." };
const msgErrorCopyingFile = {
	ru: "Ошибка при резервном копировании файла.\n%1\n\nПроверьте права доступа, свободное место и т.п.",
	en: "Error copying file.\n%1\n\nCheck permissions, free space, etc." };
const msgPhotoshopTimeout = {
	ru: "Фотошоп не отвечает на запросы.\nВозможно, он там чем-то занят и всё-таки скоро освободится.\n\nПодождать ещё?",
	en: "Photoshop is not responding.\nIt's possibly very busy right now, but will unfreeze soon.\n\nWait a little bit more?" };
const msgErrorProcessingImage = {
	ru: "Ошибка при обработке изображения\n%1\n\n%2",
	en: "Error processing image\n%1\n\n%2" };
const msgProcessReadOnly = {
	ru: "Файл изображения доступен только для чтения.\n%1\n\nМожно продолжить, сохраняя подобные файлы в папку \"%2\" рядом с файлом вёрстки InDesign.\n\nПродолжить?",
	en: "Image file is read-only.\n%1\n\nIt is possible to continue, saving files in folder \"%2\" next to InDesign publication file.\n\nContinue?" };
const msgImagesToProcess = {
	ru: "Картинки в обработку",
	en: "Images to process" };

// Объект-словарь
function myDictionary() {
	
}

// Глобальные переменные
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

var myDocuments = new myDictionary();
var myDocumentSelection = new myDictionary();
var myGraphics = new myDictionary();
var mySelectedGraphics = new myDictionary();
var myFolders = new myDictionary();
var myActiveDocument;

var myFlagStopExecution = false;
var myFlagRestart;

// Константы
const kPrefsLocale = "locale";
const kPrefsProcessBitmaps = "processBitmaps";
const kPrefsLeaveGraphicsOpen = "leaveGraphicsOpen";
const kPrefsChangeFormat = "changeFormat";
const kPrefsChangeFormatTo = "changeFormatTo";
const kPrefsChangeFormatToTIFF = "changeFormatToTIFF";
const kPrefsChangeFormatToTIFFAndPSD = "changeFormatToTIFFAndPSD";
const kPrefsChangeFormatToPSD = "changeFormatToPSD";
const kPrefsMakeLayerFromBackground = "makeLayerFromBackground";
const kPrefsRemoveClipping = "removeClipping";
const kPrefsDeleteOriginals = "deleteOriginals";
const kPrefsScope = "scope";
const kPrefsIncludePasteboard = "includePasteboard";
const kPrefsColorTargetDPI = "colorTargetDPI";
const kPrefsColorDownsample = "colorDownsample";
const kPrefsColorUpsample = "colorUpsample";
const kPrefsColorDelta = "colorDelta";
const kPrefsBitmapTargetDPI = "bitmapTargetDPI";
const kPrefsBitmapDownsample = "bitmapDownsample";
const kPrefsBitmapUpsample = "bitmapUpsample";
const kPrefsBitmapDelta = "bitmapDelta";
const kPrefsResampleMethod = "resampleMethod";
const kPrefsBackup = "backup";
const kPrefsBackupFolder = "backupFolder";

const kDocumentsObject = "documentsObject";
const kDocumentsName = "documentsName";
const kDocumentsProcessable = "documentsProcessable";
const kDocumentsModified = "documentsModified";
const kDocumentsFileReadonly = "documentsFileReadonly";
const kDocumentsLinksTotal = "documentsLinksTotal";
const kDocumentsLinksNormal = "documentsLinksNormal";
const kDocumentsLinksOutOfDate = "documentsLinksOutOfDate";
const kDocumentsLinksMissing = "documentsLinksMissing";
const kDocumentsLinksEmbedded = "documentsLinksEmbedded";
const kDocumentsBackupList = "documentsBackupList";

const kGraphicsName = "graphicsName";
const kGraphicsNewFilePath = "graphicsNewFilePath";
const kGraphicsFileReadonly = "graphicsFileReadonly";
const kGraphicsFolderReadonly = "graphicsFolderReadonly";
const kGraphicsDoRelink = "graphicsDoRelink";
const kGraphicsChangeFormat = "graphicsChangeFormat";
const kGraphicsResample = "graphicsResample";
const kGraphicsBitmap = "graphicsBitmap";
const kGraphicsActualDPI = "graphicsActualDPI";
const kGraphicsLowestDPI = "graphicsLowestDPI";
const kGraphicsMaxPercentage = "graphicsMaxPercentage";
const kGraphicsHasClippingPath = "graphicsHasClippingPath";
const kGraphicsWithinBleeds = "graphicsWithinBleeds";
const kGraphicsObjectList = "graphicsObjectList";
const kGraphicsObject = "graphicsObject";
const kGraphicsParentDocument = "graphicsParentDocument";
const kGraphicsParentPage = "graphicsParentPage";
const kGraphicsObjectHScale = "graphicsObjectHScale";
const kGraphicsObjectVScale = "graphicsObjectVScale";
const kGraphicsObjectAbsoluteRotation = "graphicsObjectAbsoluteRotation";
const kGraphicsObjectAbsoluteFlip = "graphicsObjectAbsoluteFlip";
const kGraphicsObjectFlip = "graphicsObjectFlip";
const kGraphicsObjectBounds = "graphicsObjectBounds";

const kListItemObject = "listItemObject";

const kFolderForReadOnly = "From read-only files";

const kResampleBicubic = 0;
const kResampleSmootherSharper = 1;
const kResampleOptions = [
	[kResampleBicubic, "Bicubic"],
	[kResampleSmootherSharper, "Bicubic smoother/sharper"]];

const kScopeAllDocs = 0;
const kScopeActiveDoc = 1;
const kScopeSelectedPages = 2;
const kScopeSelectedImages = 3;
const kScopeOptions = [
	[kScopeAllDocs, {
		ru: "Все открытые документы",
		en: "All opened documents" }],
	[kScopeActiveDoc, {
		ru: "Активный документ",
		en: "Active document" }],
	[kScopeSelectedPages, {
		ru: "Выбранные страницы",
		en: "Selected pages" }],
	[kScopeSelectedImages, {
		ru: "Выбранные изображения",
		en: "Selected images" }]];

var myAppSettingsPreserveBounds;


main();

// "Стартую!" (эпитафия на могиле Неизвестной Секретарши)
// ------------------------------------------------------
function main() {
	preserveSettings();
	do { process() } while (myFlagRestart);
	restoreSettings();
}

// Главный производственный процесс
// ------------------------------------------------------
function process() {
	myFlagRestart = false;
	$.gc();
	
	if (!initialSettings()) return;
	if (!makeStatusWindow()) return;
	if (!checkDocuments()) return;
	if (!analyseGraphics()) return;
	if (!displayPreferences()) return;
	if (!backupImages()) return;
	if (!processImages()) return;
	if (!relinkImages()) return;
	if (!saveDocuments()) return;
}

// Сохраним текущие настройки индизайна
// ------------------------------------------------------
function preserveSettings() {
	myAppSettingsPreserveBounds = app.imagePreferences.preserveBounds;
	
	app.imagePreferences.preserveBounds = true;
}

// Восстановим настройки индизайна
// ------------------------------------------------------
function restoreSettings() {
	app.imagePreferences.preserveBounds = myAppSettingsPreserveBounds;
}

// Стартовые настройки
// ------------------------------------------------------
function initialSettings() {
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	app.scriptPreferences.enableRedraw = true;
	
	myAppVersion = Number(app.version.match(/^\d+/));
	
	// Включим локализацию
	$.localize = true;
	
	// Настройки по умолчанию
	myPreferences[kPrefsLocale] = $.locale;
	
	myPreferences[kPrefsProcessBitmaps] = false;
	myPreferences[kPrefsLeaveGraphicsOpen] = false;
	
	myPreferences[kPrefsChangeFormat] = true;
	myPreferences[kPrefsChangeFormatTo] = kPrefsChangeFormatToTIFF;
	myPreferences[kPrefsMakeLayerFromBackground] = false;
	myPreferences[kPrefsRemoveClipping] = true;
	myPreferences[kPrefsDeleteOriginals] = true;
	
	myPreferences[kPrefsScope] = kScopeActiveDoc;
	myPreferences[kPrefsIncludePasteboard] = false;
	
	myPreferences[kPrefsColorTargetDPI] = 300;
	myPreferences[kPrefsColorDownsample] = true;
	myPreferences[kPrefsColorUpsample] = false;
	myPreferences[kPrefsColorDelta] = 50;
	myPreferences[kPrefsBitmapTargetDPI] = 1200;
	myPreferences[kPrefsBitmapDownsample] = true;
	myPreferences[kPrefsBitmapUpsample] = false;
	myPreferences[kPrefsBitmapDelta] = 150;
	
	myPreferences[kPrefsResampleMethod] = kResampleBicubic;
	
	myPreferences[kPrefsBackup] = true;
	
	// Определение платформы
	if ($.os.toLowerCase().indexOf("macintosh") != -1) {
		// Маки
		myPreferencesFileName = "~/Library/Preferences/ru.colorbox.trista-dpi.txt";
		myPreferences[kPrefsBackupFolder] = Folder.encode(Folder.myDocuments + "/Trista DPI backup/");
		myTempFolder = Folder.temp + "/";
	} else if ($.os.toLowerCase().indexOf("windows") != -1) {
		// Виндовз
		myPreferencesFileName = Folder.userData + "/ru.colorbox.trista-dpi.txt";
		myPreferences[kPrefsBackupFolder] = Folder.myDocuments + "/Trista DPI backup/";
		myTempFolder = Folder.temp + "/";
	}

	// Загрузить настройки
	var myPreferencesFile = new File(myPreferencesFileName);
	if (myPreferencesFile.exists) {
		var myPreferencesFile = new File(myPreferencesFileName);
		if (myPreferencesFile.open("r")) {
			var myPreferencesArray = myPreferencesFile.read(myPreferencesFile.length).split("\n");
			var myPreferenceRecord = [];
			
			for (var prf = 0; prf < myPreferencesArray.length; prf++) {
				myPreferenceRecord = myPreferencesArray[prf].split("\t");
				
				// Грузим только известные науке настройки, чтобы не захламлять файл с преференсами
				if (myPreferences.hasOwnProperty(myPreferenceRecord[0])) {
					if (myPreferenceRecord[1] == "boolean") {
						myPreferences[myPreferenceRecord[0]] = (myPreferenceRecord[2] == "true");
					} else if (myPreferenceRecord[1] == "number") {
						myPreferences[myPreferenceRecord[0]] = Number(myPreferenceRecord[2]);
					} else {
						myPreferences[myPreferenceRecord[0]] = myPreferenceRecord[2];
					}
				}
			}
			
			myPreferencesFile.close();
		} else {
			alert(msgPreferencesError);
			return false;
		}
	}
	
	// Установить сохранённую ранее локализацию
	$.locale = myPreferences[kPrefsLocale];
	
	return true;
}

// Соберём окно с градусником
// ------------------------------------------------------
function makeStatusWindow() {
	// Уже сделано?
	if (myStatusWindow != undefined) return true;
	
	var myPanelWidth = 300;
	
	// Собираем палитру
	myStatusWindow = new Window("palette", localize(msgExecution));
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
	var myControlGroup = myStatusWindow.add("group");
	myControlGroup.orientation = "column";
	myControlGroup.alignment = ["right", "bottom"];
	
	// Кнопки окошка
	var myCancelButton = myControlGroup.add("button", undefined, localize(msgCancel), {name: "cancel"});
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
	if (myAppVersion == 6) { myStatusWindow.update() }
}

// Спрячем окно с градусником
// ------------------------------------------------------
function hideStatus() {
	// Очистим окошко
	myStatusWindowPhase.text = "";
	myStatusWindowObject.text = "";
	myStatusWindowGauge.value = 0;
	myStatusWindowGauge.maxvalue = 1;
	
	//if (myAppVersion == 6) { myStatusWindow.update() }
	myStatusWindow.hide();
}

// Проверим открытые документы
// ------------------------------------------------------
function checkDocuments() {
	if (app.documents.length == 0) {
		alert(localize(msgCantWorkInSuchConditions));
		return false;
	}
	
	// Уже сделано?
	if (dictionaryLength(myDocuments) > 0) return true;
	
	showStatus(localize(msgCheckingOpenedDocumentsStatus), "", 0, app.documents.length);
	
	myActiveDocument = documentID(app.activeDocument);
	
	for (var doc = 0; doc < app.documents.length; doc++) {
		var myDocument = app.documents[doc];
		
		showStatus(undefined, myDocument.name, doc, undefined);
		
		// Проверим, сохранён ли документ
		if (myDocument.modified) {
			if (confirm(localize(msgConfirmDocumentSave, myDocument.name))) myDocument.save();
		}
		
		// Посчитаем и разберём линки
		var myLinksNormal = 0;
		var myLinksOutOfDate = 0;
		var myLinksMissing = 0;
		var myLinksEmbedded = 0;
		
		for (var lnk = 0; lnk < myDocument.links.length; lnk++) {
			
			switch (myDocument.links[lnk].status) {
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
		
		// Добавим документ в список
		var docID = documentID(myDocument);
		myDocuments[docID] = {};
		myDocuments[docID][kDocumentsName] = myDocument.name;
		myDocuments[docID][kDocumentsObject] = myDocument;
		myDocuments[docID][kDocumentsModified] = myDocument.modified;
		myDocuments[docID][kDocumentsFileReadonly] = myDocument.readOnly;
		myDocuments[docID][kDocumentsLinksTotal] = myDocument.links.length;
		myDocuments[docID][kDocumentsLinksNormal] = myLinksNormal;
		myDocuments[docID][kDocumentsLinksOutOfDate] = myLinksOutOfDate;
		myDocuments[docID][kDocumentsLinksMissing] = myLinksMissing;
		myDocuments[docID][kDocumentsLinksEmbedded] = myLinksEmbedded;
		
		myDocuments[docID][kDocumentsProcessable] = (
			(!myDocuments[docID][kDocumentsModified]) &&
			(!myDocuments[docID][kDocumentsFileReadonly]) &&
			(myDocuments[docID][kDocumentsLinksOutOfDate] == 0));
		
		myDocuments[docID][kDocumentsBackupList] = {};
		
		if (myFlagStopExecution) { break }
	}
	
	// Предупредить о необновлённых картинках
	var myDocListString = "";
	for (var doc in myDocuments) {
		if (myDocuments[doc][kDocumentsLinksOutOfDate] > 0) {
			if (myDocListString.length > 0) {
				myDocListString += ", " + myDocuments[doc][kDocumentsName];
			} else {
				myDocListString = myDocuments[doc][kDocumentsName];
			}
		}
	}
	
	if (myDocListString.length > 0) {
		if (!confirm(localize(msgConfirmOutdatedImages, myDocListString)))
			return false;
	}
	
	showStatus(undefined, undefined, app.documents.length, undefined);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Составим список всех картинок
// ------------------------------------------------------
function analyseGraphics() {
	
	// Функция проверки
	function checkGraphic(myGraphic) {
		try {
			showStatus(undefined, myGraphic.itemLink.name, undefined, undefined);
		} catch (e) {
			showStatus(undefined, localize(msgEmbeddedImage), undefined, undefined);
		}
		var myDoProcess = true;
		
		// Линк в порядке?
		if (!isGraphicLinkNormal(myGraphic)) myDoProcess = false;
		
		// Это векторная графика?
		if (!isGraphicRaster(myGraphic)) myDoProcess = false;
		
		// Заглушка -- Линк не скопипастченный?
		//if (isGraphicPasted(myGraphic)) myDoProcess = false;
		
		// Заглушка -- Линк не внедрённый?
		//if (isGraphicEmbedded(myGraphic)) myDoProcess = false;
		
		// Битмап?
		if ((!myPreferences[kPrefsProcessBitmaps]) && (isGraphicBitmap(myGraphic))) myDoProcess = false;
		
		// Обрабатываем?
		if (myDoProcess) {
			var grc = myGraphic.itemLink.filePath;
			
			// Проверим, не попадался уже ли этот файл
			if (!(grc in myGraphics)) {
				// Не попадался, добавим первое вхождение
				myGraphics[grc] = new myDictionary();
				myGraphics[grc][kGraphicsName] = myGraphic.itemLink.name;
				myGraphics[grc][kGraphicsChangeFormat] = isGraphicChangeFormat(myGraphic);
				myGraphics[grc][kGraphicsResample] = false;
				myGraphics[grc][kGraphicsBitmap] = isGraphicBitmap(myGraphic);
				myGraphics[grc][kGraphicsActualDPI] = myGraphic.actualPpi[0];
				myGraphics[grc][kGraphicsObjectList] = new myDictionary();
				
				// Проверка read-only
				var myFile = new File(myGraphic.itemLink.filePath);
				myGraphics[grc][kGraphicsFileReadonly] = myFile.readonly;
				myGraphics[grc][kGraphicsFolderReadonly] = isFolderReadOnly(myFile.parent);
			}
			
			// Добавим в список это вхождение
			var itm = myGraphic.id;
			
			myGraphics[grc][kGraphicsObjectList][itm] = new myDictionary();
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsObject] = myGraphic;
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] = documentID(documentOfGraphic(myGraphic));
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentPage] = pageOfGraphic(myGraphic);
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsWithinBleeds] = withinBleeds(myGraphic);
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsHasClippingPath] = hasClippingPath(myGraphic);
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI] = lowestDPI(myGraphic);
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsMaxPercentage] = maxPercentage(myGraphic);
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsObjectHScale] = (myGraphic.absoluteFlip == Flip.HORIZONTAL ? -1 : 1) * myGraphic.absoluteHorizontalScale / 100;
			myGraphics[grc][kGraphicsObjectList][itm][kGraphicsObjectVScale] = (myGraphic.absoluteFlip == Flip.VERTICAL ? -1 : 1) * myGraphic.absoluteVerticalScale / 100;
		}
		
		showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
	}
	
	// Уже сделано?
	if (dictionaryLength(myGraphics) > 0) return true;
	
	showStatus(localize(msgCheckingImagesStatus), "", 0, 0);
	
	// Посчитаем картинки
	var totalImages = 0;
	for (var doc in myDocuments) {
		totalImages += myDocuments[doc][kDocumentsObject].allGraphics.length;
	}
	showStatus(undefined, undefined, 0, totalImages);
	
	// Пройдёмся по всем документам
	for (var doc in myDocuments) {
		if (myDocuments[doc][kDocumentsProcessable]) {
			// Пройдёмся по всем картинкам
			for (var grc = 0; grc < myDocuments[doc][kDocumentsObject].allGraphics.length; grc++) {
				checkGraphic(myDocuments[doc][kDocumentsObject].allGraphics[grc]);
				if (myFlagStopExecution) { break }
			}
			if (myFlagStopExecution) { break }
		}
	}
	
	// Составим список выделенных картинок
	function parseObject(obj) {
		// графика?
		if (obj.reflect.name == "Image") {
			myDocumentSelection[obj.id] = true;
			return;
		}
		// содержит другие объекты?
		if (obj.hasOwnProperty("allPageItems")) {
			for (var sbj = 0; sbj < obj.allPageItems.length; sbj++) {
				parseObject(obj.allPageItems[sbj]);
			}
		}
		// содержит графику?
		if (obj.hasOwnProperty("allGraphics")) {
			for (var sbj = 0; sbj < obj.allGraphics.length; sbj++) {
				parseObject(obj.allGraphics[sbj]);
			}
		}
		// массив?
		if (obj instanceof Array) {
			for (var sbj = 0; sbj < obj.length; sbj++) {
				parseObject(obj[sbj]);
			};
		}
	}
	
	if (myDocuments[myActiveDocument][kDocumentsObject].selection != null) {
		parseObject(myDocuments[myActiveDocument][kDocumentsObject].selection);
	}
	
	hideStatus();
	
	// Нажата отмена?
	if (myFlagStopExecution) { return false }
	
	return true;
}

// Покажем диалог с настройками
// ------------------------------------------------------
function displayPreferences() {
	// Собираем диалоговое окно
	var myDialog = new Window("dialog", localize(msgPreferences));
	
	// Флаги
	var myFlagChangeFormat = false;
	var myFlagResample = false;
	
	// Константы
	var myPanelWidth = 400;
	var mySubPanelMargins = [14, 14, 10, 10];
	var mySubControlMargins = [18, 0, 0, 0];
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
	var myCircleGreenImage = ScriptUI.newImage(myCircleGreenFile);
	var myCircleRedImage = ScriptUI.newImage(myCircleRedFile);
	
	// Поехали
	myDialog.orientation = "column";
	
	var myUpperGroup = myDialog.add("group");
	myUpperGroup.orientation = "row";
	myUpperGroup.alignChildren = ["fill", "fill"];
	
	var myCommonGroup = myUpperGroup.add("group");
	myCommonGroup.orientation = "column";
	
	var myParametersGroup = myCommonGroup.add("group");
	myParametersGroup.orientation = "column";
	myParametersGroup.minimumSize.width = myPanelWidth;
	myParametersGroup.alignChildren = ["fill", "top"];
	
	// Группа общих настроек
	with (myParametersGroup.add("panel", undefined, localize(msgCommonParameters))) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
		margins = mySubPanelMargins;
		
		// Обработка битмапов
		var myProcessBitmaps = add("checkbox", undefined, localize(msgProcessBitmaps));
		myProcessBitmaps.onClick = function() {
			myPreferences[kPrefsProcessBitmaps] = myProcessBitmaps.value;
			myEnableInterfaceItems();
		}
		myProcessBitmaps.value = myPreferences[kPrefsProcessBitmaps];
		
		// Оставлять картинки открытыми в Фотошопе
		var myLeaveGraphicsOpen = add("checkbox", undefined, localize(msgLeaveImagesOpen));
		myLeaveGraphicsOpen.onClick = function() {
			myPreferences[kPrefsLeaveGraphicsOpen] = myLeaveGraphicsOpen.value;
		}
		myLeaveGraphicsOpen.value = myPreferences[kPrefsLeaveGraphicsOpen];
	}
		
	// Группа изменения формата
	with (myParametersGroup.add("panel", undefined, localize(msgFormatOfImages))) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
		margins = mySubPanelMargins;
		
		var myChangeFormat = add("checkbox", undefined, localize(msgResaveJPEGInFormat));
		myChangeFormat.onClick = function() {
			myPreferences[kPrefsChangeFormat] = myChangeFormat.value;
			myEnableInterfaceItems();
		}
		myChangeFormat.value = myPreferences[kPrefsChangeFormat];
		
		var myChangeFormatGroup = add("group");
		with (myChangeFormatGroup) {
			orientation = "column";
			alignChildren = ["left", "top"];
			margins = mySubControlMargins;
		}
		
		with (myChangeFormatGroup.add("group")) {
			orientation = "column";
			alignChildren = ["fill", "top"];
			
			var myChangeFormatToTIFFButton = add("radiobutton", undefined, localize(msgTIFF));
			myChangeFormatToTIFFButton.onClick = function() {
				myPreferences[kPrefsChangeFormatTo] = kPrefsChangeFormatToTIFF;
				myEnableInterfaceItems();
			}
			myChangeFormatToTIFFButton.value = (myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToTIFF);
			
			var myChangeFormatToTIFFAndPSDButton = add("radiobutton", undefined, localize(msgTIFFAndPSD));
			myChangeFormatToTIFFAndPSDButton.onClick = function() {
				myPreferences[kPrefsChangeFormatTo] = kPrefsChangeFormatToTIFFAndPSD;
				myEnableInterfaceItems();
			}
			myChangeFormatToTIFFAndPSDButton.value = (myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToTIFFAndPSD);
			
			var myChangeFormatToPSDButton = add("radiobutton", undefined, localize(msgPSD));
			myChangeFormatToPSDButton.onClick = function() {
				myPreferences[kPrefsChangeFormatTo] = kPrefsChangeFormatToPSD;
				myEnableInterfaceItems();
			}
			myChangeFormatToPSDButton.value = (myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToPSD);
			
			var myPSDOptionsGroup = add("group");
			with (myPSDOptionsGroup) {
				orientation = "column";
				alignChildren = ["left", "top"];
				margins = mySubControlMargins;
				
				var myMakeLayerFromBackground = add("checkbox", undefined, localize(msgBackgroundLayerToNormalLayer));
				myMakeLayerFromBackground.onClick = function() {
					myPreferences[kPrefsMakeLayerFromBackground] = myMakeLayerFromBackground.value;
				}
				myMakeLayerFromBackground.value = myPreferences[kPrefsMakeLayerFromBackground];
		
				var myRemoveClipping = add("checkbox", undefined, localize(msgRemoveClipping));
				myRemoveClipping.onClick = function() {
					myPreferences[kPrefsRemoveClipping] = myRemoveClipping.value;
				}
				myRemoveClipping.value = myPreferences[kPrefsRemoveClipping];
			}
	
			var myDeleteOriginals = add("checkbox", undefined, localize(msgRemoveSourceImages));
			myDeleteOriginals.onClick = function() {
				myPreferences[kPrefsDeleteOriginals] = myDeleteOriginals.value;
			}
			myDeleteOriginals.value = myPreferences[kPrefsDeleteOriginals];
		}
	}
	
	// Группа изменения разрешения
	with (myParametersGroup.add("panel", undefined, localize(msgChangeResolution))) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["left", "center"];
		margins = mySubPanelMargins;
		
		// Цветные изображения
		var myColorAndGrayscaleGraphicsGroup = add("group");
		with (myColorAndGrayscaleGraphicsGroup) {
			orientation = "row";
			alignChildren = ["right", "center"];
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				minimumSize.width = myPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgColorAndGrayscale))) {
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorUpsample = add("checkbox", undefined, "+");
				myColorUpsample.value = myPreferences[kPrefsColorUpsample];
				myColorUpsample.onClick = function() {
					myPreferences[kPrefsColorUpsample] = myColorUpsample.value;
					myEnableInterfaceItems();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorDownsample = add("checkbox", undefined, "-");
				myColorDownsample.value = myPreferences[kPrefsColorDownsample];
				myColorDownsample.onClick = function() {
					myPreferences[kPrefsColorDownsample] = myColorDownsample.value;
					myEnableInterfaceItems();
				}
			}
			
				
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				
				with (add("statictext", undefined, localize(msgTo))) {
					characters = 3;
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorTargetDPI = add("edittext", undefined, myPreferences[kPrefsColorTargetDPI]);
				myColorTargetDPI.characters = 6;
				myColorTargetDPI.justify = "right";
				myColorTargetDPI.onChange = function() {
					myPreferences[kPrefsColorTargetDPI] = parseInt(myColorTargetDPI.text);
					filterGraphics();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				
				with (add("statictext", undefined, localize(msgDelta))) {
					characters = 3;
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorDelta = add("edittext", undefined, myPreferences[kPrefsColorDelta]);
				myColorDelta.characters = 6;
				myColorDelta.justify = "right";
				myColorDelta.onChange = function() {
					myPreferences[kPrefsColorDelta] = parseInt(myColorDelta.text);
					filterGraphics();
				}
			}
		}
		
		// Битмап изображения
		var myBitmapGraphicsGroup = add("group");
		with (myBitmapGraphicsGroup) {
			orientation = "row";
			alignChildren = ["right", "center"];
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				minimumSize.width = myPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgBitmap))) {
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapUpsample = add("checkbox", undefined, "+");
				myBitmapUpsample.value = myPreferences[kPrefsBitmapUpsample];
				myBitmapUpsample.onClick = function() {
					myPreferences[kPrefsBitmapUpsample] = myBitmapUpsample.value;
					myEnableInterfaceItems();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapDownsample = add("checkbox", undefined, "-");
				myBitmapDownsample.value = myPreferences[kPrefsBitmapDownsample];
				myBitmapDownsample.onClick = function() {
					myPreferences[kPrefsBitmapDownsample] = myBitmapDownsample.value;
					myEnableInterfaceItems();
				}
			}
			
				
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				
				with (add("statictext", undefined, localize(msgTo))) {
					characters = 3;
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapTargetDPI = add("edittext", undefined, myPreferences[kPrefsBitmapTargetDPI]);
				myBitmapTargetDPI.characters = 6;
				myBitmapTargetDPI.justify = "right";
				myBitmapTargetDPI.onChange = function() {
					myPreferences[kPrefsBitmapTargetDPI] = parseInt(myBitmapTargetDPI.text);
					filterGraphics();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				
				with (add("statictext", undefined, localize(msgDelta))) {
					characters = 3;
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapDelta = add("edittext", undefined, myPreferences[kPrefsBitmapDelta]);
				myBitmapDelta.characters = 6;
				myBitmapDelta.justify = "right";
				myBitmapDelta.onChange = function() {
					myPreferences[kPrefsBitmapDelta] = parseInt(myBitmapDelta.text);
					filterGraphics();
				}
			}
		}
		
		// Метод ресэмплинга
		var myResampleMethodGroup = add("group");
		with (myResampleMethodGroup) {
			orientation = "row";
			alignChildren = ["right", "center"];
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				minimumSize.width = myPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgMethod))) {
					justify = "right";
				}
			}
			
			var myResampleDropdown = add("dropdownlist");
			for (var itm = 0; itm < kResampleOptions.length; itm++) {
				myResampleDropdown.add("item", kResampleOptions[itm][1]);
			}
			myResampleDropdown.onChange = function () {
				myPreferences[kPrefsResampleMethod] = myResampleDropdown.selection;
			}
			myResampleDropdown.selection = kResampleBicubic;
		}
	}
	
	// Группа выбора области деятельности
	var myScopeGroup = myParametersGroup.add("panel", undefined, localize(msgScope));
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
		alignChildren = ["fill", "top"];
	}
	
	function myScopeButtonClicked() {
		for (var btn = 0; btn < myScopeRadioGroup.children.length; btn++) {
			if (myScopeRadioGroup.children[btn].value == true) {
				myPreferences[kPrefsScope] = btn;
				
				// очистить список
				myItemsList.removeAll();
				
				// прореагировать в зависимости от кнопки
				switch (myPreferences[kPrefsScope]) {
					case kScopeAllDocs:
						// Все открытые документы
						myScopeItemsGroup.enabled = true;
						for (var doc in myDocuments) {
							var newListItem = myItemsList.add("item", myDocuments[doc][kDocumentsName]);
							newListItem[kListItemObject] = doc;
							if (myDocuments[doc][kDocumentsProcessable]) {
								newListItem.image = myCircleGreenImage;
								myItemsList.selection = myItemsList.items.length - 1;
							} else {
								newListItem.image = myCircleRedImage;
							}
						}
						break;
					case kScopeActiveDoc:
						// Активный документ
						myScopeItemsGroup.enabled = false;
						var newListItem = myItemsList.add("item", myDocuments[myActiveDocument][kDocumentsName]);
						if (myDocuments[myActiveDocument][kDocumentsProcessable]) {
							newListItem.image = myCircleGreenImage;
						} else {
							newListItem.image = myCircleRedImage;
						}
						break;
					case kScopeSelectedPages:
						// Выбранные страницы
						myScopeItemsGroup.enabled = (myDocuments[myActiveDocument][kDocumentsProcessable]);
						for (var pge = 0; pge < myDocuments[myActiveDocument][kDocumentsObject].pages.length; pge++) {
							var newListItem = myItemsList.add("item", myDocuments[myActiveDocument][kDocumentsObject].pages[pge].name, pge);
							newListItem[kListItemObject] = myDocuments[myActiveDocument][kDocumentsObject].pages[pge];
							myItemsList.selection = pge;
						}
						break;
					case kScopeSelectedImages:
						// Выбранные изображения
						myScopeItemsGroup.enabled = false;
						break;
				}
				myItemsList.onClick();
			}
		}
	}
	
	// разрешить или запретить кнопки выбора области действия
	for (var btn = 0; btn < kScopeOptions.length; btn++) {
		var myButton = myScopeRadioGroup.add("radiobutton", undefined, localize(kScopeOptions[btn][1]));
		if (myDocuments[myActiveDocument][kDocumentsProcessable]) {
			if (dictionaryLength(myDocumentSelection) > 0) {
				// выбрать "выбранные"
				myButton.value = (btn == kScopeSelectedImages);
			} else {
				// выбрать "активный документ"
				myButton.value = (btn == kScopeActiveDoc);
			}
		} else {
			myButton.value = (btn == kScopeAllDocs);
		}
		myButton.onClick = myScopeButtonClicked;
		
		switch (btn) {
			case kScopeAllDocs:
				myButton.enabled = (dictionaryLength(myDocuments) > 1);
				break;
			case kScopeActiveDoc:
				myButton.enabled = myDocuments[myActiveDocument][kDocumentsProcessable];
				break;
			case kScopeSelectedPages:
				myButton.enabled = myDocuments[myActiveDocument][kDocumentsProcessable];
				break;
			case kScopeSelectedImages:
				myButton.enabled = (
					(myDocuments[myActiveDocument][kDocumentsProcessable]) &&
					(dictionaryLength(myDocumentSelection) > 0));
				break;
		}
	}
	
	// Брать ли картинки с pasteboard
	with (myScopeControlGroup.add("group")) {
		orientation = "column";
		alignChildren = ["fill", "bottom"];
		margins = [0, 0, 0, 2];
		
		var myIncludePasteboard = add("checkbox", undefined, localize(msgProcessOffBleedImages));
		myIncludePasteboard.onClick = function() {
			myPreferences[kPrefsIncludePasteboard] = myIncludePasteboard.value;
			filterGraphics();
		}
		myIncludePasteboard.value = myPreferences[kPrefsIncludePasteboard];
	}
		
	// Список элементов выбранного диапазона (документы, страницы или выбранные картинки)
	var myScopeItemsGroup = myScopeGroup.add("group");
	with (myScopeItemsGroup) {
		orientation = "column";
		alignment = ["right", "top"];
		preferredSize = [170, 160];
		maximumSize = [170, 160];
		alignChildren = ["fill", "fill"];
	
		var myItemsList = add("listbox", undefined, undefined, {multiselect:true, numberOfColumns:1, showHeaders:false, columnWidths:[143]});
		myItemsList.onClick = function(item) {
			switch (myPreferences[kPrefsScope]) {
				case kScopeAllDocs:
					var mySelectedCount = 0;
					for (var itm = 0; itm < myItemsList.items.length; itm++) {
						if (myItemsList.items[itm].selected) {
							if (!myDocuments[myItemsList.items[itm][kListItemObject]][kDocumentsProcessable]) {
								myItemsList.items[itm].selected = false;
							} else {
								mySelectedCount++;
							}
						}
					}
					break;
				case kScopeActiveDoc:
					break;
				case kScopeSelectedPages:
					var mySelectedCount = 0;
					for (var itm = 0; itm < myItemsList.items.length; itm++) {
						if (myItemsList.items[itm].selected) {
							mySelectedCount++;
						}
					}
					break;
				case kScopeSelectedImages:
					break;
			}
			
			myEnableInterfaceItems();
		}
	}
	
	// Группа резервного копирования
	with (myParametersGroup.add("panel", undefined, localize(msgBackup))) {
		orientation = "column";
		minimumSize.width = myPanelWidth;
		alignChildren = ["fill", "top"];
		margins = mySubPanelMargins;
		
		var myDoBackup = add("checkbox", undefined, localize(msgDoBackup));
		myDoBackup.onClick = function() {
			myPreferences[kPrefsBackup] = myDoBackup.value;
			myEnableInterfaceItems();
		}
		myDoBackup.value = myPreferences[kPrefsBackup];
		
		var myBackupGroup = add("group");
		myBackupGroup.orientation = "row";
		myBackupGroup.alignChildren = ["fill", "top"];
		myBackupGroup.margins = mySubControlMargins;

		
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["fill", "top"];
			
			var myBackupPath = add("edittext", undefined, Folder.decode(myPreferences[kPrefsBackupFolder]));
			myBackupPath.preferredSize.width = mySubControlWidth;
			myBackupPath.onChange = function() {
				myPreferences[kPrefsBackupFolder] = Folder.encode(myBackupPath.text);
			}
		}
			
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["right", "top"];
			
			var myBackupChooseButton = add("button", undefined, localize(msgChoose));
			myBackupChooseButton.onClick = function() {
				var mySelectedFolder = Folder.selectDialog();
				if (mySelectedFolder != null) {
					myPreferences[kPrefsBackupFolder] = Folder.encode(mySelectedFolder.fullName) + "/";
					myBackupPath.text = mySelectedFolder.fullName + "/";
				}
			}
		}
	}
	
	// Группа списка картинок
	var myImagesGroup = myUpperGroup.add("panel", undefined, localize(msgImagesToProcess));
	with (myImagesGroup) {
		orientation = "column";
		alignChildren = ["fill", "bottom"];
		preferredSize.width = 300;
		maximumSize.width = 300;
		margins = [10, 14, 10, 10];
		
		var myImagesList = myImagesGroup.add("listbox", undefined, undefined, {multiselect:true, numberOfColumns:4, showHeaders:true, columnTitles:["Name", "#", "DPI"], columnWidths:[170, 30, 45]});
		myImagesList.alignment = ["fill", "fill"];
		
		// отработка выделения картинок в обработку
		myImagesList.onChange = function () {
			myImagePositionsList.removeAll();
			if ((myImagesList.selection != null) && (myImagesList.selection.length == 1)) {
				var myEntriesList = mySelectedGraphics[myImagesList.selection[0][kListItemObject]][kGraphicsObjectList];
				for (var itm in myEntriesList) {
					var newListItem = myImagePositionsList.add("item", myDocuments[myEntriesList[itm][kGraphicsParentDocument]][kDocumentsName]);
					newListItem[kListItemObject] = myEntriesList[itm][kGraphicsObject];
					// CS3 не умеет делать многоколоночный список
					if (myAppVersion > 5) {
						newListItem.subItems[0].text = myEntriesList[itm][kGraphicsParentPage];
						newListItem.subItems[1].text = fillSpaces(Math.round(myEntriesList[itm][kGraphicsLowestDPI]), 5);
					}
				}
			}
			myOKButton.enabled = ((myImagesList.selection != null) && (myImagesList.selection.length > 0));
		}
		
		var myImagePositionsList = myImagesGroup.add("listbox", undefined, undefined, {multiselect:false, numberOfColumns:4, showHeaders:true, columnTitles:["Document", "Page", "DPI"], columnWidths:[160, 40, 45]});
		myImagePositionsList.preferredSize.height = 164;
		myImagePositionsList.onDoubleClick = function () {
			alert("Написать показ картинки");
			/*
			var myGraphic = myImagePositionsList.selection[kListItemObject];
			debugPrintObject(myGraphic);
			var myDocument = documentOfGraphic(myGraphic);
			app.activeDocument = myDocument;
			myDocument.layoutWindows[0].select(myGraphic);
			*/
		}
	}
	
	// Отфильтруем картинки для обработки
	function filterGraphics() {
		
		// проверка на попадание в указаный диапазон (все документы/только активный/выбранные страницы активного документа/выбранные картинки)
		function myIsInScope(grc, itm) {
			switch (myPreferences[kPrefsScope]) {
				case kScopeAllDocs:
					for (var doc = 0; doc < myItemsList.items.length; doc++) {
						if (myItemsList.items[doc].selected) {
							if (myItemsList.items[doc][kListItemObject] == mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument]) {
								return true;
							}
						}
					}
					return false;
				case kScopeActiveDoc:
					return (mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] == myActiveDocument);
				case kScopeSelectedPages:
					if (mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] != myActiveDocument) {
						return false;
					}
					for (var pge = 0; pge < myItemsList.items.length; pge++) {
						if (myItemsList.items[pge].selected) {
							if (myItemsList.items[pge][kListItemObject].name == mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentPage]) {
								return true;
							}
						}
					}
					return false;
				case kScopeSelectedImages:
					if (mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] != myActiveDocument) {
						return false;
					}
					return (itm in myDocumentSelection);
				default:
					return false;
			}
		}
		
		// проверка на "подходящесть" картинки под выбранные настройки
		function myIsSuitable(grc, itm) {
			if (((myPreferences[kPrefsIncludePasteboard]) || (mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsWithinBleeds])) ||
				(myPreferences[kPrefsScope] == kScopeSelectedImages)) {
				// картинка внутри вылетов, вне вылетов с опцией "обрабатывать на полях" или scope установлен в "выбранные картинки"
				if ((myPreferences[kPrefsChangeFormat]) && (mySelectedGraphics[grc][kGraphicsChangeFormat])) {
					// надо менять формат
					return true;
				}
				if (mySelectedGraphics[grc][kGraphicsBitmap]) {
					// ч/б картинка
					if (!myPreferences[kPrefsProcessBitmaps]) { return false; }
					if ((myPreferences[kPrefsBitmapUpsample]) && (isGraphicBitmapDPILow(mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
						// низкое dpi ч/б
						mySelectedGraphics[grc][kGraphicsResample] = true;
						return true;
					}
					if ((myPreferences[kPrefsBitmapDownsample]) && (isGraphicBitmapDPIHigh(mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
						// высокое dpi ч/б
						mySelectedGraphics[grc][kGraphicsResample] = true;
						return true;
					}
				} else {
					// цветная картинка
					if ((myPreferences[kPrefsColorUpsample]) && (isGraphicColorDPILow(mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
						// низкое dpi цвета
						mySelectedGraphics[grc][kGraphicsResample] = true;
						return true;
					}
					if ((myPreferences[kPrefsColorDownsample]) && (isGraphicColorDPIHigh(mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
						// высокое dpi цвета
						mySelectedGraphics[grc][kGraphicsResample] = true;
						return true;
					}
				}
			}
			
			return false;
		}
		
		// поехали
		myImagesList.removeAll();
		mySelectedGraphics = cloneDictionary(myGraphics);
		
		// пройдёмся по всем вхождениям
		for (var grc in mySelectedGraphics) {
			for (var itm in mySelectedGraphics[grc][kGraphicsObjectList]) {
				if (!myIsInScope(grc, itm) || !myIsSuitable(grc, itm)) {
					// выкинем из списка неподходящие картинки
					delete mySelectedGraphics[grc][kGraphicsObjectList][itm];
				}
			}
			// выкинем пустые вхождения
			if (dictionaryLength(mySelectedGraphics[grc][kGraphicsObjectList]) == 0) {
				delete mySelectedGraphics[grc];
			}
		}
		
		// обобщим собранные данные по картинкам
		for (var grc in mySelectedGraphics) {
			
			// получим самое низкое разрешение и самый высокий процент для каждой картинки списка
			var myFirstItem = true;
			
			for (var itm in mySelectedGraphics[grc][kGraphicsObjectList]) {
				var myLowestDPI = mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI];
				var myMaxPercentage = mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsMaxPercentage];
				
				if ((myLowestDPI < mySelectedGraphics[grc][kGraphicsLowestDPI]) || myFirstItem) { mySelectedGraphics[grc][kGraphicsLowestDPI] = myLowestDPI }
				if ((myMaxPercentage > mySelectedGraphics[grc][kGraphicsMaxPercentage]) || myFirstItem) { mySelectedGraphics[grc][kGraphicsMaxPercentage] = myMaxPercentage }
				myFirstItem = false;
			}
			
			// выясним, необходим ли пересчёт разрешения при выбранных настройках
			if (mySelectedGraphics[grc][kGraphicsBitmap]) {
				// ч/б картинка
				mySelectedGraphics[grc][kGraphicsResample] = (
					(myPreferences[kPrefsProcessBitmaps]) && (
						(
							// низкое dpi ч/б?
							(myPreferences[kPrefsBitmapUpsample]) &&
							(isGraphicBitmapDPILow(mySelectedGraphics[grc][kGraphicsLowestDPI]))
						) || (
							// высокое dpi ч/б
							(myPreferences[kPrefsBitmapDownsample]) &&
							(isGraphicBitmapDPIHigh(mySelectedGraphics[grc][kGraphicsLowestDPI]))
						)
					)
				);
			} else {
				// цветная картинка
				mySelectedGraphics[grc][kGraphicsResample] = (
					(
						// низкое dpi цвета
						(myPreferences[kPrefsColorUpsample]) &&
						(isGraphicColorDPILow(mySelectedGraphics[grc][kGraphicsLowestDPI]))
					) || (
						// высокое dpi цвета
						(myPreferences[kPrefsColorDownsample]) &&
						(isGraphicColorDPIHigh(mySelectedGraphics[grc][kGraphicsLowestDPI]))
					)
				);
			}
		}
		
		// наполним список картинок
		for (var grc in mySelectedGraphics) {
			var newListItem = myImagesList.add("item", mySelectedGraphics[grc].graphicsName);
			newListItem[kListItemObject] = grc;
			// CS3 не умеет делать многоколоночный список
			if (myAppVersion > 5) {
				newListItem.subItems[0].text = fillSpaces(dictionaryLength(mySelectedGraphics[grc][kGraphicsObjectList]), 2);
				newListItem.subItems[1].text = fillSpaces(Math.round(mySelectedGraphics[grc][kGraphicsLowestDPI]), 5);
			}
			myImagesList.selection = myImagesList.items.length - 1;
		}
	}

	// Группа элементов контроля (круто, да?)
	var myControlGroup = myDialog.add("group");
	with (myControlGroup) {
		orientation = "row";
		alignment = ["fill", "top"];
		
		// выбор локали
		var myLocaleDropdown = add("dropdownlist");
		for (var itm = 0; itm < kLocalesList.length; itm++) {
			var newListItem = myLocaleDropdown.add("item", kLocalesList[itm][1]);
			newListItem[kListItemObject] = kLocalesList[itm][0];
			if (newListItem[kListItemObject] == myPreferences[kPrefsLocale]) {
				myLocaleDropdown.selection = newListItem;
			}
		}
		myLocaleDropdown.onChange = function () {
			myPreferences[kPrefsLocale] = myLocaleDropdown.selection[kListItemObject];
			$.locale = myPreferences[kPrefsLocale];
			myDialog.close(3);
		}
		
		// группа кнопок диалогового окна
		var myButtonsGroup = myControlGroup.add("group");
		with (myButtonsGroup) {
			orientation = "row";
			alignment = ["right", "top"];
			
			var myCancelButton = add("button", undefined, localize(msgCancel), {name: "cancel"});
			var myOKButton = add("button", undefined, localize(msgOK), {name: "ok"});
			myOKButton.onClick = function () {
				if (myOKButton.enabled) myDialog.close(1);
			}
		}
	}
	
	// Включение/выключение элементов интерфейса
	function myEnableInterfaceItems() {
		myFlagChangeFormat = myChangeFormat.value;
		myFlagResample = (myColorUpsample.value || myColorDownsample.value || (myProcessBitmaps.value && (myBitmapUpsample.value || myBitmapDownsample.value)));
		
		myChangeFormatGroup.enabled = myFlagChangeFormat;
		myPSDOptionsGroup.enabled = !myChangeFormatToTIFFButton.value;
		myBitmapGraphicsGroup.enabled = myProcessBitmaps.value;
		myResampleMethodGroup.enabled = myFlagResample;
		myIncludePasteboard.enabled = ((myPreferences[kPrefsScope] == kScopeAllDocs) || (myPreferences[kPrefsScope] == kScopeActiveDoc));
		myBackupGroup.enabled = myDoBackup.value;
		
		filterGraphics();
	}
	
	// Сохранение настроек
	function mySavePreferences() {
		var myPreferencesArray = [];
		for (var prf in myPreferences)
			myPreferencesArray.push(prf + "\t" + typeof myPreferences[prf] + "\t" + myPreferences[prf]);
		
		var myPreferencesFile = new File(myPreferencesFileName);
		if (myPreferencesFile.open("w")) {
			myPreferencesFile.write(myPreferencesArray.join("\n"));
			myPreferencesFile.close();
		} else {
			alert(localize(msgErrorSavingPreferences));
		}
	}
	
	// Отработать включение/выключение групп
	myScopeButtonClicked();

	// Показать диалог
	var myDialogResult = myDialog.show();
	
	// Удалить временные файлы
	myCircleGreenFile.remove();
	myCircleRedFile.remove();
	
	// Отработать варианты завершения диалога
	switch (myDialogResult) {
		case 1:
			// OK
			mySavePreferences();
			break;
		case 2:
			// Cancel
			return false;
		case 3:
			// Смена языка
			mySavePreferences();
			myFlagRestart = true;
			return false;
	}
	
	// Убрать из списка на обработку невыбранные пользователем картинки
	for (var grc in mySelectedGraphics) {
		var isSelected = false;
		for (sel = 0; sel < myImagesList.selection.length; sel++) {
			if (myImagesList.selection[sel][kListItemObject] == grc) {
				isSelected = true;
				break;
			}
		}
		if (!isSelected) {
			delete mySelectedGraphics[grc];
		}
	}
	
	// Убрать из списка не пошедшие в обработку документы
	switch (myPreferences[kPrefsScope]) {
		case kScopeAllDocs:
			for (var doc in myDocuments) {
				var isSelected = false;
				for (var grc in mySelectedGraphics) {
					for (var itm in mySelectedGraphics[grc][kGraphicsObjectList]) {
						if (mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] == doc) {
							isSelected = true;
							break;
						}
					}
					if (isSelected) {
						break;
					}
				}
				if (!isSelected) {
					delete myDocuments[doc];
				}
			}
			break;
		case kScopeActiveDoc:
		case kScopeSelectedPages:
		case kScopeSelectedImages:
			for (var doc in myDocuments) {
				if (doc != myActiveDocument)
					delete myDocuments[doc];
			}
			break;
		default:
			return false;
	}
	
	return true;
}

// Сохраним оригиналы картинок и документов. Бэкап, короче.
// ------------------------------------------------------
function backupImages() {
	// Надо?
	if (!myPreferences[kPrefsBackup])
		return true;
	
	// Функция бэкапа документа со всеми картинками
	function backupDocument(myItemObject) {
		var myDocument = myItemObject[kDocumentsObject];
		
		showStatus(undefined, myDocument.name, undefined, undefined);
		
		// Сделаем папку для бэкапа
		var myDate = new Date();
		var myBackupFolderName = cleanupPath(
			File.decode(myDocument.fullName.name) + "-" + 
			myDate.getFullYear() + "-" + 
			fillZeros(myDate.getMonth()+1, 2) + "-" + 
			fillZeros(myDate.getDate(), 2) + "-" + 
			fillZeros(myDate.getHours(), 2) + 
			fillZeros(myDate.getMinutes(), 2) + 
			fillZeros(myDate.getSeconds(), 2));
		var myBackupFolder = new Folder(Folder.decode(myPreferences[kPrefsBackupFolder]) + myBackupFolderName);
		
		if (!myBackupFolder.create()) {
			alert(localize(msgErrorCreatingBackupFolder));
			myFlagStopExecution = true;
			return;
		}
		
		// Вместе с картинками (чего уж там) сохраним и .indd документ
		if (!myDocument.fullName.copy(uniqueFileName(myBackupFolder.fullName, cleanupPath(File.decode(myDocument.fullName.name))))) {
			alert(localize(msgErrorCopyingFile, myDocument.name));
			myFlagStopExecution = true;
			return;
		}
		
		// Скопируем оригиналы картинок
		var myBackupList = myItemObject[kDocumentsBackupList];
		for (var grc in myBackupList) {
			showStatus(undefined, myBackupList[grc].name, myStatusWindowGauge.value + 1, undefined);
			showStatus(undefined,undefined, undefined, undefined);
			
			var myFile = new File(myBackupList[grc].filePath);
			if (!myFile.copy(uniqueFileName(myBackupFolder.fullName, cleanupPath(File.decode(myFile.name))))) {
				alert(localize(msgErrorCopyingFile, myBackupList[grc].filePath));
				myFlagStopExecution = true;
				return;
			}
			myFile.close();
			if (myFlagStopExecution) { return }
		}
		
		myStatusWindowGauge.value++;
	}
	
	// Пройдёмся по всем картинкам
	var backupFilesCount = 0;
	for (var grc in mySelectedGraphics) {
		// добавим все вхождения картинки в подокументный список для бэкапа
		for (var itm in mySelectedGraphics[grc][kGraphicsObjectList]) {
			// получим ID документа этого вхождения
			var doc = mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument];
			
			// картинки ещё нет в списке бэкапа?
			var myItemLink = mySelectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsObject].itemLink;
			var myBackupList = myDocuments[doc][kDocumentsBackupList];
			if (!(myItemLink.filePath in myBackupList)) {
				// добавим
				myBackupList[myItemLink.filePath] = myItemLink;
				backupFilesCount++;
			}
		}
	}
	backupFilesCount += dictionaryLength(myDocuments);
	
	showStatus(localize(msgBackupStatus), "", 0, backupFilesCount);
	
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
	function bridgeFunction(myFilePath, myNewFilePath, myDoResample, myResampleMethodCode, myActualDPI, myTargetDPI, myMaxPercentage, myChangeFormatCode, myMakeLayerFromBackground, myLeaveGraphicsOpen) {
		var mySavedDisplayDialogs = app.displayDialogs;
		app.displayDialogs = DialogModes.NO;
		
		myFilePath = File.decode(myFilePath);
		myNewFilePath = File.decode(myNewFilePath);
		
		try {
			var myFileRef = new File(myFilePath);
			var myDocument = app.open(myFileRef);
			if (myDocument == null)
				throw "Не удаётся открыть документ " + myFilePath;
			
			// Проверим, правильно ли InDesign определил разрешение
			if (myActualDPI != myDocument.resolution) {
				myMaxPercentage *= myDocument.resolution / myActualDPI ;
			}
			
			// Разрешение
			if (myDoResample) {
				var myResampleMethod;
				switch (myResampleMethodCode) {
					case 0:
						myResampleMethod = ResampleMethod.BICUBIC;
						break;
					case 1:
						if (((myDocument.resolution / myTargetDPI) / myMaxPercentage) > 1) {
							myResampleMethod = ResampleMethod.BICUBICSHARPER;
						} else {
							myResampleMethod = ResampleMethod.BICUBICSMOOTHER;
						}
						break;
				}
				myDocument.resizeImage(UnitValue(myMaxPercentage * 100, "%"), UnitValue(myMaxPercentage * 100, "%"), myTargetDPI, myResampleMethod);
			}
			
			// Формат
			switch (myChangeFormatCode) {
				case 0:
					if (myLeaveGraphicsOpen) {
						myDocument.save();
					} else {
						myDocument.close(SaveOptions.SAVECHANGES);
					}
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
					if (myLeaveGraphicsOpen) { app.open(myNewFile) }
					break;
				case 2:
					if ((myMakeLayerFromBackground) && (myDocument.layers.length == 1) && (myDocument.hasOwnProperty("backgroundLayer"))) {
						try {
							myDocument.backgroundLayer.isBackgroundLayer = false;
						} catch (e) {}
					}
					var myPSDSaveOptions = new PhotoshopSaveOptions();
					with (myPSDSaveOptions) {
						embedColorProfile = false;
					}
					var myNewFile = new File(myNewFilePath);
					myDocument.saveAs(myNewFile, myPSDSaveOptions, true, Extension.LOWERCASE);
					myDocument.close(SaveOptions.DONOTSAVECHANGES);
					if (myLeaveGraphicsOpen) { app.open(myNewFile) }
					break;
			}
		} catch (e) {
			throw e;
		} finally {
			app.displayDialogs = mySavedDisplayDialogs;
		}
	}
	
	// Поехали
	showStatus(localize(msgProcessingImagesStatus), "", 0, dictionaryLength(mySelectedGraphics));
	
	for (var grc in mySelectedGraphics) {
		showStatus(undefined, mySelectedGraphics[grc][kGraphicsName], undefined, undefined);
		
		// Параметры скрипта для Фотошопа
		var myDoChangeFormat = ((myPreferences[kPrefsChangeFormat]) && (mySelectedGraphics[grc][kGraphicsChangeFormat]));
		
		var myChangeFormatCode;
		if (myDoChangeFormat) {
			if ((myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToTIFF)) myChangeFormatCode = 1;
			if ((myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToTIFFAndPSD)) myChangeFormatCode = (mySelectedGraphics[grc][kGraphicsHasClippingPath] ? 2 : 1);
			if ((myPreferences[kPrefsChangeFormatTo] == kPrefsChangeFormatToPSD)) myChangeFormatCode = 2;
		} else {
			myChangeFormatCode = 0;
		}
		
		var myTargetDPI = (mySelectedGraphics[grc][kGraphicsBitmap] ? myPreferences[kPrefsBitmapTargetDPI] : myPreferences[kPrefsColorTargetDPI]);
		
		var myNewFilePath = "";
		if (myDoChangeFormat) {
			// ридонли не дописаный
			//var myPath = (mySelectedGraphics[grc][kGraphicsFolderReadonly] ? DocumentOfGraphic() : myFile.path);
			var myFile = new File(grc);
			var myPath = myFile.path;
			myNewFilePath = uniqueFileName(myPath, cleanupPath(myFile.name.replace(/(.+\.).*$/, "$1") + (myChangeFormatCode == 1 ? "tif" : "psd")));
			mySelectedGraphics[grc][kGraphicsNewFilePath] = myNewFilePath;
			mySelectedGraphics[grc][kGraphicsDoRelink] = true;
		} else {
			mySelectedGraphics[grc][kGraphicsDoRelink] = false;
		}
		
		// Запускаем скрипт в фотошопе
		try {
			// Вычислить старший фотошоп
			var myPhotoshop = "";
			var myPhotoshopVersion = 0.0;
			var myRunningPhotoshop = "";
			var myRunningPhotoshopVersion = 0.0;
			
			for (var itm = 0; itm < apps.length; itm++){
				if (apps[itm].indexOf("photoshop") != -1) {
					var myInstanceVersion = parseFloat(apps[itm].split("-")[1]);
					if (myInstanceVersion > myPhotoshopVersion) {
						myPhotoshop = apps[itm];
						myPhotoshopVersion = myInstanceVersion;
					}
					
					if (BridgeTalk.isRunning(apps[itm])) {
						if (myInstanceVersion > myRunningPhotoshopVersion) {
							myRunningPhotoshop = apps[itm];
							myRunningPhotoshopVersion = myInstanceVersion;
						}
					}
				}
			}
			
			// Хоть один фотошоп запущен?
			if (myRunningPhotoshopVersion > 0.0) {
				myPhotoshop = myRunningPhotoshop;
			}
			
			// Запустить фотошоп, ежели чего
			if (!BridgeTalk.isRunning(myPhotoshop)) {
				BridgeTalk.launch(myPhotoshop);
			}
			while (BridgeTalk.getStatus(myPhotoshop) != "IDLE") { BridgeTalk.pump() }
			BridgeTalk.bringToFront("indesign");
			
			// Функция запроса дополнительного ожидания
			function confirmTimeout() {
				if (confirm(localize(msgPhotoshopTimeout))) {
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
			myBT.body += File.encode(grc) + "\", \"";
			myBT.body += File.encode(myNewFilePath) + "\", ";
			myBT.body += mySelectedGraphics[grc][kGraphicsResample] + ", ";
			myBT.body += myPreferences[kPrefsResampleMethod] + ", ";
			myBT.body += mySelectedGraphics[grc][kGraphicsActualDPI] + ", ";
			myBT.body += myTargetDPI + ", ";
			myBT.body += mySelectedGraphics[grc][kGraphicsMaxPercentage] + ", ";
			myBT.body += myChangeFormatCode + ", ";
			myBT.body += myPreferences[kPrefsMakeLayerFromBackground] + ", ";
			myBT.body += myPreferences[kPrefsLeaveGraphicsOpen];
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
			alert(localize(msgErrorProcessingImage, grc, myReturnMessage));
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
function relinkImages() {
	// посчитать линки
	var myTotalLinks = 0;
	for (var grc in mySelectedGraphics) {
		myTotalLinks += dictionaryLength(mySelectedGraphics[grc][kGraphicsObjectList]);
	}
	
	showStatus(localize(msgRelinkingImagesStatus), "", 0, myTotalLinks);
	
	// Пройдёмся по всем картинкам
	for (var grc in mySelectedGraphics) {
		
		// Пройдёмся по всем вхождениям
		var myGraphicsList = mySelectedGraphics[grc][kGraphicsObjectList];
		for (var itm in myGraphicsList) {
			showStatus(undefined, mySelectedGraphics[grc][kGraphicsName], undefined, undefined);
			
			//var myDocument = myDocuments[myGraphicsList[itm][kGraphicsParentDocument]][kDocumentsObject];
			var myDocument = myDocuments[myGraphicsList[itm][kGraphicsParentDocument]][kDocumentsObject];
			
			// Сохраним reference pointы во всех окошках документа
			var myReferencePoints = [];
			for (var wnd = 0; wnd < myDocument.layoutWindows.length; wnd++) {
				myReferencePoints[wnd] = myDocument.layoutWindows[wnd].transformReferencePoint;
				myDocument.layoutWindows[wnd].transformReferencePoint = AnchorPoint.TOP_LEFT_ANCHOR;
			}
			
			// Убить clipping?
			if ((myPreferences[kPrefsChangeFormat]) &&
				(myPreferences[kPrefsChangeFormatTo] != kPrefsChangeFormatToTIFF) &&
				(myPreferences[kPrefsRemoveClipping]) && 
				(myGraphicsList[itm][kGraphicsObject].clippingPath.clippingType != ClippingPathType.NONE)) {
				myGraphicsList[itm][kGraphicsObject].clippingPath.clippingType = ClippingPathType.NONE;
			}
			
			// Найдём линк в общедокументном списке линков
			var myLink;
			for (var dcl = 0; dcl < myDocument.links.length; dcl++) {
				if (myGraphicsList[itm][kGraphicsObject].itemLink.id == myDocument.links[dcl].id) {
					myLink = myDocument.links[dcl];
				}
			}
			
			// Это релинк?
			if (mySelectedGraphics[grc][kGraphicsDoRelink]) {
				myLink.relink(mySelectedGraphics[grc][kGraphicsNewFilePath]);
			}
			
			// Обновляем
			myLink.status;
			myGraphicsList[itm][kGraphicsObject] = myLink.update().parent;
			
			// Скорректируем размер
			if (mySelectedGraphics[grc][kGraphicsResample]) {
				myGraphicsList[itm][kGraphicsObject].absoluteHorizontalScale = (myGraphicsList[itm][kGraphicsObjectHScale] / mySelectedGraphics[grc][kGraphicsMaxPercentage]) * 100;
				myGraphicsList[itm][kGraphicsObject].absoluteVerticalScale = (myGraphicsList[itm][kGraphicsObjectVScale] / mySelectedGraphics[grc][kGraphicsMaxPercentage]) * 100;
			}
			
			// Восстановим reference pointы
			for (var wnd = 0; wnd < myDocument.layoutWindows.length; wnd++) {
				myDocument.layoutWindows[wnd].transformReferencePoint = myReferencePoints[wnd];
			}
			
			if (myFlagStopExecution) { break }
			
			showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
		}
		
		// Удалить исходник?
		if ((myPreferences[kPrefsDeleteOriginals]) && (mySelectedGraphics[grc][kGraphicsDoRelink])) {
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
	showStatus(localize(msgSavingDocumentsStatus), "", 0, dictionaryLength(myDocuments));
	
	for (var doc in myDocuments) {
		showStatus(undefined, myDocuments[doc][kDocumentsObject].name, undefined, undefined);
		
		myDocuments[doc][kDocumentsObject].save();
		
		showStatus(undefined, undefined, myStatusWindowGauge.value + 1, undefined);
	}
	
	showStatus(undefined, undefined, myStatusWindowGauge.maxvalue, myStatusWindowGauge.maxvalue);
	hideStatus();
	
	return !myFlagStopExecution;
}

// Получить уникальный ID документа
// ------------------------------------------------------
function documentID(myDocument) {
	if (myAppVersion > 6) {
		// старше 4-го CS, можно использовать .id
		return myDocument.id;
	} else {
		// не старше (чёрт!)
		try {
			return myDocument.fullName.fullName;
		} catch (e) {
			// несохранённый документ (чёрт, чёрт!)
			return;
		}
	}
}

// Лежит ли картинка на pasteboard
// ------------------------------------------------------
function withinBleeds(myGraphic) {
	// Уплыла по тексту в оверсет?
	try { myGraphic.visibleBounds } catch (e) { return false };
	
	// Получим документ этой картинки
	var myDocument = documentOfGraphic(myGraphic);
	
	// Найдём разворот, на котором лежит картинка
	var mySpread;
	for (var spr = 0; spr < myDocument.spreads.length; spr++) {
		for (var grc = 0; grc < myDocument.spreads[spr].allGraphics.length; grc++) {
			if (myGraphic.id == myDocument.spreads[spr].allGraphics[grc].id) {
				mySpread = myDocument.spreads[spr];
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

// Проверка картинки на нормальность линка
// ------------------------------------------------------
function isGraphicLinkNormal(myGraphic) {
	return ((myGraphic.itemLink != undefined) && (myGraphic.itemLink.status == LinkStatus.NORMAL));
}

// Проверка картинки на скопипастченность
// ------------------------------------------------------
function isGraphicPasted(myGraphic) {
	return (myGraphic.itemLink == undefined);
}

// Проверка картинки на внедрённость
// ------------------------------------------------------
function isGraphicEmbedded(myGraphic) {
	return ((!isGraphicPasted(myGraphic)) && (myGraphic.itemLink.status == LinkStatus.LINK_EMBEDDED));
}

// Проверка картинки на растровую графику
// ------------------------------------------------------
function isGraphicRaster(myGraphic) {
	return (myGraphic.reflect.name == "Image");
}

// Проверка картинки на битмапность
// ------------------------------------------------------
function isGraphicBitmap(myGraphic) {
	try {
		return (myGraphic.space == "Black and White");
	} catch (e) {
		return false;
	}
}

// Проверка картинки на формат, подпадающий под обработку
// ------------------------------------------------------
function isGraphicChangeFormat(myGraphic) {
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

// Проверка цветной или серой картинки на низкое dpi
// ------------------------------------------------------
function isGraphicColorDPILow(myGraphicDPI) {
	// всегда делаем ресэмпл при дельте == 0
	if (myPreferences[kPrefsColorDelta] == 0) {
		return true;
	} else {
		return (myGraphicDPI < (myPreferences[kPrefsColorTargetDPI] - myPreferences[kPrefsColorDelta]));
	}
}

// Проверка цветной или серой картинки на высокое dpi
// ------------------------------------------------------
function isGraphicColorDPIHigh(myGraphicDPI) {
	// всегда делаем ресэмпл при дельте == 0
	if (myPreferences[kPrefsColorDelta] == 0) {
		return true;
	} else {
		return (myGraphicDPI > (myPreferences[kPrefsColorTargetDPI] + myPreferences[kPrefsColorDelta]));
	}
}

// Проверка битмап-картинки на низкое dpi
// ------------------------------------------------------
function isGraphicBitmapDPILow(myGraphicDPI) {
	return (myGraphicDPI < (myPreferences[kPrefsBitmapTargetDPI] - myPreferences[kPrefsBitmapDelta]));
}

// Проверка битмап-картинки на высокое dpi
// ------------------------------------------------------
function isGraphicBitmapDPIHigh(myGraphicDPI) {
	return (myGraphicDPI > (myPreferences[kPrefsBitmapTargetDPI] + myPreferences[kPrefsBitmapDelta]));
}

// Получить самый низкий effective dpi
// ------------------------------------------------------
function lowestDPI(myGraphic) {
	var myHorizontalDPI = Math.abs((myGraphic.actualPpi[0] * 100) / myGraphic.absoluteHorizontalScale);
	var myVerticalDPI = Math.abs((myGraphic.actualPpi[1] * 100) / myGraphic.absoluteVerticalScale);
	return (myHorizontalDPI < myVerticalDPI ? myVerticalDPI : myVerticalDPI);
}

// Получить самый высокий absolute scale
// ------------------------------------------------------
function maxPercentage(myGraphic) {
	var myHorizontalPercent = Math.abs((myGraphic.absoluteHorizontalScale / 100) * (myGraphic.parent.absoluteHorizontalScale / 100));
	var myVerticalPercent = Math.abs((myGraphic.absoluteVerticalScale / 100) * (myGraphic.parent.absoluteVerticalScale / 100));
	return (myHorizontalPercent > myVerticalPercent ? myHorizontalPercent : myVerticalPercent);
}

// Проверка картинки на clipping
// ------------------------------------------------------
function hasClippingPath(myGraphic) {
	return (myGraphic.clippingPath.clippingType != ClippingPathType.NONE);
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

// Получить имя страницы картинки
// ------------------------------------------------------
function pageOfGraphic(myGraphic) {
	
	// получить название разворота
	function spreadName(mySpread) {
		var name = "PB:";
		try {
			for (var pge = 0; pge < mySpread.pages.length; pge++) {
				name = name + mySpread.pages[pge].name;
				if (pge + 1 < mySpread.pages.length) {
					name = name + "-";
				}
			}
			return name;
		} catch (e) {
			return "OFF";
		}
	}
	
	// получить название страницы
	function getParentPage() {
		var myParentObject = myGraphic.parent;
		while ((myParentObject.reflect.name != "Page") && (myParentObject.reflect.name != "Spread") && (myParentObject.reflect.name != "Document")) {
			myParentObject = myParentObject.parent;
		}
		
		return (myParentObject.reflect.name == "Page" ? myParentObject.name : spreadName(myParentObject));
	}
	
	if (myAppVersion >= 6) {
		// CS5
		try {
			return myGraphic.parent.parentPage.name;
		} catch (e) {
			return getParentPage();
		}
	} else {
		// до CS5
		return getParentPage();
	}
}

// Размер dictionary
// ------------------------------------------------------
function dictionaryLength(myDictionaryObject) {
	var myLength = 0;
	
	for (var key in myDictionaryObject)
		if (myDictionaryObject.hasOwnProperty(key)) myLength++;
	return myLength;
};

// Доливка нулями
// ------------------------------------------------------
function fillZeros(myNumber, myMinDigits) {
	var myString = "" + myNumber;
	while (myString.length < myMinDigits)
		myString = "0" + myString;
	return myString;
}

// Доливка пробелами
// ------------------------------------------------------
function fillSpaces(myNumber, myMinDigits) {
	var myString = "" + myNumber;
	while (myString.length < myMinDigits)
		myString = " " + myString;
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

// Проверим папку на readonly
// ------------------------------------------------------
function isFolderReadOnly(myFolder) {
	if (!myFolders.hasOwnProperty(myFolder)) {
		var myTestFile = new File(myFolder + "/.readonlytest");
		myFolders[myFolder] = !myTestFile.open("w");
		myTestFile.remove();
	}
	
	return myFolders[myFolder];
}

// Почистить путь от слэшей
// ------------------------------------------------------
function cleanupPath(myPath) {
	return myPath.replace(/[:]/g, "-");
}

// Клонировать объект-словарь
// ------------------------------------------------------
function cloneDictionary(obj) {
	if (null == obj) return obj;
	
	// объект-словарь?
	if (obj instanceof myDictionary) {
		var copy = new myDictionary();
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				copy[key] = cloneDictionary(obj[key]);
			}
		}
		return copy;
	} else {
		return obj;
	}
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
