var idPiloto = urlParams.get("id");

var likesStatus = [{ maisGosteis: 0, nomePiloto: "" }, { mediaGosteis: 0 }, { menosGosteis: 100000000, nomePiloto: "" }];

function buscarLikesPilotos() {
    fetch("/dashboards/obterLikes", { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(resposta);

                var totalGosteis = 0;
                var mediaGosteis = 0;

                for (let i = 0; i < resposta.length; i++) {
                    const likeAtual = resposta[i];

                    totalGosteis += likeAtual.qtdLikes;

                    if (likeAtual.qtdLikes > likesStatus[0].maisGosteis) {
                        likesStatus[0].maisGosteis = likeAtual.qtdLikes;
                        likesStatus[0].nomePiloto = likeAtual.nome;
                    } else if (likeAtual.qtdLikes <= likesStatus[2].menosGosteis) {
                        likesStatus[2].menosGosteis = likeAtual.qtdLikes;
                        likesStatus[2].nomePiloto = likeAtual.nome;
                    }

                }

                mediaGosteis = totalGosteis / resposta.length;
                likesStatus[1].mediaGosteis = mediaGosteis;

                plotarGrafico(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function buscarKpiLikesPilotos() {
    fetch(`/dashboards/obterKpiLikes/${idPiloto}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                plotarKPI(resposta)
                plotarGraficoPorcentagem(resposta)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

setTimeout(() => {
    buscarLikesPilotos();
    buscarKpiLikesPilotos();
}, 1000);


function plotarGrafico(resposta) {
    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'GOSTEIS',
            data: [],
            fill: true,
            borderWidth: 1,
            borderRadius: 2,
            tension: 0.5,
            inflateAmount: 0.2,
            backgroundColor: [
                'rgba(207, 81, 60, 0.5)',
                'rgba(196, 98, 57, 0.5)',
                'rgba(183, 62, 62, 0.5)',
                'rgba(199, 132, 17, 0.5)',
                'rgba(207, 108, 60, 0.5)',
                'rgba(97, 60, 207, 0.5)',
                'rgba(101, 57, 196, 0.5)',
                'rgba(199, 187, 50, 0.5)'
            ],
            borderColor: [
                'rgb(207, 81, 60)',
                'rgb(196, 98, 57)',
                'rgb(183, 62, 62)',
                'rgb(199, 132, 17,)',
                'rgb(207, 108, 60)',
                'rgb(197, 60, 207)',
                'rgb(101, 57, 196)',
                'rgb(199, 187, 50)'
            ],
        }]
    }

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var piloto = resposta[i];
        labels.push(piloto.nome);
        dados.datasets[0].data.push(piloto.qtdLikes);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`chart_likes_pilotos`),
        config,
    );
}

function plotarKPI(resposta) {

    var nomePilotoAtual = document.getElementById("nome").innerText;
    document.getElementById("dashboard-nome-piloto").innerHTML = nomePilotoAtual


    // Criando estrutura para plotar gráfico - labels
    let labels = ["Quantidade Total de Gosteis", "Quantidade de Gosteis do Piloto"];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'GOSTEIS',
            data: [],
            fill: true,
            backgroundColor: [
                'rgba(221, 83, 83, 0.8)',
                'rgba(207, 147, 10, 0.8)',
            ],
            hoverOffset: 4
        }]
    }

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var piloto = resposta[i];
        dados.datasets[0].data.push(piloto.qtdLikes);
        dados.datasets[0].data.push(piloto.qtdLikesPiloto);
        qtdLikesPiloto.innerHTML = piloto.qtdLikesPiloto;
        qtdLikesTotal.innerHTML = piloto.qtdLikes;
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'doughnut',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`chart_likes_pilotos_kpi`),
        config,
    );
}

function plotarGraficoPorcentagem(resposta) {
    // Criando estrutura para plotar gráfico - labels
    let labels = ["Porcentagem Total de Gosteis", "Porcentagem de Gosteis do Piloto"];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'PORCENTAGEM',
            data: [],
            fill: true,
            backgroundColor: [
                'rgba(221, 83, 83, 0.8)',
                'rgba(207, 147, 10, 0.8)',
            ],
            hoverOffset: 4
        }]
    }

    document.getElementById("maior-likes").innerHTML = likesStatus[0].maisGosteis;
    document.getElementById("nome-piloto-maior").innerHTML = likesStatus[0].nomePiloto;
    document.getElementById("media-likes").innerHTML = likesStatus[1].mediaGosteis.toFixed(2);
    document.getElementById("menor-likes").innerHTML = likesStatus[2].menosGosteis;
    document.getElementById("nome-piloto-menor").innerHTML = likesStatus[2].nomePiloto;

    var somaLikesTotal = resposta[0].qtdLikes;
    var qtdLikesPiloto = resposta[0].qtdLikesPiloto;
    var porcentagemLikesPiloto = qtdLikesPiloto * 100 / somaLikesTotal;
    var porcentagemSobrando = 100 - porcentagemLikesPiloto;


    dados.datasets[0].data.push(porcentagemSobrando);
    dados.datasets[0].data.push(porcentagemLikesPiloto);

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'pie',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`porcentagem-chart`),
        config,
    );
}