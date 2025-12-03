export function saveBase64AsImage(base64String: any, fullPathToFile: any): void;
export function compare2Images(imagePath1: any, imagePath2: any, pathToDifferenceFolder: any): number;
export function getPixelColor(pathToImage: any, x: any, y: any): any[];
export function getColorsFromImage(pathToImage: any): any;
/**
 * Replace one or more rectangles in a PNG with a given color
 * @param {string} inputPath - Path to input PNG file
 * @param {string} outputPath - Path to save modified PNG
 * @param {Array} rectangles - Array of rectangles [{x, y, width, height}]
 * @param {Array} color - RGBA color [r,g,b,a] (0–255)
 * replaceRectangles(
    './element-00000000-0000-00a0-ffff-ffff000000e6.png',
    './3.png',
    [{ x: 10, y: 20, width: 50, height: 30 }],
    [255, 0, 0, 255]);
 */
export function replaceRectangles(inputPath: string, outputPath: string, rectangles: any[], color: any[]): void;
//# sourceMappingURL=library.d.ts.map