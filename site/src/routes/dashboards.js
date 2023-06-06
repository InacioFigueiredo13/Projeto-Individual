var express = require("express");
var router = express.Router();

var dashboardsController = require("../controllers/dashboardsController")

router.get("/obterLikes", function (req, res) {
    dashboardsController.obterLikes(req, res);
})

router.get("/obterKpiLikes/:idPiloto", function (req, res) {
    dashboardsController.obterKpiLikes(req, res);
})

router.get("/obterClassificacoesPilotos", function (req, res) {
    dashboardsController.obterClassificacoesPilotos(req, res);
})

router.get("/obterClassificacoesCarros", function (req, res) {
    dashboardsController.obterClassificacoesCarros(req, res);
})
router.get("/obterClassificacoesPneus", function (req, res) {
    dashboardsController.obterClassificacoesPneus(req, res);
})

module.exports = router;