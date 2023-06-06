function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var apelidoVar = ipt_apelido.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmarSenha.value;

    console.log(senhaVar);

    if (apelidoVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        //PREENCHA TODOS OS CAMPOS
        toggleModalCadastro("Preencha todos os campos!");
        return false;
    } else if (senhaVar.length < 8) {
        toggleModalCadastro("Sua senha precisa ter pelo menos 8 dígitos!");
        return false;
    } else if (senhaVar != confirmacaoSenhaVar) {
        toggleModalCadastro("Confirme sua senha corretamente.");
        return false;
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apelidoServer: apelidoVar,
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "./login.html";
                }, "2000")

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            toggleModalCadastro("Email ou Apelido já cadastrados!")
        });
        return false;
    }
}