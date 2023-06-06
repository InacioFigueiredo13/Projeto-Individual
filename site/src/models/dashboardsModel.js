var database = require("../database/config");

function obterLikes() {
    var instrucaoSql = `
        select count(listagostei.fkPiloto) qtdLikes, piloto.nomesobrenome nome FROM listagostei 
        RIGHT JOIN piloto 
        ON listagostei.fkPiloto = piloto.idPiloto GROUP BY nome;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterKpiLikes(idPiloto) {
    var instrucaoSql = `
        select count(listagostei.fkpiloto) qtdLikes, 
        (select count(listagostei.fkPiloto) qtdLikesPiloto from listaGostei where fkPiloto = ${idPiloto}) qtdLikesPiloto 
        from listagostei;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterClassificacoesPilotos() {
    var instrucaoSql = `
        select rankingpilotos.qtdPontos, piloto.nomeSobrenome from rankingpilotos 
        JOIN piloto 
        ON rankingpilotos.fkPiloto = piloto.idPiloto 
        order by qtdPontos desc;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterClassificacoesCarros() {
    var instrucaoSql = `
        select rankingcarrosfabricante.qtdPontos, carrofabricante.nomecarrofabricante from rankingcarrosfabricante 
        JOIN carrofabricante 
        ON rankingcarrosfabricante.fkcarrofabricante = carrofabricante.idcarrofabricante 
        ORDER BY qtdpontos DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterClassificacoesPneus() {
    var instrucaoSql = `
        select rankingpneusfabricante.qtdPontos, pneufabricante.nomePneuFabricante from rankingpneusfabricante 
        JOIN pneufabricante 
        ON rankingpneusfabricante.fkpneufabricante = pneufabricante.idpneufabricante 
        ORDER BY qtdpontos DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterLikes,
    obterKpiLikes,
    obterClassificacoesPilotos,
    obterClassificacoesCarros,
    obterClassificacoesPneus
}