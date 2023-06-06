function entrar() {

    var apelidoVar = ipt_apelido.value;
    var senhaVar = ipt_senha.value;

    if (apelidoVar == "" || senhaVar == "") {
        toggleModalLogin()
        return false;
    } else {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                apelidoServer: apelidoVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {

                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.APELIDO_USUARIO = json.apelido;
                    sessionStorage.ID_USUARIO = json.idUsuario;

                    setTimeout(function () {
                        window.location = "./index.html";
                    }, 1000); // apenas para exibir o loading
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.error(texto);
                    toggleModalLogin()
                });
            }
        }).catch(function (erro) {
            console.log(erro);
            toggleModalLogin()
        })
        return false;
    }
}