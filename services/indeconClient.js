const config = require('config');
const axios = require('axios')


const baseUrlApi = config.rest_endpoints.indecon;

const getLast = async _ => {
    try {
        const path = `/last`
        let response = await axios({
            method: 'get',
            url: baseUrlApi + path,
        });
        console.log("Get last form indecon.")
        return response.data;

    } catch (error) {
        let err = new Error("Error al obtener Last desde indecon");
        err.statusCode = 503;
        throw err;
    }
}

const getValuesByKey = async (key) => {
    try {
        const path = `/values/${key}`
        let response = await axios({
            method: 'get',
            url: baseUrlApi + path,
        });
        console.log(`Get values/${key} from indecon.`)
        return response.data.values;

    } catch (error) {
        let err = new Error(`Error al obtener values/${key} desde indecon`);
        err.statusCode = 503;
        throw err;
    }
}

module.exports.getLast = getLast;
module.exports.getValuesByKey = getValuesByKey;