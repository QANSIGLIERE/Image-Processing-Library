import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { v4 as uuidv4 } from 'uuid';

export function saveBase64AsImage(base64String, fullPathToFile) {
    fs.writeFile(fullPathToFile, base64String, { encoding: 'base64' }, err => {
        if (err) throw err;
        console.log(`File saved here ${fullPathToFile}!`);
    });
}

export function compare2Images(imagePath1, imagePath2, pathToDifferenceFolder) {
    const img1 = PNG.sync.read(fs.readFileSync(imagePath1));
    const img2 = PNG.sync.read(fs.readFileSync(imagePath2));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    let numberOfDifferentPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    let diffFileName = uuidv4();
    console.log(`The file with difference can be found here: ${pathToDifferenceFolder}/${diffFileName}.PNG`);
    fs.writeFileSync(`${pathToDifferenceFolder}/${diffFileName}.PNG`, PNG.sync.write(diff));
    return numberOfDifferentPixels;
}

export function getPixelColor(pathToImage, x, y) {
    // Read file synchronously
    const buffer = fs.readFileSync(pathToImage);

    // Decode PNG synchronously
    const png = PNG.sync.read(buffer);

    if (x >= png.width || y >= png.height) {
        throw new Error('Pixel coordinates are out of bounds!');
    }

    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];

    return [r, g, b]; // return RGB
}

export function getColorsFromImage(pathToImage) {
    const buffer = fs.readFileSync(pathToImage);

    // Decode PNG synchronously
    const png = PNG.sync.read(buffer);

    const { data } = png;
    const colors = new Set();

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        colors.add(`${r},${g},${b}`);
    }

    return colors;
}

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
export function replaceRectangles(inputPath, outputPath, rectangles, color) {
    const buffer = fs.readFileSync(inputPath);
    const png = PNG.sync.read(buffer);

    for (const rect of rectangles) {
        const { x, y, width, height } = rect;

        for (let j = y; j < y + height; j++) {
            for (let i = x; i < x + width; i++) {
                if (i < 0 || j < 0 || i >= png.width || j >= png.height) continue;

                const idx = (png.width * j + i) << 2;

                png.data[idx] = color[0]; // R
                png.data[idx + 1] = color[1]; // G
                png.data[idx + 2] = color[2]; // B
                png.data[idx + 3] = color[3]; // A
            }
        }
    }

    const newBuffer = PNG.sync.write(png);
    fs.writeFileSync(outputPath, newBuffer);
}
