const express = require('express');

const router = express.Router();

router.all('*', (req, res, next) => {
    let error = new Error("Recurso solicitado no existe.");
    error.statusCode = 404;

    var logContext = {
        error: error.message,
        path: req.path
    };
    console.error("ERROR. Context: " + JSON.stringify(logContext));
    next(error);
});

module.exports = router;
