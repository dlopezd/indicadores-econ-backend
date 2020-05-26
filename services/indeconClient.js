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
        console.log("se consultó con éxito la api de indecon");
        return response.data;

    } catch (error) {
        let err = new Error("Error al obtener información desde indecon");
        err.statusCode = 503;
        throw err;
    }
}

const getHistoric = async (key) => {

}

module.exports.getLast = getLast;
module.exports.getHistoric = getHistoric;