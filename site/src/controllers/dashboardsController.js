var dashboardsModel = require("../models/dashboardsModel")

function obterLikes(req, res) {
    dashboardsModel.obterLikes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter os dados do dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterKpiLikes(req, res) {
    var idPiloto = req.params.idPiloto;
    dashboardsModel.obterKpiLikes(idPiloto).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter os dados do dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterClassificacoesPilotos(req, res) {
    dashboardsModel.obterClassificacoesPilotos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter os dados do dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterClassificacoesCarros(req, res) {
    dashboardsModel.obterClassificacoesCarros().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter os dados do dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterClassificacoesPneus(req, res) {
    dashboardsModel.obterClassificacoesPneus().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao obter os dados do dashboard.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterLikes,
    obterKpiLikes,
    obterClassificacoesPilotos,
    obterClassificacoesCarros,
    obterClassificacoesPneus
}