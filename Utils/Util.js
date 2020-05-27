let frecuency = [];
frecuency['dolar'] = "daily";
frecuency['euro'] = "daily";
frecuency['yen'] = "daily";
frecuency['cobre'] = "daily";
frecuency['oro'] = "daily";
frecuency['plata'] = "daily";
frecuency['ivp'] = "daily";
frecuency['uf'] = "daily";
frecuency['ipc'] = "monthly";
frecuency['utm'] = "monthly";
exports.frecuency = frecuency;

const convertToArray = o => {
    try {
        const array = []
        Object.keys(o).forEach(function (key) {
            const value = Number(o[key]);
            if (!value) { throw new Error("Formato incorrecto."); }
            const newObject = { date: Number(key), rate: value };
            array.push(newObject);
        });
        return array;
    }
    catch (error) {
        let err = new Error("Respuesta de indecon sin el formato correcto.")
        err.statusCode = 500;
        throw err;
    }
}
exports.convertToArray = convertToArray;


const keys = ["cobre", "dolar", "euro", "ipc", "ivp", "oro", "plata", "uf", "utm", "yen"];
exports.keys = keys;