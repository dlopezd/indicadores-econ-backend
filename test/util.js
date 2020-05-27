const expect = require('chai').expect;

const util = require('../Utils/Util');

describe("Util tests", function() {
    it("should convert an Indecon object response to array", function() {
        const objectResponse = {
            1546387200: 1279.27,
            1546473600: 1285.62,
            1546560000: 1290.61
        };

        const expectedArray = [
            { date: 1546387200, rate: 1279.27},
            { date: 1546473600, rate: 1285.62},
            { date: 1546560000, rate: 1290.61}
        ];

        const responseArray = util.convertToArray(objectResponse);
        expect(responseArray).to.eql(expectedArray);
    });

    it("should throw error when try convert object response to array without format expected.", function() {
        const objectResponse = {
            1546387200: [1279.27, 123.2],
            1546473600: 1285.62,
            1546560000: 1290.61
        };
        
        expect(util.convertToArray.bind(util, objectResponse)).to.throw("Respuesta de indecon sin el formato correcto.");
    });
})