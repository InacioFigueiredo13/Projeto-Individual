var pilotosModel = require("../models/pilotosModel");

function rankingPilotos(req, res) {
    pilotosModel.rankingPilotos().then(function (resultado) {
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

function podioPilotos(req, res) {
    pilotosModel.podioPilotos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar o pódio de pilotos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function detalhesPiloto(req, res) {
    var idPiloto = req.params.idPiloto;
    pilotosModel.detalhesPiloto(idPiloto).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar o detalhes do piloto" + idPiloto, erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarLIke(req, res) {
    var idPiloto = req.params.idPiloto;
    var idUsuario = req.params.idUsuario;

    if (idPiloto == undefined) {
        res.status(400).send("O id do Piloto está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        pilotosModel.pesquisarLIke(idPiloto, idUsuario).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!" + resultado)
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar o detalhes do piloto" + idPiloto, erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function darLike(req, res) {
    var idPiloto = req.params.idPiloto;
    var idUsuario = req.params.idUsuario;
    if (idPiloto == undefined) {
        res.status(400).send("O id do Piloto está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        pilotosModel.darLike(idPiloto, idUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function tirarLike(req, res) {
    var idPiloto = req.params.idPiloto;
    var idUsuario = req.params.idUsuario;
    if (idPiloto == undefined) {
        res.status(400).send("O id do Piloto está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O id do Usuário está undefined!");
    } else {
        pilotosModel.tirarLike(idPiloto, idUsuario)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    rankingPilotos,
    podioPilotos,
    detalhesPiloto,
    pesquisarLIke,
    darLike,
    tirarLike
}