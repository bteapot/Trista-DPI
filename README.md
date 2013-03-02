* [Русский](#lang_rus)
* [English](#lang_eng)

<a name="lang_rus"><a>Trista DPI
====================

Назначение
----------

Пакетная обработка растровых изображений в документах Adobe InDesign.

Скрипт выполняет рутинные задачи, возникающие после создания "сырого" макета с необработанными исходными изображениями.

В режиме "Допечатный процесс" подцепленные в вёрстку JPEG пересохраняются в ту-же папку в TIFF или PSD, в зависимости от наличия обтравки, и персчитываются на (как правило) 300 dpi. Исходные JPEG удаляются.

В режиме "Цифровой процесс" вся графика экспортируется в PNG методом "Save for Web" с параметрами PNG-24, Transparency и Convert to sRGB.

В режиме "Развнедрение картинок" внедрённые и вставленные в вёрстку изображения извлекаются во внешние файлы.

Функциональность
----------------

### Форматы файлов

###### Допечатный процесс

В обработку берутся все поддерживаемые InDesign форматы растровой графики.
По желанию JPEG, PNG, GIF и BMP можно пересохранять в TIFF или PSD.
Новые файлы создаются в той-же папке, что и исходные.

* **Сохранять как TIFF** - все неполиграфические форматы (JPEG, PNG и т.п.) будут пересохранены в TIFF.
* **Сохранять как TIFF, с обтравкой в PSD** - вся неполиграфия в TIFF, а при обнаружении обтравки на картинке в InDesign - в PSD.
* **Сохранять как PSD** - вся неполиграфия в PSD.

При сохранении в PSD можно отрывать лэер от фона и убирать обтравку в InDesign.

При желании можно определять и обрабатывать файлы Photoshop EPS, что несколько замедляет проверку изображений.

Оригиналы изображений можно удалять.

###### Цифровой процесс

Изображения всех поддерживаемых InDesign форматов экспортируются в PNG.

* **Только не-PNG файлы** - в обработку берутся все форматы, кроме PNG.
* **Все файлы, включая PNG** - включая PNG.

Bitmap-изображения не экспортируются в PNG.

Оригиналы изображений можно удалять.

### Разрешение

Изображения Black and White (Bitmap) обрабатываются отдельно от Color и Grayscale. Настройки желаемого разрешения и дельты (минимального отличия разрешения от желаемого), соответственно, также задаются отдельно. По-умолчанию это 300 dpi для Color и Grayscale, и 1200 dpi для Bitmap.
При дельте равной нулю изображение обрабатывается безусловно.

При рассчёте необходимого разрешения учитываются параметры трансформации всех вхождений изображения.

Можно выбрать метод изменения размера изображений:

* **Bicubic** - по-умолчанию, и для уменьшения, и для увеличения.
* **Bicubic sharper/smoother** - для увеличения резкости при уменьшении, и для сглаживания при увеличении.  

### Области действия

* **Все открытые документы** - в обработку идут все документы, открытые в InDesign.
* **Активный документ** - в обработку идёт только активный документ.
* **Выбранные страницы** - в обработку идут только выбранные страницы активного документа.
* **Выбранные изображения** - в обработку идут только выбранные в InDesign изображения активного документа.

Изображения за пределами вылетов можно обрабатывать или игнорировать.

Изображения на мастерах из обработки исключаются.

### Список изображений

В обработку идут только изображения, выбранные в этом списке.
При выделении только одного изображения показывается список документов и номера полос, на которых выделенное изображение присутствует.

Файлы с правами доступа только для чтения отмечаются красной точкой и из обработки исключаются.

### Резервное копирование

По желанию можно делать резервные копии всех изменяемых файлов, включая публикацию InDesign.
При совпадении имён файлов, лежащих в разных папках, к имени файла добавляется уникальный номер.

Можно включить автоматическое удаление резервных копий, сделанных более месяца назад.

Ранее созданные резервные копии могут быть автоматически восстановлены при запуске скрипта без открытых документов InDesign.

### Развнедрение

Картинки, штатно внедрённые в документ и картинки, вставленные командами Копировать/Вставить, могут быть автоматически извлечены.

Установка
---------

Файл со скриптом (`Trista DPI.jsx`) положить в папку `Scripts Panel`. Открыть её можно прямо из InDesign: в палитре `Scripts` щёлкнуть правой кнопкой по папке `User` и сказать `Reveal in Finder` на Маке, или `Reveal In Explorer` под Windows.

Благодарности
-------------

**Анастасия Морозова** - начальная идея, постановка задач и тестирование по допечатному процессу.

**Крэйг МакКаббин** - идея цифрового процесса.

<a name="lang_eng"><a>Trista DPI
====================

Purpose
-------

Batch processing of raster images in Adobe InDesign documents.

This script performs the routine tasks that occur in publishing workflow after the creation of "raw" layout with raw source images.

"Prepress workflow" mode: linked JPEGs are resaved in the same folder as TIFF or PSD, depending on the presence of clipping, and resampled to (usually) 300 dpi. Source JPEGs are removed.

"Digital workflow" mode: all images are exported to PNG by "Save for Web" method with PNG-24, Transparency and Convert to sRGB parameters.

"Unembed images" mode: embedded and pasted images are extracted into external files.

Functionality
-------------

### File formats

###### Prepress workflow

All InDesign raster graphic formats are supported.
Optionally JPEG, PNG, GIF and BMP can be resaved as TIFF or PSD.
New files are created in the same folder as originals.

* **Save as TIFF** - all non-prepress formats (JPEG, PNG etc.) are resaved to TIFF.
* **Save as TIFF, PSD when clipping detected** - all non-prepress to TIFF, and to PSD when detecting a clipping path in InDesign.
* **Save as PSD** - all non-prepress to PSD.

Background layer can be transformed to normal layer, and clipping path in InDesign can be removed when resaving to PSD.

Photoshop EPS files can be optionally detected and processed, which is slightly slowing images checking process.

Original images can be removed.

###### Digital workflow

Images of all InDesign-supported formats are exported to PNG.

* **Non-PNG files only** - all images excluding PNG are exported to PNG.
* **All files including PNG** - including PNG.

Bitmap images are not exported to PNG.

Original images can be removed.

### Resolution

Black and White (Bitmap) graphics processed separately from Color and Grayscale. Target resolution and delta (minimal difference from target) settings are also separated. By default it's a 300 dpi for Color and Grayscale, and 1200 dpi for Bitmap.
When the delta is zero, the image is processed unconditionally.

Transformation parameters of every image's occurrence are considered when calculating target resolution.

Image resampling method can be choosen from:

* **Bicubic** - default, for downsampling and upsampling.
* **Bicubic sharper/smoother** - sharper for downsampling and smoother for upsampling.  

### Scopes

* **All opened documents** - all documents, opened in InDesign will be processed.
* **Active document** - only active document will be processed.
* **Selected pages** - only selected pages of active document will be processed.
* **Selected images** - only selected in InDesign images will be processed.

Images that are off-bleeds can be processed or ignored.

Images on master pages are always ignored.

### Images list

Only images selected in this list will be processed.
When only one image is selected, all its occurences are listed with corresponding document name and page number.

Read-only files are marked with a red dot and always ignored.

### Backup

Optionally, back up copies of all changed files can be made, including the InDesign publication.
When the file names from different folders are identical, unique number are added to file names.

Backups created more than month ago can be automatically deleted if desired.

Previously created backups can be automatically restored by running script with no documents open in InDesign.

### Unembedding

Embedded images and images, pasted into document by Copy/Paste commands can be automatically unembedded.

Installation
------------

Script file (`Trista DPI.jsx`) should be placed in folder `Scripts Panel`. It can be easily accessed from InDesign's Scripts panel by right-clicking a `User` folder, and choosing `Reveal In Finder`  in Mac OS or `Reveal In Explorer` in Windows.

Acknowledgements
----------------

**Anastasia Morozova** - initial idea, prepress problem definition and testing.

**Craig McCubbin** - idea of digital process.
