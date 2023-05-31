var express = require("express");
var router = express.Router();

var pilotosController = require("../controllers/pilotosController");

router.get("/listarPilotos", function (req, res) {
    pilotosController.listarPilotos(req, res);
});

router.get("/rankingPilotos", function(req, res){
    pilotosController.rankingPilotos(req, res);
})

module.exports = router;