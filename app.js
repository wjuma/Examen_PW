const argv = require("./config/yargs.js").argv;
const buscar = require("./buscador/buscador.js");
let comando = argv._[0];

switch (comando) {
    case "mostrar":
        buscar.lecturacsv(argv.archivo, argv.pais, argv.anio);
        break;
    case "guardar":
        control.guardar(argv.archivo, argv.pais, argv.anio, arg.guardar);
        break;
    default:
        console.log("Comando no reconocido");
}