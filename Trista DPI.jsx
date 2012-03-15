// Пакетная обработка растровых изображений в документах Adobe InDesign
//
// Денис Либит
// Студия КолорБокс
// denis@boxcolor.ru
// www.boxcolor.ru
//
// https://github.com/bteapot/Trista-DPI
// -----------------------------------------------------------------------------------

#target indesign

// Локализованные сообщения
const kDefaultLocale = "en";
const kLocalesList = [
	["ru", "Русский"],
	["en", "English"]];

const msgCheckingOpenedDocumentsStatus = {
	ru: "ПРОВЕРКА ОТКРЫТЫХ ДОКУМЕНТОВ",
	en: "CHECKING OPENED DOCUMENTS" };
const msgRestoringBackup = {
	ru: "ВОССТАНОВЛЕНИЕ РЕЗЕРВНОЙ КОПИИ",
	en: "RESTORING BACKUP" };
const msgCheckingImagesStatus = {
	ru: "ПРОВЕРКА КАРТИНОК",
	en: "CHECKING IMAGES" };
const msgBackupStatus = {
	ru: "РЕЗЕРВНОЕ КОПИРОВАНИЕ",
	en: "BACKUP" };
const msgDeleteOldBackupsStatus = {
	ru: "УДАЛЕНИЕ СТАРЫХ РЕЗЕРВНЫХ КОПИЙ",
	en: "DELETING OLD BACKUPS" };
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
const msgNoDocumentsOpen = {
	ru: "Не открыт ни один документ.\nДля работы скрипта необходимо, чтобы были открыты один или несколько документов.\n\nМожно тихо-спокойно прекратить работу скрипта, а можно восстановить ранее сделанную резервную копию.",
	en: "No documents opened.\nOne or more documents should be opened to proceed.\n\nIt is possible to terminate script now, or to restore previous backup." };
const msgChooseBackupFolderToRestoreFrom = {
	ru: "Выберите папку, из которой будем восстанавливать резервную копию.",
	en: "Choose backup folder to restore from" };
const msgLogFileOpenError = {
	ru: "Ошибка при открытии log-файла этой резервной копии.\nУбедитесь, что выбранная папка содержит ранее сделанную резервную копию и попробуйте ещё раз.",
	en: "Error opening log-file.\nEnsure that selected folder contains previously made backup and try again." };
const msgLogFileStructureError = {
	ru: "Выбранная резервная копия не была завершена.\nИз соображений безопасности автоматическое восстановление этой резервной копии проводится не будет. Лучше ручками.",
	en: "Selected backup was not completed correctly.\nAutomatic recovery of this backup will not be performed for security reasons. Try to do it manually." };
const msgReplaceFilesWarning = {
	ru: "Файлы резервной копии будут восстановлены по указанным ниже адресам.\n\nФайлы, находящиеся там в данный момент, будут необратимо заменены.\n\nПродолжить?",
	en: "Files from selected backup will be restored to URLs listed below.\n\nFiles that resides there now will be replaced.\n\nContinue?" };
const msgErrorRestoringBackupFile = {
	ru: "Ошибка при восстановлении файла.\n%1\n\nПроверьте права доступа, свободное место и т.п.",
	en: "Error restoring file.\n%1\n\nCheck permissions, free space, etc." };
const msgErrorOpeningBackupDocument = {
	ru: "Ошибка при открытии документа из восстановленной резервной копии.\nЭто может быть связано с тем, что документ был создан в более новой версии InDesign.",
	en: "Error opening restored document.\n.It possibly was created by newer version of InDesign." };
const msgRestorationDone = {
	ru: "Резервная копия восстановлена.\nВосстановленный документ открыт в InDesign.",
	en: "Backup restored.\nRestored document are opened in Indesign." };
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
const msgChangeFormatOfNone = {
	ru: "Не изменять формат файлов",
	en: "Do not change format of files" };
const msgChangeFormatOfWrong = {
	ru: "Пересохранять JPEG, PNG и т.п.",
	en: "Change format of JPEG, PNG etc." };
const msgChangeFormatOfAll = {
	ru: "Пересохранить все файлы",
	en: "Change format of all files" };
const msgBackgroundLayerToNormalLayer = {
	ru: "Оторвать слой от фона",
	en: "Background layer to normal layer" };
const msgRemoveClipping = {
	ru: "Убрать обтравку",
	en: "Remove clipping" };
const msgProcessPhotoshopEPS = {
	ru: "Обрабатывать файлы Photoshop EPS",
	en: "Process Photoshop EPS files" };
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
	ru: "Делать резервную копию",
	en: "Do backup" };
const msgChoose = {
	ru: "Выбрать",
	en: "Choose" };
const msgDeleteOldBackups = {
	ru: "Удалять резервные копии старше месяца",
	en: "Delete backups created more than month ago" };
const msgWarning = {
	ru: "Предупреждение",
	en: "Warning" };
const msgMultipleEntriesDescription = {
	ru: "Выбранные картинки встречаются в открытых документах несколько раз.\n\nМожно обработать только выбранные в документе картинки, проигнорировав остальные вхождения, а можно и учесть их при обработке.",
	en: "Selected images are placed more than once in opened documents.\n\nIt is possible to process only images, selected in document, by ignoring other entries, or to process all instances." };
const msgErrorSavingPreferences = {
	ru: "Ошибка при сохранении настроек.\nВообще такого не должно было случиться, поэтому на всякий случай дальнейшее выполнение скрипта отменяется.",
	en: "Error saving preferences.\nIn general, this should not happen, so just in case the further execution of the script is canceled." };
const msgEmbeddedImage = {
	ru: "<внедрённая картинка>",
	en: "<embedded image>" };
const msgNoImagesToProcess = {
	ru: "Нет картинок, нуждающихся в обработке.\nПоздравляю!",
	en: "There is no images to process.\nCongratulations!" };
const msgErrorDeletingBackupFolder = {
	ru: "Ошибка при удалении элемента резервной копии:\n%1",
	en: "Error deleting backup element:\n%1" };
const msgErrorCreatingBackupFolder = {
	ru: "Ошибка при создании папки резервных копий.\nПроверьте правильность пути, слэш на конце, права доступа и т.п.",
	en: "Error creating backup folder.\nCheck path, trailing slash, permissions, etc." };
const msgErrorCopyingFile = {
	ru: "Ошибка при резервном копировании файла.\n%1\n\nПроверьте права доступа, свободное место и т.п.",
	en: "Error copying file.\n%1\n\nCheck permissions, free space, etc." };
const msgPhotoshopNotInstalled = {
	ru: "Не найдено ни одной версии Фотошопа, способной общаться с этой версией ИнДизайна через BridgeTalk.\nЭто лечится только установкой Фотошопа из той-же версии CS, что и ИнДизайн.",
	en: "No Photoshop version that able to communicate with this version of InDesign through BridgeTalk found.\nThat can be corrected by installing Photoshop of the same CS version as InDesign." };
const msgPhotoshopTimeout = {
	ru: "Фотошоп не отвечает на запросы.\nВозможно, он там чем-то занят и всё-таки скоро освободится.\n\nПодождать ещё?",
	en: "Photoshop is not responding.\nIt's possibly very busy right now, but will unfreeze soon.\n\nWait a little bit more?" };
const msgErrorProcessingImage = {
	ru: "Ошибка при обработке изображения\n%1\n\n%2",
	en: "Error processing image\n%1\n\n%2" };
const msgImagesToProcess = {
	ru: "Картинки в обработку",
	en: "Images to process" };

// Объект-словарь
function dictionary() {
	
}

// Глобальные переменные
var appVersion;

var statusWindow;
var statusWindowPhase;
var statusWindowObject;
var statusWindowGauge;

var preferences = {};
var preferencesFileName;
var tempFolder;

var smallFont;
var headerColor = [0.1, 0.1, 0.1];

var documents = new dictionary();
var documentSelection = new dictionary();
var graphics = new dictionary();
var selectedGraphics = new dictionary();
var folders = new dictionary();
var activeDocument;

var flagStopExecution = false;
var flagRestart;
var flagEPSScanned = false;
var flagOldBackupsDeleted = false;

// Константы
const kPrefsLocale = "locale";
const kPrefsProcessBitmaps = "processBitmaps";
const kPrefsLeaveGraphicsOpen = "leaveGraphicsOpen";
const kPrefsChangeFormatOf = "changeFormat";
const kPrefsChangeFormatOfNone = "changeFormatOfNone";
const kPrefsChangeFormatOfWrong = "changeFormatOfWrong";
const kPrefsChangeFormatOfAll = "changeFormatOfAll";
const kPrefsChangeFormatTo = "changeFormatTo";
const kPrefsMakeLayerFromBackground = "makeLayerFromBackground";
const kPrefsRemoveClipping = "removeClipping";
const kPrefsDeleteOriginals = "deleteOriginals";
const kPrefsProcessPhotoshopEPS = "processPhotoshopEPS";
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
const kPrefsDeleteOldBackups = "deleteOldBackups";

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
const kGraphicsFormat = "graphicsFormat";
const kGraphicsResample = "graphicsResample";
const kGraphicsPhotoshopEPS = "graphicsPhotoshopEPS";
const kGraphicsBitmap = "graphicsBitmap";
const kGraphicsActualDPI = "graphicsActualDPI";
const kGraphicsLowestDPI = "graphicsLowestDPI";
const kGraphicsMaxPercentage = "graphicsMaxPercentage";
const kGraphicsHasClippingPath = "graphicsHasClippingPath";
const kGraphicsOnMaster = "graphicsOnMaster";
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

const kLogFileName = "backup.log";
const kLogFileEND = "END";
const kLogFileERR = "ERR";

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

const kChangeFormatToTIFF = 0;
const kChangeFormatToTIFFAndPSD = 1;
const kChangeFormatToPSD = 2;
const kChangeFormatToOptions = [
	[kChangeFormatToTIFF, {
		ru: "Сохранять как TIFF",
		en: "Save as TIFF" }],
	[kChangeFormatToTIFFAndPSD, {
		ru: "Сохранять как TIFF, с обтравкой в PSD",
		en: "Save as TIFF, PSD when clipping detected" }],
	[kChangeFormatToPSD, {
		ru: "Сохранять как PSD",
		en: "Save as PSD" }]];

const kMultipleEntriesSingle = 0;
const kMultipleEntriesMultiple = 1;
const kMultipleEntriesOptions = [
	[kMultipleEntriesSingle, {
		ru: "Обработать только выбранные картинки",
		en: "Process only selected images" }],
	[kMultipleEntriesMultiple, {
		ru: "Обработать все картинки",
		en: "Process all images" }]];

const kNoDocumentsOpenExit = 0;
const kNoDocumentsOpenRestoreBackup = 1;
const kNoDocumentsOpenOptions = [
	[kNoDocumentsOpenExit, {
		ru: "Завершить работу скрипта",
		en: "Terminate script" }],
	[kNoDocumentsOpenRestoreBackup, {
		ru: "Восстановить резервную копию",
		en: "Restore backup" }]];

const kStatusPanelWidth = 300;
const kDialogPanelWidth = 400;
const kServiceDialogSize = [400, 200];
const kDialogSubPanelMargins = [14, 14, 10, 10];
const kDialogSubControlMargins = [18, 0, 0, 0];
const kDialogSubControlWidth = 300;

var appSettingsPreserveBounds;
var appSettingsPreserveLocale;




main();

// "Стартую!" (эпитафия на могиле Неизвестной Секретарши)
// ------------------------------------------------------
function main() {
	preserveSettings();
	do { process() } while (flagRestart);
	restoreSettings();
}

// Главный производственный процесс
// ------------------------------------------------------
function process() {
	flagRestart = false;
	$.gc();
	
	if (!initialSettings()) return;
	if (!makeStatusWindow()) return;
	if (!restoreBackup()) return;
	if (!checkDocuments()) return;
	if (!analyseGraphics()) return;
	if (!displayPreferences()) return;
	if (!deleteOldBackups()) return;
	if (!backupImages()) return;
	if (!processImages()) return;
	if (!relinkImages()) return;
	if (!saveDocuments()) return;
}

// Сохраним текущие настройки индизайна
// ------------------------------------------------------
function preserveSettings() {
	appSettingsPreserveBounds = app.imagePreferences.preserveBounds;
	appSettingsPreserveLocale = $.locale;
	
	app.imagePreferences.preserveBounds = true;
}

// Восстановим настройки индизайна
// ------------------------------------------------------
function restoreSettings() {
	$.locale = appSettingsPreserveLocale;
	app.imagePreferences.preserveBounds = appSettingsPreserveBounds;
}

// Стартовые настройки
// ------------------------------------------------------
function initialSettings() {
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	app.scriptPreferences.enableRedraw = true;
	
	appVersion = Number(app.version.match(/^\d+/));
	
	// Включим локализацию
	$.localize = true;
	
	// Настройки по умолчанию
	preferences[kPrefsLocale] = kDefaultLocale;
	for (var itm in kLocalesList) {
		if ($.locale.slice(0, 2) == kLocalesList[itm][0]) {
			preferences[kPrefsLocale] = $.locale.slice(0, 2);
			break;
		}
	}
	
	preferences[kPrefsProcessBitmaps] = false;
	preferences[kPrefsLeaveGraphicsOpen] = false;
	
	preferences[kPrefsChangeFormatOf] = kPrefsChangeFormatOfWrong;
	preferences[kPrefsChangeFormatTo] = kChangeFormatToTIFFAndPSD;
	preferences[kPrefsMakeLayerFromBackground] = false;
	preferences[kPrefsRemoveClipping] = true;
	preferences[kPrefsDeleteOriginals] = true;
	preferences[kPrefsProcessPhotoshopEPS] = false;
	
	preferences[kPrefsScope] = kScopeActiveDoc;
	preferences[kPrefsIncludePasteboard] = false;
	
	preferences[kPrefsColorTargetDPI] = 300;
	preferences[kPrefsColorDownsample] = true;
	preferences[kPrefsColorUpsample] = false;
	preferences[kPrefsColorDelta] = 50;
	preferences[kPrefsBitmapTargetDPI] = 1200;
	preferences[kPrefsBitmapDownsample] = true;
	preferences[kPrefsBitmapUpsample] = false;
	preferences[kPrefsBitmapDelta] = 150;
	
	preferences[kPrefsResampleMethod] = kResampleBicubic;
	
	preferences[kPrefsBackup] = true;
	preferences[kPrefsDeleteOldBackups] = false;
	
	// Определение платформы
	if ($.os.toLowerCase().indexOf("macintosh") != -1) {
		// Маки
		preferencesFileName = "~/Library/Preferences/ru.colorbox.trista-dpi.txt";
		preferences[kPrefsBackupFolder] = Folder.encode(Folder.myDocuments + "/Trista DPI backup/");
		tempFolder = Folder.temp + "/";
	} else if ($.os.toLowerCase().indexOf("windows") != -1) {
		// Виндовз
		preferencesFileName = Folder.userData + "/ru.colorbox.trista-dpi.txt";
		preferences[kPrefsBackupFolder] = Folder.myDocuments + "/Trista DPI backup/";
		tempFolder = Folder.temp + "/";
	}

	// Загрузить настройки
	var preferencesFile = new File(preferencesFileName);
	if (preferencesFile.exists) {
		if (preferencesFile.open("r")) {
			var preferencesArray = preferencesFile.read(preferencesFile.length).split("\n");
			var preferenceRecord = [];
			
			for (var prf in preferencesArray) {
				preferenceRecord = preferencesArray[prf].split("\t");
				
				// Грузим только известные науке настройки, чтобы не захламлять файл с преференсами
				if (preferences.hasOwnProperty(preferenceRecord[0])) {
					if (preferenceRecord[1] == "boolean") {
						preferences[preferenceRecord[0]] = (preferenceRecord[2] == "true");
					} else if (preferenceRecord[1] == "number") {
						preferences[preferenceRecord[0]] = Number(preferenceRecord[2]);
					} else {
						preferences[preferenceRecord[0]] = preferenceRecord[2];
					}
				}
			}
			
			preferencesFile.close();
		} else {
			alert(msgPreferencesError);
			return false;
		}
	}
	
	// Установить сохранённую ранее локализацию
	$.locale = preferences[kPrefsLocale];
	
	return true;
}

// Соберём окно с градусником
// ------------------------------------------------------
function makeStatusWindow() {
	// Уже сделано?
	if (statusWindow != undefined) return true;
	
	// Собираем палитру
	statusWindow = new Window("palette", localize(msgExecution));
	statusWindow.orientation = "row";
	statusWindow.alignChildren = ["fill", "top"];
	
	// Константы
	smallFont = statusWindow.graphics.font = ScriptUI.newFont("dialog", "Regular", 10);
	
	// Область отображения статусных данных
	var myDisplayZone = statusWindow.add("group");
	myDisplayZone.orientation = "column";
	myDisplayZone.minimumSize.width = kStatusPanelWidth;
	myDisplayZone.maximumSize.width = kStatusPanelWidth;
	myDisplayZone.alignChildren = ["fill", "top"];
	
	// Элементы статусных данных
	
	// Фаза
	statusWindowPhase = myDisplayZone.add("statictext", undefined, "\u00A0");
	statusWindowPhase.minimumSize.height = 30;
	statusWindowPhase.alignment = ["fill", "top"];
	statusWindowPhase.justify = "left";
	statusWindowPhase.graphics.font = ScriptUI.newFont("dialog", "Bold", 12);
	statusWindowPhase.graphics.foregroundColor = statusWindowPhase.graphics.newPen(statusWindowPhase.graphics.PenType.SOLID_COLOR, headerColor, 1);
	
	// Объект и градусник
	statusWindowObject = myDisplayZone.add("statictext", undefined, "\u00A0");
	statusWindowObject.alignment = ["fill", "top"];
	statusWindowObject.justify = "left";
	statusWindowObject.graphics.font = smallFont;
	
	statusWindowGauge = myDisplayZone.add ("progressbar", undefined, 0, 100);
	
	// Область отображения кнопок
	var myControlGroup = statusWindow.add("group");
	myControlGroup.orientation = "column";
	myControlGroup.alignment = ["right", "bottom"];
	
	// Кнопки окошка
	var myCancelButton = myControlGroup.add("button", undefined, localize(msgCancel), {name: "cancel"});
	myCancelButton.onClick = function() {
		flagStopExecution = true;
	}
	
	return true;
}

// Покажем статус в окне с градусником
// ------------------------------------------------------
function showStatus(myPhase, myObject, myGaugeCurrent, myGaugeMax) {
	if (!statusWindow.visible) statusWindow.show();
	
	// Обновим что нужно
	if (myPhase != undefined) statusWindowPhase.text = myPhase;
	if (myObject != undefined) statusWindowObject.text = myObject;
	if (myGaugeCurrent != undefined) statusWindowGauge.value = myGaugeCurrent;
	if (myGaugeMax != undefined) statusWindowGauge.maxvalue = myGaugeMax;
	
	// Отрисуем окошко
	//statusWindow.layout.layout(true);
	app.cascadeWindows();
}

// Спрячем окно с градусником
// ------------------------------------------------------
function hideStatus() {
	// Очистим окошко
	statusWindowPhase.text = "";
	statusWindowObject.text = "";
	statusWindowGauge.value = 0;
	statusWindowGauge.maxvalue = 1;
	
	//if (appVersion == 6) { statusWindow.update() }
	statusWindow.hide();
}

// Восстановим ранее сохранённую резервную копию
// ------------------------------------------------------
function restoreBackup() {
	// работаем только если не открыт ни один документ
	if (app.documents.length > 0) return true;
	
	// спросим, выйти или восстановить бэкап
	var decisionResult = askForDecision(msgWarning, msgNoDocumentsOpen, kNoDocumentsOpenOptions, kNoDocumentsOpenExit);
	
	if (decisionResult == kNoDocumentsOpenRestoreBackup) {
		// получим папку с бэкапом
		var backupFolder = new Folder(preferences[kPrefsBackupFolder]);
		backupFolder = backupFolder.selectDlg(localize(msgChooseBackupFolderToRestoreFrom));
		if (backupFolder == null) return false;
		
		// откроем лог
		var logFile = new File(backupFolder.fullName + "/" + kLogFileName);
		if (!logFile.open("r")) {
			alert(localize(msgLogFileOpenError));
			return false;
		}
		
		// прочтём лог
		var logArray = logFile.read(logFile.length).split("\n");
		
		// закроем лог-файл
		logFile.close();		
		
		// разберём записи лога
		var log = new dictionary();
		var logRecord;
		
		for (var itm in logArray) {
			if (logArray[itm] != "") {
				logRecord = logArray[itm].split("\t");
				if (logRecord.length != 2) {
					alert(localize(msgLogFileStructureError));
					return false;
				}
				log[logRecord[0]] = logRecord[1];
			}
		}
		
		// резервное копирование было завершено штатно?
		if (log[kLogFileEND] != kLogFileEND) {
			alert(localize(msgLogFileStructureError));
			return false;
		}
		delete log[kLogFileEND];
		
		// последнее предупреждение
		var lastWarningDialog = new Window("dialog", localize(msgWarning));
		with (lastWarningDialog) {
			orientation = "column";
			alignChildren = ["fill", "top"];
			preferredSize = kServiceDialogSize;
			
			with (add("statictext", undefined, localize(msgReplaceFilesWarning), {multiline: true})) {
				alignment = "fill";
			}
			
			var itemsList = add("listbox", undefined, undefined, {multiselect:true, numberOfColumns:1, showHeaders:false});
			with (itemsList) {
				alignment = ["fill", "fill"];
				maximumSize = [kServiceDialogSize[0] + 200 - kDialogSubPanelMargins[2] - kDialogSubPanelMargins[3], 350];
				minimumSize = [kServiceDialogSize[0] - kDialogSubPanelMargins[2] - kDialogSubPanelMargins[3], 350];
				
				for (var itm in log) {
					itemsList.add("item", File.decode(log[itm]));
				}
			}
			
			with (add("group")) {
				alignChildren = ["fill", "fill"];
				margins = kDialogSubPanelMargins;
				
				with (add("panel")) {
					orientation = "column";
					alignChildren = ["left", "top"];
					margins = kDialogSubPanelMargins;
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "top"];
				margins = kDialogSubPanelMargins;
				
				add("button", undefined, localize(msgCancel), {name: "cancel"});
				add("button", undefined, localize(msgOK), {name: "ok"});					
			}
		}
		
		// отмена?
		if (lastWarningDialog.show() == 2) return false;
		
		// поехали
		showStatus(localize(msgRestoringBackup), "", 0, dictionaryLength(log));
		
		var sourceFile;
		for (var itm in log) {
			sourceFile = new File(backupFolder.fullName + "/" + File.decode(itm));
			
			showStatus(undefined, File.decode(sourceFile.name), statusWindowGauge.value + 1, undefined);
			
			if (!sourceFile.copy(log[itm])) {
				alert(localize(msgErrorRestoringBackupFile, File.decode(sourceFile.name)));
				return false;
			}
			
			if (flagStopExecution) return false;
		}
		
		showStatus(undefined, undefined, dictionaryLength(log), undefined);
		hideStatus();
		
		// откроем восстановленный документ в InDesign
		app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
		try {
			var restoredDocument = app.open(new File(logArray[0].split("\t")[1]));
		} catch (e) {
			alert(localize(msgErrorOpeningBackupDocument));
			return false;
		}
		app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
		
		// обновим линки (ибо где тот способ в яваскрипт, что позволял бы выставить даты создания и изменения?)
		showStatus(localize(msgRelinkingImagesStatus), "", 0, restoredDocument.links.length);
		
		var linkedFile;
		for (var lnk = 0; lnk < restoredDocument.links.length; lnk++) {
			
			linkedFile = new File(restoredDocument.links[lnk].filePath);
			
			showStatus(undefined, undefined, statusWindowGauge.value + 1, undefined);
			
			for (var itm in log) {
				if (log[itm] == File.encode(linkedFile.fullName)) {
					showStatus(undefined, File.decode(linkedFile.name), undefined, undefined);
					restoredDocument.links[lnk].update();
					break;
				}
			}
			
			if (flagStopExecution) return false;
		}
		
		showStatus(undefined, undefined, restoredDocument.links.length, undefined);
		hideStatus();
		
		restoredDocument.save();
		
		// доложимся, что, мол, всё готово
		alert(localize(msgRestorationDone));
	}
	
	// выходим из скрипта
	return false;
}

// Проверим открытые документы
// ------------------------------------------------------
function checkDocuments() {
	// Уже сделано?
	if (dictionaryLength(documents) > 0) return true;
	
	showStatus(localize(msgCheckingOpenedDocumentsStatus), "", 0, app.documents.length);
	
	activeDocument = documentID(app.activeDocument);
	
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
		documents[docID] = {};
		documents[docID][kDocumentsName] = myDocument.name;
		documents[docID][kDocumentsObject] = myDocument;
		documents[docID][kDocumentsModified] = myDocument.modified;
		documents[docID][kDocumentsFileReadonly] = myDocument.readOnly;
		documents[docID][kDocumentsLinksTotal] = myDocument.links.length;
		documents[docID][kDocumentsLinksNormal] = myLinksNormal;
		documents[docID][kDocumentsLinksOutOfDate] = myLinksOutOfDate;
		documents[docID][kDocumentsLinksMissing] = myLinksMissing;
		documents[docID][kDocumentsLinksEmbedded] = myLinksEmbedded;
		
		documents[docID][kDocumentsProcessable] = (
			(!documents[docID][kDocumentsModified]) &&
			(!documents[docID][kDocumentsFileReadonly]) &&
			(documents[docID][kDocumentsLinksOutOfDate] == 0));
		
		documents[docID][kDocumentsBackupList] = {};
		
		if (flagStopExecution) { break }
	}
	
	// Предупредить о необновлённых картинках
	var myDocListString = "";
	for (var doc in documents) {
		if (documents[doc][kDocumentsLinksOutOfDate] > 0) {
			if (myDocListString.length > 0) {
				myDocListString += ", " + documents[doc][kDocumentsName];
			} else {
				myDocListString = documents[doc][kDocumentsName];
			}
		}
	}
	
	if (myDocListString.length > 0) {
		if (!confirm(localize(msgConfirmOutdatedImages, myDocListString)))
			return false;
	}
	
	showStatus(undefined, undefined, app.documents.length, undefined);
	hideStatus();
	
	return !flagStopExecution;
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
		var myIsPhotoshopEPS = false;
		
		// Линк в порядке?
		if (!isGraphicLinkNormal(myGraphic)) myDoProcess = false;
		
		// Это не растр?
		if (!isGraphicRaster(myGraphic)) {
			// Обрабатываем фотошоповские EPSы?
			if (preferences[kPrefsProcessPhotoshopEPS]) {
				if (isGraphicPhotoshopEPS(myGraphic)) {
					myIsPhotoshopEPS = true;
				} else {
					myDoProcess = false;
				}
			} else {
				myDoProcess = false;
			}
		}
		
		// Заглушка -- Линк не скопипастченный?
		//if (isGraphicPasted(myGraphic)) myDoProcess = false;
		
		// Заглушка -- Линк не внедрённый?
		//if (isGraphicEmbedded(myGraphic)) myDoProcess = false;
		
		// Битмап?
		if ((!preferences[kPrefsProcessBitmaps]) && (isGraphicBitmap(myGraphic))) myDoProcess = false;
		
		// Обрабатываем?
		if (myDoProcess) {
			var grc = myGraphic.itemLink.filePath;
			
			// Проверим, не попадался уже ли этот файл
			if (!(grc in graphics)) {
				// Не попадался, добавим первое вхождение
				graphics[grc] = new dictionary();
				graphics[grc][kGraphicsName] = myGraphic.itemLink.name;
				graphics[grc][kGraphicsFormat] = graphicFormat(myGraphic);
				graphics[grc][kGraphicsResample] = false;
				graphics[grc][kGraphicsPhotoshopEPS] = myIsPhotoshopEPS;
				graphics[grc][kGraphicsBitmap] = isGraphicBitmap(myGraphic);
				graphics[grc][kGraphicsActualDPI] = actualPPI(myGraphic)[0];
				graphics[grc][kGraphicsHasClippingPath] = false;
				graphics[grc][kGraphicsOnMaster] = false;
				graphics[grc][kGraphicsObjectList] = new dictionary();
				
				// Проверка read-only
				var myFile = new File(myGraphic.itemLink.filePath);
				graphics[grc][kGraphicsFileReadonly] = myFile.readonly;
				graphics[grc][kGraphicsFolderReadonly] = isFolderReadOnly(myFile.parent);
			}
			
			// Добавим в список это вхождение
			var itm = myGraphic.id;
			
			graphics[grc][kGraphicsObjectList][itm] = new dictionary();
			graphics[grc][kGraphicsObjectList][itm][kGraphicsObject] = myGraphic;
			graphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] = documentID(documentOfGraphic(myGraphic));
			graphics[grc][kGraphicsObjectList][itm][kGraphicsParentPage] = pageOfGraphic(myGraphic);
			graphics[grc][kGraphicsObjectList][itm][kGraphicsWithinBleeds] = isGraphicWithinBleeds(myGraphic);
			graphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI] = lowestDPI(myGraphic);
			graphics[grc][kGraphicsObjectList][itm][kGraphicsMaxPercentage] = maxPercentage(myGraphic);
			graphics[grc][kGraphicsObjectList][itm][kGraphicsObjectHScale] = (myGraphic.absoluteFlip == Flip.HORIZONTAL ? -1 : 1) * myGraphic.absoluteHorizontalScale / 100;
			graphics[grc][kGraphicsObjectList][itm][kGraphicsObjectVScale] = (myGraphic.absoluteFlip == Flip.VERTICAL ? -1 : 1) * myGraphic.absoluteVerticalScale / 100;
			
			// Есть клиппинг?
			if (hasClippingPath(myGraphic)) {
				graphics[grc][kGraphicsHasClippingPath] = true;
			}
			
			// Картинка на мастере?
			if (isGraphicOnMaster(myGraphic)) {
				graphics[grc][kGraphicsOnMaster] = true;
			}
		}
		
		showStatus(undefined, undefined, statusWindowGauge.value + 1, undefined);
	}
	
	// Уже сделано?
	if (dictionaryLength(graphics) > 0) return true;
	
	// Сканируем EPSы?
	if (preferences[kPrefsProcessPhotoshopEPS]) flagEPSScanned = true;
	
	showStatus(localize(msgCheckingImagesStatus), "", 0, 0);
	
	// Посчитаем картинки
	var totalImages = 0;
	for (var doc in documents) {
		totalImages += documents[doc][kDocumentsObject].allGraphics.length;
	}
	showStatus(undefined, undefined, 0, totalImages);
	
	// Пройдёмся по всем документам
	for (var doc in documents) {
		if (documents[doc][kDocumentsProcessable]) {
			// Пройдёмся по всем картинкам
			for (var grc = 0; grc < documents[doc][kDocumentsObject].allGraphics.length; grc++) {
				checkGraphic(documents[doc][kDocumentsObject].allGraphics[grc]);
				if (flagStopExecution) { break }
			}
			if (flagStopExecution) { break }
		}
	}
	
	// Составим список выделенных картинок
	function parseObject(obj) {
		// графика?
		if (obj.reflect.name == "Image") {
			documentSelection[obj.id] = true;
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
	
	if (documents[activeDocument][kDocumentsObject].selection != null) {
		parseObject(documents[activeDocument][kDocumentsObject].selection);
	}
	
	hideStatus();
	
	// Нажата отмена?
	if (flagStopExecution) { return false }
	
	return true;
}

// Покажем диалог с настройками
// ------------------------------------------------------
function displayPreferences() {
	// Собираем диалоговое окно
	var preferencesDialog = new Window("dialog", localize(msgPreferences));
	
	// Флаги
	var myFlagChangeFormat = false;
	var myFlagResample = false;
	
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
		var myFile = new File(tempFolder + myFileName);
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
	preferencesDialog.orientation = "column";
	
	var myUpperGroup = preferencesDialog.add("group");
	myUpperGroup.orientation = "row";
	myUpperGroup.alignChildren = ["fill", "fill"];
	
	var myCommonGroup = myUpperGroup.add("group");
	myCommonGroup.orientation = "column";
	
	var myParametersGroup = myCommonGroup.add("group");
	myParametersGroup.orientation = "column";
	myParametersGroup.minimumSize.width = kDialogPanelWidth;
	myParametersGroup.alignChildren = ["fill", "top"];
	
	// Группа общих настроек
	with (myParametersGroup.add("panel", undefined, localize(msgCommonParameters))) {
		orientation = "column";
		minimumSize.width = kDialogPanelWidth;
		alignChildren = ["fill", "top"];
		margins = kDialogSubPanelMargins;
		
		// Обработка битмапов
		var myProcessBitmaps = add("checkbox", undefined, localize(msgProcessBitmaps));
		myProcessBitmaps.onClick = function() {
			preferences[kPrefsProcessBitmaps] = myProcessBitmaps.value;
			interfaceItemsChanged();
		}
		myProcessBitmaps.value = preferences[kPrefsProcessBitmaps];
		
		// Оставлять картинки открытыми в Фотошопе
		var myLeaveGraphicsOpen = add("checkbox", undefined, localize(msgLeaveImagesOpen));
		myLeaveGraphicsOpen.onClick = function() {
			preferences[kPrefsLeaveGraphicsOpen] = myLeaveGraphicsOpen.value;
		}
		myLeaveGraphicsOpen.value = preferences[kPrefsLeaveGraphicsOpen];
	}
		
	// Группа изменения формата
	with (myParametersGroup.add("panel", undefined, localize(msgFormatOfImages))) {
		orientation = "column";
		minimumSize.width = kDialogPanelWidth;
		alignChildren = ["fill", "top"];
		margins = kDialogSubPanelMargins;
		
		var myChangeFormatOfGroup = add("group");
		with (myChangeFormatOfGroup) {
			orientation = "column";
			alignChildren = ["left", "top"];
			
			var myChangeFormatOfNoneButton = add("radiobutton", undefined, localize(msgChangeFormatOfNone));
			myChangeFormatOfNoneButton.onClick = function() {
				preferences[kPrefsChangeFormatOf] = kPrefsChangeFormatOfNone;
				interfaceItemsChanged();
			}
			myChangeFormatOfNoneButton.value = (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfNone);
			
			var myChangeFormatOfWrongButton = add("radiobutton", undefined, localize(msgChangeFormatOfWrong));
			myChangeFormatOfWrongButton.onClick = function() {
				preferences[kPrefsChangeFormatOf] = kPrefsChangeFormatOfWrong;
				interfaceItemsChanged();
			}
			myChangeFormatOfWrongButton.value = (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfWrong);
			
			var myChangeFormatOfAllButton = add("radiobutton", undefined, localize(msgChangeFormatOfAll));
			myChangeFormatOfAllButton.onClick = function() {
				preferences[kPrefsChangeFormatOf] = kPrefsChangeFormatOfAll;
				interfaceItemsChanged();
			}
			myChangeFormatOfAllButton.value = (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfAll);
		}
		
		var myChangeFormatParametersGroup = myChangeFormatOfGroup.add("group");
		with (myChangeFormatParametersGroup) {
			orientation = "column";
			alignChildren = ["fill", "top"];
			margins = kDialogSubControlMargins;
			
			var myChangeFormatToDropdown = add("dropdownlist");
			for (var itm = 0; itm < kChangeFormatToOptions.length; itm++) {
				var newListItem = myChangeFormatToDropdown.add("item", localize(kChangeFormatToOptions[itm][1]));
				newListItem[kListItemObject] = kChangeFormatToOptions[itm][0];
				if (newListItem[kListItemObject] == preferences[kPrefsChangeFormatTo]) {
					myChangeFormatToDropdown.selection = newListItem;
				}
			}
			myChangeFormatToDropdown.onChange = function () {
				preferences[kPrefsChangeFormatTo] = myChangeFormatToDropdown.selection[kListItemObject];
				interfaceItemsChanged();
			}
			
			var myPSDOptionsGroup = add("group");
			with (myPSDOptionsGroup) {
				orientation = "column";
				alignChildren = ["left", "top"];
				margins = kDialogSubControlMargins;
				
				var myMakeLayerFromBackground = add("checkbox", undefined, localize(msgBackgroundLayerToNormalLayer));
				myMakeLayerFromBackground.onClick = function() {
					preferences[kPrefsMakeLayerFromBackground] = myMakeLayerFromBackground.value;
				}
				myMakeLayerFromBackground.value = preferences[kPrefsMakeLayerFromBackground];
		
				var myRemoveClipping = add("checkbox", undefined, localize(msgRemoveClipping));
				myRemoveClipping.onClick = function() {
					preferences[kPrefsRemoveClipping] = myRemoveClipping.value;
				}
				myRemoveClipping.value = preferences[kPrefsRemoveClipping];
			}

			var myProcessPhotoshopEPS = add("checkbox", undefined, localize(msgProcessPhotoshopEPS));
			myProcessPhotoshopEPS.onClick = function() {
				preferences[kPrefsProcessPhotoshopEPS] = myProcessPhotoshopEPS.value;
				if (!flagEPSScanned) {
					graphics = new dictionary();
					preferencesDialog.close(3);
				} else {
					interfaceItemsChanged();
				}
			}
			myProcessPhotoshopEPS.value = preferences[kPrefsProcessPhotoshopEPS];
			
			var myDeleteOriginals = add("checkbox", undefined, localize(msgRemoveSourceImages));
			myDeleteOriginals.onClick = function() {
				preferences[kPrefsDeleteOriginals] = myDeleteOriginals.value;
			}
			myDeleteOriginals.value = preferences[kPrefsDeleteOriginals];
		}
	}
	
	// Группа изменения разрешения
	with (myParametersGroup.add("panel", undefined, localize(msgChangeResolution))) {
		orientation = "column";
		minimumSize.width = kDialogPanelWidth;
		alignChildren = ["left", "center"];
		margins = kDialogSubPanelMargins;
		
		// Цветные изображения
		var myColorAndGrayscaleGraphicsGroup = add("group");
		with (myColorAndGrayscaleGraphicsGroup) {
			orientation = "row";
			alignChildren = ["right", "center"];
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["right", "center"];
				minimumSize.width = kDialogPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgColorAndGrayscale))) {
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorUpsample = add("checkbox", undefined, "+");
				myColorUpsample.value = preferences[kPrefsColorUpsample];
				myColorUpsample.onClick = function() {
					preferences[kPrefsColorUpsample] = myColorUpsample.value;
					interfaceItemsChanged();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myColorDownsample = add("checkbox", undefined, "-");
				myColorDownsample.value = preferences[kPrefsColorDownsample];
				myColorDownsample.onClick = function() {
					preferences[kPrefsColorDownsample] = myColorDownsample.value;
					interfaceItemsChanged();
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
				
				var myColorTargetDPI = add("edittext", undefined, preferences[kPrefsColorTargetDPI]);
				myColorTargetDPI.characters = 6;
				myColorTargetDPI.justify = "right";
				myColorTargetDPI.onChanging = function() {
					preferences[kPrefsColorTargetDPI] = parseInt(myColorTargetDPI.text);
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
				
				var myColorDelta = add("edittext", undefined, preferences[kPrefsColorDelta]);
				myColorDelta.characters = 6;
				myColorDelta.justify = "right";
				myColorDelta.onChanging = function() {
					preferences[kPrefsColorDelta] = parseInt(myColorDelta.text);
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
				minimumSize.width = kDialogPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgBitmap))) {
					justify = "right";
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapUpsample = add("checkbox", undefined, "+");
				myBitmapUpsample.value = preferences[kPrefsBitmapUpsample];
				myBitmapUpsample.onClick = function() {
					preferences[kPrefsBitmapUpsample] = myBitmapUpsample.value;
					interfaceItemsChanged();
				}
			}
			
			with (add("group")) {
				orientation = "row";
				alignChildren = ["left", "center"];
				
				var myBitmapDownsample = add("checkbox", undefined, "-");
				myBitmapDownsample.value = preferences[kPrefsBitmapDownsample];
				myBitmapDownsample.onClick = function() {
					preferences[kPrefsBitmapDownsample] = myBitmapDownsample.value;
					interfaceItemsChanged();
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
				
				var myBitmapTargetDPI = add("edittext", undefined, preferences[kPrefsBitmapTargetDPI]);
				myBitmapTargetDPI.characters = 6;
				myBitmapTargetDPI.justify = "right";
				myBitmapTargetDPI.onChanging = function() {
					preferences[kPrefsBitmapTargetDPI] = parseInt(myBitmapTargetDPI.text);
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
				
				var myBitmapDelta = add("edittext", undefined, preferences[kPrefsBitmapDelta]);
				myBitmapDelta.characters = 6;
				myBitmapDelta.justify = "right";
				myBitmapDelta.onChanging = function() {
					preferences[kPrefsBitmapDelta] = parseInt(myBitmapDelta.text);
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
				minimumSize.width = kDialogPanelWidth / 3;
				
				with (add("statictext", undefined, localize(msgMethod))) {
					justify = "right";
				}
			}
			
			var myResampleDropdown = add("dropdownlist");
			for (var itm = 0; itm < kResampleOptions.length; itm++) {
				myResampleDropdown.add("item", kResampleOptions[itm][1]);
			}
			myResampleDropdown.onChange = function () {
				preferences[kPrefsResampleMethod] = myResampleDropdown.selection;
			}
			myResampleDropdown.selection = kResampleBicubic;
		}
	}
	
	// Группа выбора области деятельности
	var myScopeGroup = myParametersGroup.add("panel", undefined, localize(msgScope));
	with (myScopeGroup) {
		orientation = "row";
		minimumSize.width = kDialogPanelWidth;
		alignChildren = ["fill", "fill"];
		margins = kDialogSubPanelMargins;
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
				preferences[kPrefsScope] = btn;
				
				// очистить список
				myItemsList.removeAll();
				
				// прореагировать в зависимости от кнопки
				switch (preferences[kPrefsScope]) {
					case kScopeAllDocs:
						// Все открытые документы
						myScopeItemsGroup.enabled = true;
						for (var doc in documents) {
							var newListItem = myItemsList.add("item", documents[doc][kDocumentsName]);
							newListItem[kListItemObject] = doc;
							if (documents[doc][kDocumentsProcessable]) {
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
						var newListItem = myItemsList.add("item", documents[activeDocument][kDocumentsName]);
						if (documents[activeDocument][kDocumentsProcessable]) {
							newListItem.image = myCircleGreenImage;
						} else {
							newListItem.image = myCircleRedImage;
						}
						break;
					case kScopeSelectedPages:
						// Выбранные страницы
						myScopeItemsGroup.enabled = (documents[activeDocument][kDocumentsProcessable]);
						for (var pge = 0; pge < documents[activeDocument][kDocumentsObject].pages.length; pge++) {
							var newListItem = myItemsList.add("item", documents[activeDocument][kDocumentsObject].pages[pge].name, pge);
							newListItem[kListItemObject] = documents[activeDocument][kDocumentsObject].pages[pge];
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
		if (documents[activeDocument][kDocumentsProcessable]) {
			if (dictionaryLength(documentSelection) > 0) {
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
				myButton.enabled = (dictionaryLength(documents) > 1);
				break;
			case kScopeActiveDoc:
				myButton.enabled = documents[activeDocument][kDocumentsProcessable];
				break;
			case kScopeSelectedPages:
				myButton.enabled = documents[activeDocument][kDocumentsProcessable];
				break;
			case kScopeSelectedImages:
				myButton.enabled = (
					(documents[activeDocument][kDocumentsProcessable]) &&
					(dictionaryLength(documentSelection) > 0));
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
			preferences[kPrefsIncludePasteboard] = myIncludePasteboard.value;
			interfaceItemsChanged();
		}
		myIncludePasteboard.value = preferences[kPrefsIncludePasteboard];
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
			switch (preferences[kPrefsScope]) {
				case kScopeAllDocs:
					var mySelectedCount = 0;
					for (var itm = 0; itm < myItemsList.items.length; itm++) {
						if (myItemsList.items[itm].selected) {
							if (!documents[myItemsList.items[itm][kListItemObject]][kDocumentsProcessable]) {
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
			
			interfaceItemsChanged();
		}
	}
	
	// Группа резервного копирования
	with (myParametersGroup.add("panel", undefined, localize(msgBackup))) {
		orientation = "column";
		minimumSize.width = kDialogPanelWidth;
		alignChildren = ["fill", "top"];
		margins = kDialogSubPanelMargins;
		
		var myDoBackup = add("checkbox", undefined, localize(msgDoBackup));
		myDoBackup.onClick = function() {
			preferences[kPrefsBackup] = myDoBackup.value;
			interfaceItemsChanged();
		}
		myDoBackup.value = preferences[kPrefsBackup];
		
		var myBackupGroup = add("group");
		myBackupGroup.orientation = "column";
		myBackupGroup.alignChildren = ["fill", "top"];
		myBackupGroup.margins = kDialogSubControlMargins;

		
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["fill", "top"];
			
			var myBackupPath = add("edittext", undefined, Folder.decode(preferences[kPrefsBackupFolder]));
			myBackupPath.preferredSize.width = kDialogSubControlWidth;
			myBackupPath.onChange = function() {
				preferences[kPrefsBackupFolder] = Folder.encode(myBackupPath.text);
			}
			
			var myBackupChooseButton = add("button", undefined, localize(msgChoose));
			myBackupChooseButton.onClick = function() {
				var mySelectedFolder = Folder.selectDialog();
				if (mySelectedFolder != null) {
					preferences[kPrefsBackupFolder] = Folder.encode(mySelectedFolder.fullName) + "/";
					myBackupPath.text = mySelectedFolder.fullName + "/";
				}
			}
		}
		
		with (myBackupGroup.add("group")) {
			orientation = "row";
			alignChildren = ["fill", "top"];
				
			var myDeleteOldBackups = add("checkbox", undefined, localize(msgDeleteOldBackups));
			myDeleteOldBackups.onClick = function() {
				preferences[kPrefsDeleteOldBackups] = myDeleteOldBackups.value;
				interfaceItemsChanged();
			}
			myDeleteOldBackups.value = preferences[kPrefsDeleteOldBackups];
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
		with (myImagesList) {
			alignment = ["fill", "top"];
			preferredSize.height = 556;
			maximumSize.height = 556;
		}
		
		// отработка выделения картинок в обработку
		myImagesList.onChange = function () {
			myImagePositionsList.removeAll();
			if ((myImagesList.selection != null) && (myImagesList.selection.length == 1)) {
				// выделена одна картинка, заполним список вхождений
				var myEntriesList = selectedGraphics[myImagesList.selection[0][kListItemObject]][kGraphicsObjectList];
				for (var itm in myEntriesList) {
					var newListItem = myImagePositionsList.add("item", documents[myEntriesList[itm][kGraphicsParentDocument]][kDocumentsName]);
					newListItem[kListItemObject] = myEntriesList[itm][kGraphicsObject];
					// CS3 не умеет делать многоколоночный список
					if (appVersion > 5) {
						newListItem.subItems[0].text = myEntriesList[itm][kGraphicsParentPage];
						if (selectedGraphics[myImagesList.selection[0][kListItemObject]][kGraphicsPhotoshopEPS]) {
							newListItem.subItems[1].text = fillSpaces("?", 5);
						} else {
							newListItem.subItems[1].text = fillSpaces(Math.round(myEntriesList[itm][kGraphicsLowestDPI]), 5);
						}
					}
				}
			}
			
			myOKButton.enabled = ((myImagesList.selection != null) && (myImagesList.selection.length > 0));
		}
		
		// проверим, не снять ли с кого выделение
		myImagesList.onClick = function () {
			for (var itm = 0; itm < myImagesList.items.length; itm++) {
				if (myImagesList.items[itm].selected) {
					var listItemObject = selectedGraphics[myImagesList.items[itm][kListItemObject]];
					if (listItemObject[kGraphicsFileReadonly] || listItemObject[kGraphicsFolderReadonly])
						myImagesList.items[itm].selected = false;
				}
			}
		}
		
		var myImagePositionsList = myImagesGroup.add("listbox", undefined, undefined, {multiselect:false, numberOfColumns:4, showHeaders:true, columnTitles:["Document", "Page", "DPI"], columnWidths:[160, 40, 45]});
		with (myImagePositionsList) {
			preferredSize.height = 164;
		}
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
	
	// Обобщим данные по картинкам
	function summarizeImagesData() {
		for (var grc in selectedGraphics) {
			
			// получим самое низкое разрешение и самый высокий процент для каждой картинки списка
			var myFirstItem = true;
			
			for (var itm in selectedGraphics[grc][kGraphicsObjectList]) {
				var myLowestDPI = selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI];
				var myMaxPercentage = selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsMaxPercentage];
				
				if ((myLowestDPI < selectedGraphics[grc][kGraphicsLowestDPI]) || myFirstItem) { selectedGraphics[grc][kGraphicsLowestDPI] = myLowestDPI }
				if ((myMaxPercentage > selectedGraphics[grc][kGraphicsMaxPercentage]) || myFirstItem) { selectedGraphics[grc][kGraphicsMaxPercentage] = myMaxPercentage }
				myFirstItem = false;
			}
			
			// выясним, необходим ли пересчёт разрешения при выбранных настройках
			if (selectedGraphics[grc][kGraphicsBitmap]) {
				// ч/б картинка
				selectedGraphics[grc][kGraphicsResample] = (
					(preferences[kPrefsProcessBitmaps]) && (
						(
							// низкое dpi ч/б
							(preferences[kPrefsBitmapUpsample]) &&
							(isGraphicBitmapDPILow(selectedGraphics[grc][kGraphicsLowestDPI]))
						) || (
							// высокое dpi ч/б
							(preferences[kPrefsBitmapDownsample]) &&
							(isGraphicBitmapDPIHigh(selectedGraphics[grc][kGraphicsLowestDPI]))
						)
					)
				);
			} else {
				// цветная картинка
				selectedGraphics[grc][kGraphicsResample] = (
					(
						// низкое dpi цвета
						(preferences[kPrefsColorUpsample]) &&
						(isGraphicColorDPILow(selectedGraphics[grc][kGraphicsLowestDPI]))
					) || (
						// высокое dpi цвета
						(preferences[kPrefsColorDownsample]) &&
						(isGraphicColorDPIHigh(selectedGraphics[grc][kGraphicsLowestDPI]))
					)
				);
			}
		}
	}
	
	// Отфильтруем картинки для обработки
	function filterGraphics() {
		
		// проверка на попадание в указаный диапазон (все документы/только активный/выбранные страницы активного документа/выбранные картинки)
		function myIsInScope(grc, itm) {
			switch (preferences[kPrefsScope]) {
				case kScopeAllDocs:
					for (var doc = 0; doc < myItemsList.items.length; doc++) {
						if (myItemsList.items[doc].selected) {
							if (myItemsList.items[doc][kListItemObject] == selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument]) {
								return true;
							}
						}
					}
					return false;
				case kScopeActiveDoc:
					return (selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] == activeDocument);
				case kScopeSelectedPages:
					if (selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] != activeDocument) {
						return false;
					}
					for (var pge = 0; pge < myItemsList.items.length; pge++) {
						if (myItemsList.items[pge].selected) {
							if (myItemsList.items[pge][kListItemObject].name == selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentPage]) {
								return true;
							}
						}
					}
					return false;
				case kScopeSelectedImages:
					if (selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] != activeDocument) {
						return false;
					}
					return (itm in documentSelection);
				default:
					return false;
			}
		}
		
		// проверка на "подходящесть" картинки под выбранные настройки
		function myIsSuitable(grc, itm) {
			if (!selectedGraphics[grc][kGraphicsOnMaster]) {
				// картинка не на мастере
				if (((preferences[kPrefsIncludePasteboard]) || (selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsWithinBleeds])) ||
					(preferences[kPrefsScope] == kScopeSelectedImages)) {
					// картинка внутри вылетов, вне вылетов с опцией "обрабатывать на полях" или scope установлен в "выбранные картинки"
					if (isGraphicChangeFormat(selectedGraphics[grc])) { return true; }
					if (selectedGraphics[grc][kGraphicsPhotoshopEPS]) {
						// фотошоповский EPS
					} else if (selectedGraphics[grc][kGraphicsBitmap]) {
						// ч/б картинка
						if (!preferences[kPrefsProcessBitmaps]) { return false; }
						if ((preferences[kPrefsBitmapUpsample]) && (isGraphicBitmapDPILow(selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
							// низкое dpi ч/б
							selectedGraphics[grc][kGraphicsResample] = true;
							return true;
						}
						if ((preferences[kPrefsBitmapDownsample]) && (isGraphicBitmapDPIHigh(selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
							// высокое dpi ч/б
							selectedGraphics[grc][kGraphicsResample] = true;
							return true;
						}
					} else {
						// цветная картинка
						if ((preferences[kPrefsColorUpsample]) && (isGraphicColorDPILow(selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
							// низкое dpi цвета
							selectedGraphics[grc][kGraphicsResample] = true;
							return true;
						}
						if ((preferences[kPrefsColorDownsample]) && (isGraphicColorDPIHigh(selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsLowestDPI]))) {
							// высокое dpi цвета
							selectedGraphics[grc][kGraphicsResample] = true;
							return true;
						}
					}
				}
			}
			
			return false;
		}
		
		// поехали
		myOKButton.enabled = false;
		myImagesList.selection = null;
		myImagesList.removeAll();
		selectedGraphics = cloneDictionary(graphics);
		
		// пройдёмся по всем вхождениям
		for (var grc in selectedGraphics) {
			for (var itm in selectedGraphics[grc][kGraphicsObjectList]) {
				if (!myIsInScope(grc, itm) || !myIsSuitable(grc, itm)) {
					// выкинем из списка неподходящие картинки
					delete selectedGraphics[grc][kGraphicsObjectList][itm];
				}
			}
			// выкинем пустые вхождения
			if (dictionaryLength(selectedGraphics[grc][kGraphicsObjectList]) == 0) {
				delete selectedGraphics[grc];
			}
		}
		
		// обобщим собранные данные по картинкам
		summarizeImagesData();
		
		// наполним список картинок
		for (var grc in selectedGraphics) {
			var newListItem = myImagesList.add("item", selectedGraphics[grc].graphicsName);
			newListItem[kListItemObject] = grc;
			newListItem.image = (selectedGraphics[grc][kGraphicsFileReadonly] || selectedGraphics[grc][kGraphicsFolderReadonly] ? myCircleRedImage : myCircleGreenImage);
			// CS3 не умеет делать многоколоночный список
			if (appVersion > 5) {
				newListItem.subItems[0].text = fillSpaces(dictionaryLength(selectedGraphics[grc][kGraphicsObjectList]), 2);
				if (selectedGraphics[grc][kGraphicsPhotoshopEPS]) {
					newListItem.subItems[1].text = fillSpaces("-", 5);
				} else {
					newListItem.subItems[1].text = fillSpaces(Math.round(selectedGraphics[grc][kGraphicsLowestDPI]), 5);
				}
			}
			newListItem.selected = (!selectedGraphics[grc][kGraphicsFileReadonly] && !selectedGraphics[grc][kGraphicsFolderReadonly]);
		}
		//myImagesList.selection = myImagesList.items;
	}

	// Группа элементов контроля (круто, да?)
	var myControlGroup = preferencesDialog.add("group");
	with (myControlGroup) {
		orientation = "row";
		alignment = ["fill", "top"];
		
		// выбор локали
		var myLocaleDropdown = add("dropdownlist");
		for (var itm = 0; itm < kLocalesList.length; itm++) {
			var newListItem = myLocaleDropdown.add("item", kLocalesList[itm][1]);
			newListItem[kListItemObject] = kLocalesList[itm][0];
			if (newListItem[kListItemObject] == preferences[kPrefsLocale]) {
				myLocaleDropdown.selection = newListItem;
			}
		}
		myLocaleDropdown.onChange = function () {
			preferences[kPrefsLocale] = myLocaleDropdown.selection[kListItemObject];
			$.locale = preferences[kPrefsLocale];
			preferencesDialog.close(3);
		}
		
		// группа кнопок диалогового окна
		var myButtonsGroup = myControlGroup.add("group");
		with (myButtonsGroup) {
			orientation = "row";
			alignment = ["right", "top"];
			
			var myCancelButton = add("button", undefined, localize(msgCancel), {name: "cancel"});
			var myOKButton = add("button", undefined, localize(msgOK), {name: "ok"});
			myOKButton.onClick = function () {
				if (myOKButton.enabled) preferencesDialog.close(1);
			}
		}
	}
	
	// Сохранение настроек
	function savePreferences() {
		var preferencesArray = [];
		for (var prf in preferences)
			preferencesArray.push(prf + "\t" + typeof preferences[prf] + "\t" + preferences[prf]);
		
		var preferencesFile = new File(preferencesFileName);
		if (preferencesFile.open("w")) {
			preferencesFile.write(preferencesArray.join("\n"));
			preferencesFile.close();
		} else {
			alert(localize(msgErrorSavingPreferences));
		}
	}
	
	// Включение/выключение элементов интерфейса
	function interfaceItemsChanged() {
		myFlagChangeFormat = (preferences[kPrefsChangeFormatOf] != kPrefsChangeFormatOfNone);
		myFlagResample = (myColorUpsample.value || myColorDownsample.value || (myProcessBitmaps.value && (myBitmapUpsample.value || myBitmapDownsample.value)));
		
		myChangeFormatParametersGroup.enabled = myFlagChangeFormat;
		myPSDOptionsGroup.enabled = (preferences[kPrefsChangeFormatTo] > 0);
		myBitmapGraphicsGroup.enabled = myProcessBitmaps.value;
		myResampleMethodGroup.enabled = myFlagResample;
		myIncludePasteboard.enabled = ((preferences[kPrefsScope] == kScopeAllDocs) || (preferences[kPrefsScope] == kScopeActiveDoc));
		myBackupGroup.enabled = preferences[kPrefsBackup];
		
		savePreferences();
		filterGraphics();
	}
	
	// Отработать включение/выключение групп
	myScopeButtonClicked();

	// Показать диалог
	var preferencesDialogResult = preferencesDialog.show();
	
	// Удалить временные файлы
	myCircleGreenFile.remove();
	myCircleRedFile.remove();
	
	// Сохранить настройки
	savePreferences();
	
	// Отработать варианты завершения диалога
	switch (preferencesDialogResult) {
		case 1:
			// OK
			break;
		case 2:
			// Cancel
			return false;
		case 3:
			// Смена языка или рескан EPSов
			flagRestart = true;
			return false;
	}
	
	// Убрать из списка на обработку невыбранные пользователем картинки
	for (var grc in selectedGraphics) {
		var isSelected = false;
		for (sel = 0; sel < myImagesList.selection.length; sel++) {
			if (myImagesList.selection[sel][kListItemObject] == grc) {
				isSelected = true;
				break;
			}
		}
		if (!isSelected) {
			delete selectedGraphics[grc];
		}
	}
	
	// Уточнить при области действия в "только выбранные", нужно ли обрабатывать другие вхождения
	if (preferences[kPrefsScope] = kScopeSelectedImages) {
		// пройдёмся по всем выбранным в списке
		var flagMultipleEntries = false;
		for (var grc in selectedGraphics) {
			if (dictionaryLength(selectedGraphics[grc][kGraphicsObjectList]) != dictionaryLength(graphics[grc][kGraphicsObjectList])) {
				flagMultipleEntries = true;
				break;
			}
		}
		
		// выбранные в документе присутствуют неоднократно?
		if (flagMultipleEntries) {
			
			// спросим, что делать
			var decisionResult = askForDecision(msgWarning, msgMultipleEntriesDescription, kMultipleEntriesOptions, kMultipleEntriesSingle);
			
			// отмена?
			if (decisionResult == -1) return false;
			
			// решено обрабатывать с учётом всех вхождений?
			if (decisionResult == kMultipleEntriesMultiple) {
				// заменим все неполные вхождения на полные
				for (var grc in selectedGraphics) {
					if (dictionaryLength(selectedGraphics[grc][kGraphicsObjectList]) != dictionaryLength(graphics[grc][kGraphicsObjectList])) {
						for (var itm in selectedGraphics[grc][kGraphicsObjectList]) {
							delete selectedGraphics[grc][kGraphicsObjectList][itm];
						}
						delete selectedGraphics[grc];
						selectedGraphics[grc] = cloneDictionary(graphics[grc]);
					}
				}
				summarizeImagesData();
			}
		}
	}
	
	// Убрать из списка не пошедшие в обработку документы
	switch (preferences[kPrefsScope]) {
		case kScopeAllDocs:
			for (var doc in documents) {
				var isSelected = false;
				for (var grc in selectedGraphics) {
					for (var itm in selectedGraphics[grc][kGraphicsObjectList]) {
						if (selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument] == doc) {
							isSelected = true;
							break;
						}
					}
					if (isSelected) {
						break;
					}
				}
				if (!isSelected) {
					delete documents[doc];
				}
			}
			break;
		case kScopeActiveDoc:
		case kScopeSelectedPages:
		case kScopeSelectedImages:
			for (var doc in documents) {
				if (doc != activeDocument)
					delete documents[doc];
			}
			break;
		default:
			return false;
	}
	
	return true;
}

// Удалим старые резервыне копии
// ------------------------------------------------------
function deleteOldBackups() {
	if (!preferences[kPrefsDeleteOldBackups] || flagOldBackupsDeleted) return true;
	
	showStatus(localize(msgDeleteOldBackupsStatus), "", undefined, undefined);
	
	var currentDate = new Date();
	
	// функция проверки на старость
	function checkOldness(itm) {
		if (itm.reflect.name != "Folder") { return false }
		
		var timeStamp = itm.name.split("-").slice(-4);
		try {
			var backupDate = new Date(
				parseInt(timeStamp[0]),
				parseInt(timeStamp[1]-1),
				parseInt(timeStamp[2]),
				parseInt(timeStamp[3].slice(0, 2)),
				parseInt(timeStamp[3].slice(2, 4)),
				parseInt(timeStamp[3].slice(4, 6)));
		} catch(e) {
			return false;
		}
		
		// количество миллисекунд в дне - 86400000
		return ((currentDate - backupDate) / 86400000 > 31);
	}
	
	// получим список старых бэкапов
	var backupsFolder = new Folder(Folder.decode(preferences[kPrefsBackupFolder]));
	var oldBackups = backupsFolder.getFiles(checkOldness)
	
	showStatus(undefined, "", 0, oldBackups.length);
	
	// тупо убьём всех
	for (itm in oldBackups) {
		if (flagStopExecution) { break }
		
		showStatus(undefined, Folder.decode(oldBackups[itm].name), undefined, undefined);
		
		var containedFiles = oldBackups[itm].getFiles();
		
		// начнём с содержимого папки
		for (fil in containedFiles) {
			if (flagStopExecution) { break }
			
			if (!containedFiles[fil].remove()) {
				alert(localize(msgErrorDeletingBackupFolder, containedFiles[fil].fullName));
				flagStopExecution = true;
			}
		}
		
		// и закончим папкой этого бэкапа
		if (!oldBackups[itm].remove()) {
			alert(localize(msgErrorDeletingBackupFolder, containedFiles[fil].fullName));
			flagStopExecution = true;
		}
		
		showStatus(undefined, undefined, itm, undefined);
	}
	
	showStatus(undefined, undefined, statusWindowGauge.maxvalue, statusWindowGauge.maxvalue);
	hideStatus();
	
	flagOldBackupsDeleted = true;
	return !flagStopExecution;
}

// Сохраним оригиналы картинок и документов. Бэкап, короче.
// ------------------------------------------------------
function backupImages() {
	// Надо?
	if (!preferences[kPrefsBackup])
		return true;
	
	// Функция бэкапа документа со всеми картинками
	function backupDocument(myItemObject) {
		var myDocument = myItemObject[kDocumentsObject];
		
		showStatus(undefined, myDocument.name, undefined, undefined);
		
		// Сделаем папку для бэкапа
		var currentDate = new Date();
		var backupFolderName = cleanupPath(
			File.decode(myDocument.fullName.name) + "-" + 
			currentDate.getFullYear() + "-" + 
			fillZeros(currentDate.getMonth()+1, 2) + "-" + 
			fillZeros(currentDate.getDate(), 2) + "-" + 
			fillZeros(currentDate.getHours(), 2) + 
			fillZeros(currentDate.getMinutes(), 2) + 
			fillZeros(currentDate.getSeconds(), 2));
		var backupFolder = new Folder(Folder.decode(preferences[kPrefsBackupFolder]) + backupFolderName);
		
		if (!backupFolder.create()) {
			alert(localize(msgErrorCreatingBackupFolder));
			flagStopExecution = true;
			return;
		}
		
		// Создадим лог-файл
		var logFile = new File(backupFolder.fullName + "/" + kLogFileName);
		if (!logFile.open("w")) {
			flagStopExecution = true;
			return;
		}
		
		// Вместе с картинками (чего уж там) сохраним и .indd документ
		var backupDocumentName = uniqueFileName(backupFolder.fullName, cleanupPath(File.decode(myDocument.fullName.name)));
		if (!myDocument.fullName.copy(backupDocumentName)) {
			alert(localize(msgErrorCopyingFile, File.decode(myDocument.name)));
			logFile.write(kLogFileERR + "\n");
			logFile.close();
			flagStopExecution = true;
			return;
		}
		logFile.write([File.encode(backupDocumentName.name), File.encode(new File(myDocument.fullName).fullName)].join("\t") + "\n");
		
		// Скопируем оригиналы картинок
		var myBackupList = myItemObject[kDocumentsBackupList];
		for (var grc in myBackupList) {
			showStatus(undefined, myBackupList[grc].name, statusWindowGauge.value + 1, undefined);
			showStatus(undefined,undefined, undefined, undefined);
			
			var myFile = new File(myBackupList[grc].filePath);
			var backupFileName = uniqueFileName(backupFolder.fullName, cleanupPath(File.decode(myFile.name)));
			if (!myFile.copy(backupFileName)) {
				alert(localize(msgErrorCopyingFile, myBackupList[grc].filePath));
				flagStopExecution = true;
			}
			myFile.close();
			if (flagStopExecution) {
				logFile.write(kLogFileEND + "\t" + kLogFileERR + "\n");
				logFile.close();
				return;
			}
			logFile.write([File.encode(backupFileName.name), File.encode(myFile.fullName)].join("\t") + "\n");
		}
		
		// Закроем лог-файл
		logFile.write(kLogFileEND + "\t" + kLogFileEND + "\n");
		logFile.close();
		
		statusWindowGauge.value++;
	}
	
	// Пройдёмся по всем картинкам
	var backupFilesCount = 0;
	for (var grc in selectedGraphics) {
		// добавим все вхождения картинки в подокументный список для бэкапа
		for (var itm in selectedGraphics[grc][kGraphicsObjectList]) {
			// получим ID документа этого вхождения
			var doc = selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsParentDocument];
			
			// картинки ещё нет в списке бэкапа?
			var myItemLink = selectedGraphics[grc][kGraphicsObjectList][itm][kGraphicsObject].itemLink;
			var myBackupList = documents[doc][kDocumentsBackupList];
			if (!(myItemLink.filePath in myBackupList)) {
				// добавим
				myBackupList[myItemLink.filePath] = myItemLink;
				backupFilesCount++;
			}
		}
	}
	backupFilesCount += dictionaryLength(documents);
	
	showStatus(localize(msgBackupStatus), "", 0, backupFilesCount);
	
	// Пройдёмся по всем выбранным документам
	for (var doc in documents) {
		backupDocument(documents[doc]);
		if (flagStopExecution) { break }
	}
	
	showStatus(undefined, undefined, statusWindowGauge.maxvalue, statusWindowGauge.maxvalue);
	hideStatus();
	
	return !flagStopExecution;
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
			if (myActualDPI == 0) {
				// это EPS, не обращаем внимания
			} else if (myActualDPI != myDocument.resolution) {
				// поправим
				myMaxPercentage *= myDocument.resolution / myActualDPI;
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
	showStatus(localize(msgProcessingImagesStatus), "", 0, dictionaryLength(selectedGraphics));
	
	for (var grc in selectedGraphics) {
		showStatus(undefined, selectedGraphics[grc][kGraphicsName], undefined, undefined);
		
		// Параметры скрипта для Фотошопа
		var myDoChangeFormat = isGraphicChangeFormat(selectedGraphics[grc]);
		
		var myChangeFormatCode;
		if (myDoChangeFormat) {
			if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToTIFF)) myChangeFormatCode = 1;
			if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToTIFFAndPSD)) myChangeFormatCode = (selectedGraphics[grc][kGraphicsHasClippingPath] ? 2 : 1);
			if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToPSD)) myChangeFormatCode = 2;
		} else {
			myChangeFormatCode = 0;
		}
		
		var myTargetDPI = (selectedGraphics[grc][kGraphicsBitmap] ? preferences[kPrefsBitmapTargetDPI] : preferences[kPrefsColorTargetDPI]);
		
		var myNewFilePath = "";
		if (myDoChangeFormat) {
			var myFile = new File(grc);
			var myPath = myFile.path;
			myNewFilePath = uniqueFileName(myPath, cleanupPath(myFile.name.replace(/(.+\.).*$/, "$1") + (myChangeFormatCode == 1 ? "tif" : "psd")));
			selectedGraphics[grc][kGraphicsNewFilePath] = myNewFilePath;
			selectedGraphics[grc][kGraphicsDoRelink] = true;
		} else {
			selectedGraphics[grc][kGraphicsDoRelink] = false;
		}
		
		// Запускаем скрипт в фотошопе
		try {
			// Вычислить старший фотошоп
			var myPhotoshop = "photoshop";
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
			
			// Вообще не установлена ни одна версия, совместимая с этой версией бриджа?
			if (BridgeTalk.getStatus(myPhotoshop) == "ISNOTINSTALLED") {
				alert(localize(msgPhotoshopNotInstalled));
				return false;
			}
			
			// Хоть один фотошоп запущен?
			if (myRunningPhotoshopVersion > 0.0) {
				myPhotoshop = myRunningPhotoshop;
			}
			
			// Запустить фотошоп, ежели чего
			if (!BridgeTalk.isRunning(myPhotoshop)) {
				BridgeTalk.launch(myPhotoshop);
			}
			while (BridgeTalk.getStatus(myPhotoshop) != "IDLE") {
				BridgeTalk.pump();
			}
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
					flagStopExecution = true;
					return false;
				}
			}
			
			var myBT = new BridgeTalk;
			myBT.target = myPhotoshop;
			myBT.body = bridgeFunction.toString() + "\r\rbridgeFunction(\"";
			myBT.body += File.encode(grc) + "\", \"";
			myBT.body += File.encode(myNewFilePath) + "\", ";
			myBT.body += selectedGraphics[grc][kGraphicsResample] + ", ";
			myBT.body += preferences[kPrefsResampleMethod] + ", ";
			myBT.body += selectedGraphics[grc][kGraphicsActualDPI] + ", ";
			myBT.body += myTargetDPI + ", ";
			myBT.body += selectedGraphics[grc][kGraphicsMaxPercentage] + ", ";
			myBT.body += myChangeFormatCode + ", ";
			myBT.body += preferences[kPrefsMakeLayerFromBackground] + ", ";
			myBT.body += preferences[kPrefsLeaveGraphicsOpen];
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
				if (flagStopExecution) { return }
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
			
			while ((myReturnValue == undefined) && !flagStopExecution) {
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
		
		if (flagStopExecution) { break }
		
		if (!myReturnValue) {
			alert(localize(msgErrorProcessingImage, grc, myReturnMessage));
			return false;
		}
		
		showStatus(undefined, undefined, statusWindowGauge.value + 1, undefined);
	}
	
	showStatus(undefined, undefined, statusWindowGauge.maxvalue, statusWindowGauge.maxvalue);
	hideStatus();
	
	return !flagStopExecution;
}

// Перецепить картинки
// ------------------------------------------------------
function relinkImages() {
	// посчитать линки
	var myTotalLinks = 0;
	for (var grc in selectedGraphics) {
		myTotalLinks += dictionaryLength(selectedGraphics[grc][kGraphicsObjectList]);
	}
	
	showStatus(localize(msgRelinkingImagesStatus), "", 0, myTotalLinks);
	
	// Пройдёмся по всем картинкам
	for (var grc in selectedGraphics) {
		
		// Пройдёмся по всем вхождениям
		var graphicsList = selectedGraphics[grc][kGraphicsObjectList];
		for (var itm in graphicsList) {
			showStatus(undefined, selectedGraphics[grc][kGraphicsName], undefined, undefined);
			
			//var myDocument = documents[graphicsList[itm][kGraphicsParentDocument]][kDocumentsObject];
			var myDocument = documents[graphicsList[itm][kGraphicsParentDocument]][kDocumentsObject];
			
			// Сохраним reference pointы во всех окошках документа
			var myReferencePoints = [];
			for (var wnd = 0; wnd < myDocument.layoutWindows.length; wnd++) {
				myReferencePoints[wnd] = myDocument.layoutWindows[wnd].transformReferencePoint;
				myDocument.layoutWindows[wnd].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
			}
			
			// Убить clipping?
			if ((preferences[kPrefsChangeFormatOf] != kPrefsChangeFormatOfNone) &&
				(preferences[kPrefsChangeFormatTo] != kChangeFormatToTIFF) &&
				(preferences[kPrefsRemoveClipping]) && 
				(graphicsList[itm][kGraphicsObject].clippingPath.clippingType != ClippingPathType.NONE)) {
				graphicsList[itm][kGraphicsObject].clippingPath.clippingType = ClippingPathType.NONE;
			}
			
			// Найдём линк в общедокументном списке линков
			var myLink;
			for (var dcl = 0; dcl < myDocument.links.length; dcl++) {
				if (graphicsList[itm][kGraphicsObject].itemLink.id == myDocument.links[dcl].id) {
					myLink = myDocument.links[dcl];
				}
			}
			
			// Это релинк?
			if (selectedGraphics[grc][kGraphicsDoRelink]) {
				myLink.relink(selectedGraphics[grc][kGraphicsNewFilePath]);
			}
			
			// Обновляем
			myLink.status;
			graphicsList[itm][kGraphicsObject] = myLink.update().parent;
			
			// Скорректируем размер
			if (selectedGraphics[grc][kGraphicsResample]) {
				if (graphicFormat(graphicsList[itm][kGraphicsObject]) == "CompuServe GIF") {
					// это gif, в нём разрешение всегда 72 dpi
					graphicsList[itm][kGraphicsObject].absoluteHorizontalScale = (graphicsList[itm][kGraphicsObjectHScale] * (selectedGraphics[grc][kGraphicsLowestDPI] / preferences[kPrefsColorTargetDPI])) * 100;
					graphicsList[itm][kGraphicsObject].absoluteVerticalScale = (graphicsList[itm][kGraphicsObjectVScale] * (selectedGraphics[grc][kGraphicsLowestDPI] / preferences[kPrefsColorTargetDPI])) * 100;
				} else {
					// всё нормально, это не gif
					try {
						graphicsList[itm][kGraphicsObject].absoluteHorizontalScale = (graphicsList[itm][kGraphicsObjectHScale] / selectedGraphics[grc][kGraphicsMaxPercentage]) * 100;
						graphicsList[itm][kGraphicsObject].absoluteVerticalScale = (graphicsList[itm][kGraphicsObjectVScale] / selectedGraphics[grc][kGraphicsMaxPercentage]) * 100;
					} catch (e) {
						$.writeln(e);
						// redefineScaling
						$.writeln("percent - " + ((graphicsList[itm][kGraphicsObjectHScale] / selectedGraphics[grc][kGraphicsMaxPercentage]) * 100));
						debugPrintObject(graphicsList[itm][kGraphicsObject]);
						app.select(graphicsList[itm][kGraphicsObject]);
						app.activeWindow.zoom(ZoomOptions.FIT_PAGE);
						app.activeWindow.zoomPercentage = 400;
					}
				}
			}
			
			// Восстановим reference pointы
			for (var wnd = 0; wnd < myDocument.layoutWindows.length; wnd++) {
				myDocument.layoutWindows[wnd].transformReferencePoint = myReferencePoints[wnd];
			}
			
			if (flagStopExecution) { break }
			
			showStatus(undefined, undefined, statusWindowGauge.value + 1, undefined);
		}
		
		// Удалить исходник?
		if ((preferences[kPrefsDeleteOriginals]) && (selectedGraphics[grc][kGraphicsDoRelink])) {
			var myOriginalFile = new File(grc);
			myOriginalFile.remove();
		}
	}
	
	showStatus(undefined, undefined, statusWindowGauge.maxvalue, statusWindowGauge.maxvalue);
	hideStatus();
	
	return !flagStopExecution;
}

// Сохранить документы
// ------------------------------------------------------
function saveDocuments() {
	showStatus(localize(msgSavingDocumentsStatus), "", 0, dictionaryLength(documents));
	
	for (var doc in documents) {
		showStatus(undefined, documents[doc][kDocumentsObject].name, undefined, undefined);
		
		documents[doc][kDocumentsObject].save();
		
		showStatus(undefined, undefined, statusWindowGauge.value + 1, undefined);
	}
	
	showStatus(undefined, undefined, statusWindowGauge.maxvalue, statusWindowGauge.maxvalue);
	hideStatus();
	
	return !flagStopExecution;
}

// Показать диалог с вариантами выбора
// ------------------------------------------------------
function askForDecision(headerText, descriptionText, optionsArray, defaultButton) {
	var decisionDialog = new Window("dialog", localize(headerText));
	
	var radioButtons = new dictionary();
	
	with (decisionDialog) {
		orientation = "column";
		alignChildren = ["fill", "top"];
		preferredSize = kServiceDialogSize;
		
		with (add("group")) {
			orientation = "column";
			alignChildren = ["fill", "top"];
			margins = kDialogSubPanelMargins;
			
			with (add("statictext", undefined, localize(descriptionText), {multiline: true})) {
				alignment = "fill";
			}
		}
		
		with (add("group")) {
			alignChildren = ["fill", "fill"];
			margins = kDialogSubPanelMargins;
			
			with (add("panel")) {
				orientation = "column";
				alignChildren = ["left", "top"];
				margins = kDialogSubPanelMargins;
				
				for (var itm in optionsArray) {
					radioButtons[itm] = add("radiobutton", undefined, localize(optionsArray[itm][1]));
					radioButtons[itm][kListItemObject] = optionsArray[itm][0];
					if (radioButtons[itm][kListItemObject] == defaultButton) radioButtons[itm].value = true;
				}
			}
		}
		
		with (add("group")) {
			orientation = "row";
			alignChildren = ["right", "top"];
			margins = kDialogSubPanelMargins;
			
			add("button", undefined, localize(msgCancel), {name: "cancel"});
			add("button", undefined, localize(msgOK), {name: "ok"});					
		}
	}
	
	// отмена?
	if (decisionDialog.show() == 2) {
		return -1;
	} else {
		for (var itm in radioButtons) {
			if (radioButtons[itm].value) return radioButtons[itm][kListItemObject];
		}
		return -1;
	}
}

// Получить уникальный ID документа
// ------------------------------------------------------
function documentID(myDocument) {
	if (appVersion > 6) {
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

// Картинка на мастере?
// ------------------------------------------------------
function isGraphicOnMaster(myGraphic) {
	// Получим документ этой картинки
	var myDocument = documentOfGraphic(myGraphic);
	
	// Попробуем найти мастер, на котором лежит эта картинка
	var mySpread;
	var myOnMaster = false;
	for (var spr = 0; spr < myDocument.masterSpreads.length; spr++) {
		for (var grc = 0; grc < myDocument.masterSpreads[spr].allGraphics.length; grc++) {
			if (myGraphic.id == myDocument.masterSpreads[spr].allGraphics[grc].id) {
				myOnMaster = true;
				break;
			}
		}
	}
	
	return myOnMaster;
}

// Лежит ли картинка на pasteboard
// ------------------------------------------------------
function isGraphicWithinBleeds(myGraphic) {
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
	
	// Разворот не найден?
	if (mySpread == undefined) {
		// Картинка на мастере
		for (var spr = 0; spr < myDocument.masterSpreads.length; spr++) {
			for (var grc = 0; grc < myDocument.masterSpreads[spr].allGraphics.length; grc++) {
				if (myGraphic.id == myDocument.masterSpreads[spr].allGraphics[grc].id) {
					mySpread = myDocument.masterSpreads[spr];
					break;
				}
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

// Проверка EPSа на фотошопность
// ------------------------------------------------------
function isGraphicPhotoshopEPS(myGraphic) {
	var myIsPhotoshopEPS = false;
	
	try {
		if (myGraphic.imageTypeName == "EPS") {
			var myLinkedFile = new File(myGraphic.itemLink.filePath);
			myLinkedFile.open("r");
			
			var str;
			var itm = 0;
			
			do {
				str = myLinkedFile.readln();
				myIsPhotoshopEPS = (str.search("%%Creator: Adobe Photoshop") != -1);
				itm++;
			} while ((!myIsPhotoshopEPS) && (itm < 10));
			
			myLinkedFile.close();
		}
	} catch (e) {}
	
	return myIsPhotoshopEPS;
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

// Получить название формата файла
// ------------------------------------------------------
function graphicFormat(myGraphic) {
	try {
		if (appVersion >= 6) {
			return myGraphic.imageTypeName;
		} else {
			return myGraphic.itemLink.linkType;
		}
	} catch (e) {
		return false;
	}
}

// Проверка картинки на формат, подпадающий под обработку
// ------------------------------------------------------
function isGraphicChangeFormat(myGraphic) {
	
	function isGraphicFormatWrong() {
		return (
			(myGraphic[kGraphicsFormat] in {"JPEG":0, "PNG":0, "Portable Network Graphics (PNG)":0, "Windows Bitmap":0,"CompuServe GIF":0}) ||
			((myGraphic[kGraphicsFormat] == "EPS") && preferences[kPrefsProcessPhotoshopEPS])
		);
	}
	
	if (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfNone) {
		// ничего не пересохраняем
		return false;
	} else if (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfWrong) {
		// пересохраняем только неполиграфию
		return isGraphicFormatWrong();
	} else if (preferences[kPrefsChangeFormatOf] == kPrefsChangeFormatOfAll) {
		// пересохраняем всё
		if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToTIFF)) {
			// всё в тифы
			if (myGraphic[kGraphicsFormat] == "TIFF") {
				// это тиф, пересохранять не надо
				return false;
			} else if (myGraphic[kGraphicsFormat] == "Photoshop") {
				// это psd, пересохраняем
				return true;
			} else {
				// пересохраняем, если неполиграфия
				return isGraphicFormatWrong();
			}
		} else if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToTIFFAndPSD)) {
			// в тифы, с обтравками - в psd
			if (myGraphic[kGraphicsFormat] == "TIFF") {
				// это тиф, пересохраняем если на нём есть клиппинг
				return myGraphic[kGraphicsHasClippingPath];
			} else if (myGraphic[kGraphicsFormat] == "Photoshop") {
				// это psd, пересохраняем, если нет клиппинга
				return !myGraphic[kGraphicsHasClippingPath];
			} else {
				// пересохраняем, если неполиграфия
				return isGraphicFormatWrong();
			}
		} else if ((preferences[kPrefsChangeFormatTo] == kChangeFormatToPSD)) {
			// всё в psd
			if (myGraphic[kGraphicsFormat] == "TIFF") {
				// это тиф, пересохраняем
				return true;
			} else if (myGraphic[kGraphicsFormat] == "Photoshop") {
				// это psd, не трогаем
				return false;
			} else {
				// пересохраняем, если неполиграфия
				return isGraphicFormatWrong();
			}
		}
	} else {
		return false;
	}
}

// Проверка цветной или серой картинки на низкое dpi
// ------------------------------------------------------
function isGraphicColorDPILow(myGraphicDPI) {
	// всегда делаем ресэмпл при дельте == 0
	if (preferences[kPrefsColorDelta] == 0) {
		return true;
	} else {
		return (myGraphicDPI < (preferences[kPrefsColorTargetDPI] - preferences[kPrefsColorDelta]));
	}
}

// Проверка цветной или серой картинки на высокое dpi
// ------------------------------------------------------
function isGraphicColorDPIHigh(myGraphicDPI) {
	// всегда делаем ресэмпл при дельте == 0
	if (preferences[kPrefsColorDelta] == 0) {
		return true;
	} else {
		return (myGraphicDPI > (preferences[kPrefsColorTargetDPI] + preferences[kPrefsColorDelta]));
	}
}

// Проверка битмап-картинки на низкое dpi
// ------------------------------------------------------
function isGraphicBitmapDPILow(myGraphicDPI) {
	return (myGraphicDPI < (preferences[kPrefsBitmapTargetDPI] - preferences[kPrefsBitmapDelta]));
}

// Проверка битмап-картинки на высокое dpi
// ------------------------------------------------------
function isGraphicBitmapDPIHigh(myGraphicDPI) {
	return (myGraphicDPI > (preferences[kPrefsBitmapTargetDPI] + preferences[kPrefsBitmapDelta]));
}

// Получить actualPpi
// ------------------------------------------------------
function actualPPI(myGraphic) {
	try {
		return [myGraphic.actualPpi[0], myGraphic.actualPpi[1]];
	} catch (e) {
		return [0, 0];
	}
}

// Получить самый низкий effective dpi
// ------------------------------------------------------
function lowestDPI(myGraphic) {
	var myHorizontalDPI = Math.abs((actualPPI(myGraphic)[0] * 100) / myGraphic.absoluteHorizontalScale);
	var myVerticalDPI = Math.abs((actualPPI(myGraphic)[1] * 100) / myGraphic.absoluteVerticalScale);
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
	
	if (appVersion >= 6) {
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
function dictionaryLength(dictionaryObject) {
	var myLength = 0;
	
	for (var key in dictionaryObject)
		if (dictionaryObject.hasOwnProperty(key)) myLength++;
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
	try {
		var myTestFile = new File(myFolder.absoluteURI + "/.readonlytest");
		if (myTestFile.open("w")) {
			myTestFile.close();
			myTestFile.remove();
			return false;
		} else {
			return true;
		}
	} catch (e) {
		return true;
	}
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
	if (obj instanceof dictionary) {
		var copy = new dictionary();
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
