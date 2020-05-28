const expect = require('chai').expect;
const sinon = require('sinon')
var cache = require('memory-cache');

const indicadoresController = require('../controllers/indicadoresController');
const indeconClient = require('../services/indeconClient');


describe("Indicadores Controller", function () {
    describe("Last", function () {
        it("First request should get data from Indecon and save it in cache", function (done) {
            const data = {
                cobre: {}, dolar: {}, euro: {}, ipc: {}, ivp: {},
                oro: {}, plata: {}, uf: {}, utm: {}, yen: {}
            }

            sinon.stub(indeconClient, "getLast");
            indeconClient.getLast.returns(data);

            sinon.stub(cache, "put");
            cache.put.returns(true);

            const res = {
                send: () => { return; }
            }

            indicadoresController.last({}, res, () => { })
                .then(res => {
                    expect(indeconClient.getLast.called).to.be.true
                    expect(cache.put.called).to.be.true

                    indeconClient.getLast.restore();
                    cache.put.restore();
                    done();
                });
        });

        it("When data is saved in cache, should n't call Indecon.", function (done) {
            const data = {
                cobre: {}, dolar: {}, euro: {}, ipc: {}, ivp: {},
                oro: {}, plata: {}, uf: {}, utm: {}, yen: {}
            }

            sinon.stub(indeconClient, "getLast");
            indeconClient.getLast.returns(data);

            sinon.stub(cache, "get");
            cache.get.returns(data);

            const res = {
                send: () => { return; }
            }

            indicadoresController.last({}, res, () => { })
                .then(res => {
                    expect(indeconClient.getLast.called).to.be.false
                    expect(cache.get.called).to.be.true

                    indeconClient.getLast.restore();
                    cache.get.restore();
                    done();
                });
        });

        it("Should send a response with error 503, when Indecon is fails.", function (done) {
            const data = {
                cobre: {}, dolar: {}, euro: {}, ipc: {}, ivp: {},
                oro: {}, plata: {}, uf: {}, utm: {}, yen: {}
            }

            let error = new Error("Error simulado de indeconclient");
            error.statusCode = 503;

            sinon.stub(indeconClient, "getLast");
            indeconClient.getLast.throws(error);

            sinon.stub(cache, "put");
            cache.put.returns(true);

            sinon.stub(cache, "get");
            cache.get.returns(null);            

            const res = {
                statusCode: 1,
                send: function (data) {
                    return data;
                }
            };

            indicadoresController.last({}, res, () => { })
                .then(res => {
                    expect(res.statusCode).to.be.equal(503);
                    
                    indeconClient.getLast.restore();
                    cache.get.restore()
                    cache.put.restore();
                    done();
                });
        });
    })
})