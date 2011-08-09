* Русский
* English

Trista DPI *Русский*
====================

Назначение
----------

Пакетная обработка растровых изображений в документах Adobe InDesign.

В производственном процессе скрипт выполняет рутинные задачи, возникающие после создания "сырого" макета с необработанными исходными изображениями. Подцепленные в вёрстку JPEG пересохраняются в ту-же папку в TIFF или PSD, в зависимости от наличия обтравки, и персчитываются на (как правило) 300 dpi. Исходные JPEG удаляются.

Функциональность
----------------

### Форматы файлов

В обработку берутся все поддерживаемые InDesign форматы растровой графики.
По желанию JPEG, PNG, GIF и BMP можно пересохранять в TIFF или PSD.
Новые файлы создаются в той-же папке, что и исходные.

* **TIFF** - все неполиграфические форматы (JPEG, PNG и т.п.) будут пересохранены в TIFF.
* **TIFF, с обтравкой в PSD** - вся неполиграфия в TIFF, а при обнаружении обтравки на картинке в InDesign - в PSD.
* **PSD** - вся неполиграфия в PSD.

При сохранении в PSD можно отрывать лэер от фона и убирать обтравку в InDesign.

Оригиналы изображений можно удалять.

### Разрешение

Изображения Black and White (Bitmap) обрабатываются отдельно от Color и Grayscale. Настройки желаемого разрешения и дельты (минимального отличия разрешения от желаемого), соответственно, также задаются отдельно. По-умолчанию это 300 dpi для Color и Grayscale, и 1200 dpi для Bitmap.

### Области действия

* **Все открытые документы** - в обработку идут все документы, открытые в InDesign.
* **Активный документ** - в обработку идёт только активный документ.
* **Выбранные страницы** - в обработку идут только выбранные страницы активного документа.
* **Выбранные изображения** - в обработку идут только выбранные в InDesign изображения активного документа.

Изображения за пределами вылетов можно обрабатывать или игнорировать.

### Резервное копирование

По желанию можно делать резервные копии всех изменяемых файлов, включая публикацию InDesign.
При совпадении имён файлов, лежащих в разных папках, к имени файла добавляется уникальный номер.

Установка
---------

Файл со скриптом (`Trista DPI.jsx`) положить в папку `Scripts Panel`. Открыть её можно прямо из InDesign: в палитре `Scripts` щёлкнуть правой кнопкой по папке `User` и сказать `Reveal in Finder` на Маке, или `Reveal In Explorer` под Windows.

Trista DPI *English*
====================

Purpose
-------

Batch processing of raster images in Adobe InDesign documents.

This script performs the routine tasks that occur in publishing workflow after the creation of "raw" layout with raw source images. Linked JPEGs are resaved in the same folder as TIFF or PSD, depending on the presence of clipping, and resampled to (usually) 300 dpi. Source JPEGs are removed.

Functionality
-------------

### File formats

All InDesign raster graphics formats are supported.
Optionally JPEG, PNG, GIF and BMP can be resaved as TIFF or PSD.
New files are created in the same folder as originals.

* **TIFF** - all non-polygraphic formats (JPEG, PNG etc.) are resaved to TIFF.
* **TIFF, PSD when clipping detected** - all non-polygraphic to TIFF, and to PSD when detecting a clipping path in InDesign.
* **PSD** - all non-polygraphic to PSD.

Background layer can be transformed to normal layer, and clipping path in InDesign can be removed when resaving to PSD.

Original images can be removed.

### Resolution

Black and White (Bitmap) graphics processed separately from Color and Grayscale. Target resolution and delta (minimal difference from target) settings are also separated. By default it's a 300 dpi for Color and Grayscale, and 1200 dpi for Bitmap.

### Scopes

* **All opened documents** - all documents, opened in InDesign will be processed.
* **Active document** - only active document will be processed.
* **Selected pages** - only selected pages of active document will be processed.
* **Selected images** - only selected in InDesign images will be processed.

Images that are off-bleeds can be processed or ignored.

### Backup

Optionally, back up copies of all changed files can be made, including the InDesign publication.
When the file names from different folders are identical, unique number are added to file names.

Installation
------------

Script file (`Trista DPI.jsx`) should be placed in folder `Scripts Panel`. It can be easily accessed from InDesign's Scripts panel by right-clicking a `User` folder, and choosing `Reveal In Finder`  in Mac OS or `Reveal In Explorer` in Windows.
