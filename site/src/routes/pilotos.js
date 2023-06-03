var express = require("express");
var router = express.Router();

var pilotosController = require("../controllers/pilotosController");

router.get("/rankingPilotos", function (req, res) {
    pilotosController.rankingPilotos(req, res);
})

router.get("/podioPilotos", function (req, res) {
    pilotosController.podioPilotos(req, res);
})

router.get("/detalhesPiloto/:idPiloto", function (req, res) {
    pilotosController.detalhesPiloto(req, res);
})

router.get("/toggleLike/pesquisarLike/:idPiloto/:idUsuario", function (req, res) {
    pilotosController.pesquisarLIke(req, res);
})

router.post("/toggleLike/darLike/:idPiloto/:idUsuario", function (req, res) {
    pilotosController.darLike(req, res);
})

router.delete("/toggleLike/tirarLike/:idPiloto/:idUsuario", function (req, res) {
    pilotosController.tirarLike(req, res);
})

module.exports = router;