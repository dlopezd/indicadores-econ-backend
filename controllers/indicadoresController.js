const moment = require('moment');
var cache = require('memory-cache');

const indeconClient = require('../services/indeconClient');


exports.last = async (req, res, next) => {
    try {
        const today = moment().startOf('day');
        const keyCache = `LAST-${today.seconds()}`

        let lastInfo = cache.get(keyCache);
        if(!lastInfo){
            lastInfo = await indeconClient.getLast();
            // SE AGREGA INFORMACIÓN CONTEXTO PARA LOS INDICADORES
            lastInfo.dolar.frecuency = "daily";
            lastInfo.euro.frecuency = "daily";
            lastInfo.yen.frecuency = "daily";
            lastInfo.cobre.frecuency = "daily";
            lastInfo.oro.frecuency = "daily";
            lastInfo.plata.frecuency = "daily";
            lastInfo.ivp.frecuency = "daily";
            lastInfo.uf.frecuency = "daily";
            lastInfo.ipc.frecuency = "monthly";
            lastInfo.utm.frecuency = "monthly";
            // 2 horas de timeout
            // para efectos de la prueba, me parece bien.
            // si tuviera mayores antecedentes de la hora en que
            // se actualizan los valores, se podría ajustar el
            // tiempo de la caché
            cache.put(keyCache, lastInfo, 7200000);
        }

        res.send({ok: true, error: null, data: lastInfo});
    }
    catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}