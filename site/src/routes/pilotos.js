var express = require("express");
var router = express.Router();

var pilotosController = require("../controllers/pilotosController");

router.get("/ultimas/:idAquario", function (req, res) {
    pilotosController.buscarUltimasMedidas(req, res);
});


module.exports = router;