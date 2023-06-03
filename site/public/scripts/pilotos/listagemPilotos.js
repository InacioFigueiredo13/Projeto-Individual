function obterPilotos() {
    fetch("/pilotos/listarPilotos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.forEach(piloto => {
                    console.log(piloto);

                    document.querySelector(".container-pilotos").innerHTML +=
                        `
                        <div class="card-piloto">
                        <div class="destaque">
                            <div class="infos-ranking">
                                <img src="${piloto.fotoPiloto}" alt="Imagem Piloto">
                                <div class="piloto-posicao">
                                    <span class="posicao">1°</span>
                                    <span class="posicao-subtitle">POSIÇÃO</span>
                                </div>
                                <div class="bar"></div>
                            </div>
                            <div class="piloto-info">
                                <span class="piloto-nome">${piloto.nomeSobrenome}</span>
                                <span class="piloto-team">${piloto.nomeTime}</span>
                            </div>
                        </div>
                        <div class="piloto-pontuacao">
                            <span class="pontos">150</span>
                            <span class="pontos-subtitle">PONTUAÇÃO</span>
                        </div>
                        <div class="piloto-pontuacao-diferenca">
                            <span class="pontos-diferenca abaixo">-10</span>
                            <span class="pontos-diferenca-subtitle">DIFERENÇA DE PONTOS</span>
                        </div>
                        <div class="img-pontos-status">
                            <img src="./assets/lower-points.png" class="dif-pontos-img">
                        </div>
                    </div>
                `
                });

            });
        } else {
            console.log("Houve um erro ao tentar listar os pilotos");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}


window.addEventListener("load", function () {
    setTimeout(obterPilotos(), 1000)
});