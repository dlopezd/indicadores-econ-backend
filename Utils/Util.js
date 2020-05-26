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
    const array = []
    Object.keys(o).forEach(function (key) {
        const newObject = { date: key, rate: o[key] };
        array.push(newObject);
    });
    return array;
}
exports.convertToArray = convertToArray;