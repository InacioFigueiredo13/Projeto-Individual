var eventosModel = require("../models/eventosModel");

function obterEventosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;
    eventosModel.obterEventosUsuario(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro os eventos do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterEventosUsuarioDetalhes(req, res) {
    var idUsuario = req.params.idUsuario;
    eventosModel.obterEventosUsuarioDetalhes(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro os eventos do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterListaEventos(req, res) {
    eventosModel.obterListaEventos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro os eventos do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function marcarEvento(req, res) {
    var idEvento = req.params.idEvento;
    var idUsuario = req.params.idUsuario;
    if (idEvento == undefined) {
        res.status(400).send("O id do Evento está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        eventosModel.marcarEvento(idEvento, idUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao marcar o evento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function desmarcarEvento(req, res) {
    var idEvento = req.params.idEvento;
    var idUsuario = req.params.idUsuario;
    if (idEvento == undefined) {
        res.status(400).send("O id do Evento está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        eventosModel.desmarcarEvento(idEvento, idUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao desmarcar o evento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    obterEventosUsuario,
    obterListaEventos,
    marcarEvento,
    desmarcarEvento,
    obterEventosUsuarioDetalhes
}