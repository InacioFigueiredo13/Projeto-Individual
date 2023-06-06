var mysql = require("mysql2");
var sql = require('mssql');

// CONEXÃO DO MYSQL WORKBENCH
var mySqlConfig = {
    host: "localhost",
    database: "bdDorifto",
    user: "backend_dorifto",
    password: "prjDorifto12",
};

function executar(instrucao) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
}
