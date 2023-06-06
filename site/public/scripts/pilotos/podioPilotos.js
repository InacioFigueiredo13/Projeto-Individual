function obterPodio() {
    fetch("/pilotos/podioPilotos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                json.forEach(piloto => {
                    document.getElementById("pilotos").innerHTML +=
                        `
                            <div class="piloto-card" data-id="${piloto.idPiloto}">
                                <img class="piloto-img" src="${piloto.fotoPiloto}" alt="piloto image">
                                <div class="piloto-nome-bandeira">
                                    <p>${piloto.nomeSobrenome}</p>
                                    <img src="${piloto.nacionalidadeBandeira}" alt="">
                                </div>
                                <div class="piloto-informations">
                                    <p class="info-title">Idade: <span class="info">${piloto.idade}</span></p>
                                    <p class="info-title">Nome do Time: <span class="info">${piloto.nomeTime}</span></p>
                                    <p class="info-title">Fabricante do carro: <span class="info">${piloto.nomeCarroFabricante}</span></p>
                                    <p class="info-title">Fabricante do Pneu: <span class="info">${piloto.nomePneuFabricante}</span></p>
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
    setTimeout(obterPodio(), 1000)
    setTimeout(() => {
        var cardPiloto = document.getElementById("pilotos");
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