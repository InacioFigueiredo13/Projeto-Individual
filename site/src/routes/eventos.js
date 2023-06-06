var express = require("express");
var router = express.Router();

var eventosController = require("../controllers/eventosController")

router.get("/eventosUsuario/:idUsuario", function (req, res) {
    eventosController.obterEventosUsuario(req, res);
})

router.get("/listarEventos", function (req, res) {
    eventosController.obterListaEventos(req, res);
})

router.post("/marcarEvento/:idUsuario/:idEvento", function (req, res) {
    eventosController.marcarEvento(req, res);
})

router.delete("/desmarcarEvento/:idUsuario/:idEvento", function (req, res) {
    eventosController.desmarcarEvento(req, res);
})

module.exports = router;