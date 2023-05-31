var database = require("../database/config");

function listarPilotos() {

    var instrucaoSql = `select * from piloto;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function rankingPilotos(){
    var instrucaoSql = `
        select piloto.fotoPiloto, piloto.nomeSobrenome, piloto.nomeTime, rankingPilotos.posicao, rankingPilotos. qtdPontos 
        FROM piloto 
        JOIN rankingPilotos 
        ON rankingPilotos.fkPiloto = piloto.idPiloto order by qtdPontos desc;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPilotos,
    rankingPilotos
}
