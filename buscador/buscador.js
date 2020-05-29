const colors = require("colors");
const fs = require("fs");
const csv = require("csv-parser");
let tareaPorHAcer = [];

const lecturacsv = async(file) => {
    //let vector = [];
    const g = fs
        .createReadStream(file)
        .on("error", (err) => console.log(err)) // Abrir archivo
        .pipe(csv({ cast: true, delimiter: ";" }));
    for await (const row of g) {
        //console.log(g.length);
        for (let i = 4; i < 65; i++) {
            if (row[i] == "" || row[i] == " " || row[i] == "") {
                row[i] = "0";
            }
        }
        tareaPorHAcer.push(row);
    }

    return "Se ha terminado de leer el archivo";
};

let getE = async(archivo, pais, year) => {
    let doc = await lecturacsv(archivo);
    console.log(doc);
    let val = await validar(pais, year);

    let est = {
        MediaxAnio: await medxanio(year),
        Menor_Mayor: await media(pais, year),
        Menores: await menores(pais, year),
        Mayores: await mayores(pais, year),
        top5: await topcinco(year),
    };

    return est;
};
const indicar = async(year) => {};
const validar = async(pais, anio) => {
    if (!Number(anio)) {
        throw new Error(`año ${anio} invalido`);
    }
    let i = 0;
    if (anio < 1960 || anio > 2019) throw new Error("Año no Encontrado");
    for (i = 4; i < tareaPorHAcer.length; i++) {
        if (pais === tareaPorHAcer[i][1]) {
            break;
        }
    }
    if (i == tareaPorHAcer.length)
        throw new Error("Codigo de Pais no encontrado");
};

const mostrar = (archivo, pais, anio) => {
    est
        .getE(archivo, pais, anio)
        .then((v) => srv.escribir(v))
        .catch((msg) => console.log(msg.message));
};

module.exports = {
    lecturacsv,
};