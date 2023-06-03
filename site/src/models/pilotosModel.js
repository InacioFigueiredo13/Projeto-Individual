var database = require("../database/config");

function rankingPilotos() {
    var instrucaoSql = `
        select piloto.idPiloto, piloto.fotoPiloto, piloto.nomeSobrenome, piloto.nomeTime, rankingPilotos.posicao, rankingPilotos. qtdPontos 
            FROM piloto 
            JOIN rankingPilotos 
            ON rankingPilotos.fkPiloto = piloto.idPiloto order by qtdPontos desc;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function podioPilotos() {
    var instrucaoSql = `
        select piloto.idPiloto, piloto.fotoPiloto, piloto.nomeSobrenome, piloto.nacionalidadeBandeira, piloto.idade, piloto.nomeTime, carroFabricante.nomeCarroFabricante, pneuFabricante.nomePneuFabricante 
        from piloto 
        join carroFabricante 
        on piloto.fkCarroFabricante = carroFabricante.idCarroFabricante 
        join pneuFabricante 
        on piloto.fkPneuFabricante = pneuFabricante.idPneuFabricante 
        join rankingpilotos on rankingpilotos.fkPiloto = piloto.idPiloto
        order by posicao
        limit 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function detalhesPiloto(idPiloto) {
    var instrucaoSql = `
        select rankingpilotos.posicao posicao, piloto.nomesobrenome nome, piloto.fotopiloto fotoPiloto, piloto.nacionalidadebandeira pilotoBandeira, piloto.idade idade, piloto.nometime time, carrofabricante.nomecarrofabricante carroFab, pneufabricante.nomepneufabricante pneuFab 
        FROM rankingpilotos JOIN piloto 
        ON rankingpilotos.fkPiloto = piloto.idPiloto 
        JOIN carrofabricante 
        ON piloto.fkcarrofabricante = carrofabricante.idcarrofabricante 
        JOIN pneufabricante
        ON piloto.fkpneufabricante = pneufabricante.idpneufabricante WHERE idpiloto = ${idPiloto};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarLIke(idPiloto, idUsuario) {
    var instrucaoSql = `
     select * from listagostei where fkPiloto = ${idPiloto} AND fkUsuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function darLike(idPiloto, idUsuario) {
    var instrucaoSql = `
        insert into listagostei (fkPiloto, fkUsuario) VALUES (${idPiloto}, ${idUsuario})
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tirarLike(idPiloto, idUsuario) {
    var instrucaoSql = `
        delete from listagostei where fkPiloto = ${idPiloto} and fkUsuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    rankingPilotos,
    podioPilotos,
    detalhesPiloto,
    pesquisarLIke,
    darLike,
    tirarLike
}
