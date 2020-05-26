const indeconClient = require('../services/indeconClient');

exports.last = async (req, res, next) => {
    try {
        res.send({ok: true, error: null, data: "example"});
    }
    catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}