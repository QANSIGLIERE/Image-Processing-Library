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
