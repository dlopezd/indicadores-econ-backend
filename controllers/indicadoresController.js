const moment = require('moment');
var cache = require('memory-cache');

const indeconClient = require('../services/indeconClient');
const util = require('../Utils/Util');


exports.last = async (req, res, next) => {
    try {
        const today = moment().startOf('day');
        const keyCache = `LAST-${today.unix()}`

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
        var logContext = {
            error: error.message,
            path: req.path
        };
        console.error("ERROR. Context: " + JSON.stringify(logContext));

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.values = async (req, res, next) => {
    const key = req.params.key;
    let from = req.query.from;
    let to = req.query.to;

    try {

        if (!util.keys.some(k => k === key.toString())) {
            let error = new Error("Key inválida.");
            error.statusCode = 400;
            throw error;
        }

        const lastDate = util.frecuency[key] === "daily" ?
            moment().startOf('day') :
            moment().startOf('month');
        const keyCache = `${key}-${lastDate.unix()}`
        // rescate de los datos desde caché o api
        let valuesUntilToday = cache.get(keyCache);
        if (!valuesUntilToday) {
            const values = await indeconClient.getValuesByKey(key);
            valuesUntilToday = util.convertToArray(values);
            cache.put(keyCache, valuesUntilToday, 7200000);
        }

        // filtrado de los datos
        if (!from) {
            from = moment.utc("0001-01-01").unix();
        }
        if (!to) {
            to = moment().startOf('day').unix();
        }
        console.log(`FROM: ${from} - TO:${to}`);


        valuesUntilToday = valuesUntilToday.filter(r => {
            if (r.date >= from && r.date <= to) {
                return r;
            }
        });

        const length = valuesUntilToday.length;
        const response = {
            min_date: valuesUntilToday[0] ? valuesUntilToday[0].date : null,
            max_date: valuesUntilToday[length - 1] ? valuesUntilToday[length - 1].date : null,
            values: valuesUntilToday
        }

        res.send({ ok: true, error: null, data: response });
    }
    catch (error) {
        var logContext = {
            error: error.message,
            path: req.path,
            key: key,
            query: {
                from: from,
                to: to
            }
        };
        console.error("ERROR. Context: " + JSON.stringify(logContext));

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}