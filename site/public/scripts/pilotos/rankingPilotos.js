function obterRankingPilotos() {
    fetch("/pilotos/rankingPilotos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(pilotos => {
                var maiorPontuacao = pilotos[0].qtdPontos
                var difPontos = 0;

                pilotos.forEach(piloto => {
                    difPontos = maiorPontuacao - piloto.qtdPontos;
                    document.querySelector(".container-pilotos").innerHTML +=
                        `
                        <div class="card-piloto" data-id="${piloto.idPiloto}">
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
    setTimeout(obterRankingPilotos(), 1000)
    setTimeout(() => {
        var cardPiloto = document.querySelector(".container-pilotos");
        [...cardPiloto.children].forEach(card_piloto => {
            card_piloto.addEventListener("click", function () {
                entrarCard(card_piloto.getAttribute('data-id'))
            })
        });
    }, 1000);
});

function entrarCard(pilotoId) {
    window.location.href = './pilotoDetalhes.html?id=' + pilotoId
}