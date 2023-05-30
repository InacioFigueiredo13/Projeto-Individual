var database = require("../database/config")

function entrar(apelido, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE apelido = '${apelido}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(apelido, email, senha) {
    // query para cadastrar um usuario
    var instrucao = `
        INSERT INTO usuario (apelido, email, senha) VALUES ('${apelido}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
};