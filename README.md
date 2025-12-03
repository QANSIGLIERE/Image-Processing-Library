# Image-Processing-Library

The main idea of ​​this library, created in JavaScript, is to provide a ready-made set of methods for image processing

## Author

https://www.youtube.com/@QANSIGLIERE/

## Support the project

https://buymeacoffee.com/qansigliere

## Installation

Using npm: `npm i qansigliere-image-processing-library`

## Functions

-   `saveBase64AsImage(base64String, fullPathToFile)` - it allows us to save a base64 string as a .PNG image
-   `compare2Images(imagePath1, imagePath2, pathToDifferenceFolder)` - it compares two different or similar .PNG images
    with the same resolution, generates a file with different pixes and returns a number of the different pixels
-   `getPixelColor(pathToImage, x, y)` - it returns [R, G, B] color of any specific pixel for the provided image
-   `getColorsArrayFromImage(pathToImage)` - it returns a sorted array of all [R, G, B] colors of any specific provided
    image
-   `getColorsAndPixelsArrayFromImage(pathToImage)` - it returns a sorted array of objects like {'color': ..., 'pixels':
    ... } of any specific provided image
-   `replaceRectangles(inputPath, outputPath, rectangles, color)` - it will replace any rectangles on the image by
    provided color

## Related Videos

-   https://www.youtube.com/live/pGJtJyPtiHw?si=B_gX51bKSIXWYRYF

## Improvements & Suggestions

https://forms.gle/GZbS9hw42tSYJxKL7
