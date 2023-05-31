var pilotosModel = require("../models/pilotosModel");

function listarPilotos(req, res) {
    pilotosModel.listarPilotos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar os pilotos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function rankingPilotos(req, res){
    pilotosModel.rankingPilotos().then(function (resultado){
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar os pilotos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarPilotos,
    rankingPilotos
}