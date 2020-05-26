const config = require('config');
const axios = require('axios')


const baseUrlApi = config.rest_endpoints.indecon;

const getLast = async _ => {

    try {
        
    } catch (error) {
        let err = new Error("Error al obtener información desde indecon");
        err.statusCode = 503;
        throw err;
    }
}

const getHistoric = async (key) => {

    let path = "search?" + qs.stringify(searchInfo);

    try {
        const headers = {
            "Authorization": `Bearer ${authorizationInfo.access_token}`
        };

        const response = await axios.get(baseUrlApi + path, { headers })
        return response.data;
    }
    catch (error) {
        let err = new Error("Error al obtener álbumes desde spotify");
        err.statusCode = 503;
        throw err;
    }
}

module.exports.search = search;
module.exports.getToken = getToken;