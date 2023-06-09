var database = require("../database/config");

function obterEventosUsuario(idUsuario) {
    var instrucaoSql = `
     select * from usuarioagenda where fkUsuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterEventosUsuarioDetalhes(idUsuario) {
    var instrucaoSql = `
     select descricao, data, logoEvento, localizacao from evento JOIN usuarioagenda ON evento.idEvento = usuarioagenda.fkEvento where fkUsuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterListaEventos() {
    var instrucaoSql = `
        select * from evento order by data asc;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function marcarEvento(idEvento, idUsuario) {
    var instrucaoSql = `
        insert into usuarioagenda (fkUsuario, fkEvento) VALUES (${idUsuario}, ${idEvento});
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desmarcarEvento(idEvento, idUsuario) {
    var instrucaoSql = `
        delete from usuarioagenda where fkUsuario = ${idUsuario} AND fkEvento = ${idEvento};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterEventosUsuario,
    obterListaEventos,
    marcarEvento,
    desmarcarEvento,
    obterEventosUsuarioDetalhes
}