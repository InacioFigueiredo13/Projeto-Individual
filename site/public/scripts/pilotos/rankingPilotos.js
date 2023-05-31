function obterPilotos() {
    fetch("/pilotos/rankingPilotos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                var maiorPontuacao = json[0].qtdPontos
                var difPontos = 0;

                json.forEach(piloto => {
                    difPontos = maiorPontuacao - piloto.qtdPontos;

                    document.querySelector(".container-pilotos").innerHTML +=
                        `
                        <div class="card-piloto">
                        <div class="destaque">
                            <div class="infos-ranking">
                                <img src="${piloto.fotoPiloto}" alt="Imagem Piloto">
                                <div class="piloto-posicao">
                                    <span class="posicao">${piloto.posicao}°</span>
                                    <span class="posicao-subtitle">POSIÇÃO</span>
                                </div>
                                <div class="bar"></div>
                            </div>
                            <div class="piloto-info">
                                <span class="piloto-nome">${piloto.nomeSobrenome}</span>
                                <span class="piloto-team">${piloto.nomeTime}</span>
                            </div>
                        </div>
                        <div class="pontos-info"> 
                            <div class="piloto-pontuacao">
                                <span class="pontos">${piloto.qtdPontos}</span>
                                <span class="pontos-subtitle">PONTUAÇÃO</span>
                            </div>
                            <div class="piloto-pontuacao-diferenca">
                                <span class="pontos-diferenca abaixo">${difPontos}</span>
                                <span class="pontos-diferenca-subtitle">DIFERENÇA DE PONTOS</span>
                            </div>
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