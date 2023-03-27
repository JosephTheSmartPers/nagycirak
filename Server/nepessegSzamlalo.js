const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const filePath = 'nepesseg.txt'

const kerNepessegSzam = async () => await readFile(filePath, 'utf8')
const irNepessegSzam = async (szam) => await writeFile(filePath, szam)

const nepSzamalaloInterval = 10 * 1000

async function FrissitNepesseg(min, max) {
    let nepessegSzam = await kerNepessegSzam()
    nepessegSzam = parseInt(nepessegSzam)
    //Lekérjük a népességet

    const deltaNepesseg = Math.floor(Math.random() * (Math.abs(min) + max) + 1) - Math.abs(min);
    nepessegSzam += deltaNepesseg
    //Frissítjük a néppességszámot

    irNepessegSzam(nepessegSzam.toString())
    console.log(nepessegSzam)
    //Az új értéket visszaírjuk a fájlba 
}
setInterval(() => {
    FrissitNepesseg(-2, 2)
}, nepSzamalaloInterval);




