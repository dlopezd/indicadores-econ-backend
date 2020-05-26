const moment = require('moment');
var cache = require('memory-cache');

const indeconClient = require('../services/indeconClient');
const util = require('../Utils/Util');


exports.last = async (req, res, next) => {
    try {
        const today = moment().startOf('day');
        const keyCache = `LAST-${today.seconds()}`

        let lastInfo = cache.get(keyCache);
        if (!lastInfo) {
            lastInfo = await indeconClient.getLast();
            // SE AGREGA INFORMACIÓN CONTEXTO PARA LOS INDICADORES
            lastInfo.dolar.frecuency = util.frecuency['dolar'];
            lastInfo.euro.frecuency = util.frecuency['euro'];
            lastInfo.yen.frecuency = util.frecuency['yen'];
            lastInfo.cobre.frecuency = util.frecuency['cobre'];
            lastInfo.oro.frecuency = util.frecuency['oro'];
            lastInfo.plata.frecuency = util.frecuency['plata'];
            lastInfo.ivp.frecuency = util.frecuency['ivp'];
            lastInfo.uf.frecuency = util.frecuency['uf'];
            lastInfo.ipc.frecuency = util.frecuency['ipc'];
            lastInfo.utm.frecuency = util.frecuency['utm'];
            // 2 horas de timeout
            // para efectos de la prueba, me parece bien.
            // si tuviera mayores antecedentes de la hora en que
            // se actualizan los valores, se podría ajustar el
            // tiempo de la caché
            cache.put(keyCache, lastInfo, 7200000);
        }

        res.send({ ok: true, error: null, data: lastInfo });
    }
    catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.values = async (req, res, next) => {
    try {
        if (!req.params.key) {
            let error = new Error("Debe señalar el indicador económico.");
            error.statusCode = 400;
            next(error);
        }

        const key = req.params.key;
        const lastDate = util.frecuency[key] === "daily" ?
            moment().startOf('day') :
            moment().startOf('month');
        const keyCache = `${key}-${lastDate.seconds()}`
        // rescate de los datos desde caché o api
        let valuesUntilToday = cache.get(keyCache);
        if (!valuesUntilToday) {
            const values = await indeconClient.getValuesByKey(key);
            valuesUntilToday = util.convertToArray(values);
            cache.put(keyCache, valuesUntilToday, 7200000);
        }

        // filtrado de los datos
        let from = req.query.from;
        let to = req.query.to;

        if (!from) {
            from = moment.utc("0001-01-01");
        }
        else {
            from = moment.unix(from);
        }
        if (!to) {
            to = moment().startOf('day');
        }
        else {
            to = moment.unix(to);
        }

        valuesUntilToday = valuesUntilToday.filter(r => {
            let date = moment.unix(r.date);
            if ((date.isAfter(from) || date.isSame(from)) &&
                (date.isBefore(to) || date.isSame(to))) {
                return r;
            }
        });





        res.send({ ok: true, error: null, data: valuesUntilToday });
    }
    catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}