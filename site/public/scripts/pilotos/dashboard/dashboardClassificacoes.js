function obterClassificacoesPilotos() {
    fetch("/dashboards/obterClassificacoesPilotos", { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoClasPilotos(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterClassificacoesCarros() {
    fetch("/dashboards/obterClassificacoesCarros", { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(resposta);
                plotarGraficoClasCarros(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function obterClassificacoesPneus() {
    fetch("/dashboards/obterClassificacoesPneus", { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(resposta);
                plotarGraficoClasPneus(resposta)
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
    obterClassificacoesPilotos()
    obterClassificacoesCarros()
    obterClassificacoesPneus()
}, 1000);



function plotarGraficoClasPilotos(resposta) {
    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Pontuação',
            data: [],
            axis: 'y',
            borderWidth: 1,
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
        var classificacao = resposta[i];
        labels.push(classificacao.nomeSobrenome);
        dados.datasets[0].data.push(classificacao.qtdPontos);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            indexAxis: 'y',
        }
    };

    console.log(resposta);

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`chart-ranking-pilotos`),
        config,
    );
}


function plotarGraficoClasCarros(resposta) {
    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Pontuação',
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
        var classificacao = resposta[i];
        labels.push(classificacao.nomecarrofabricante);
        dados.datasets[0].data.push(classificacao.qtdPontos);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    console.log(resposta);

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`chart-ranking-carros`),
        config,
    );
}


function plotarGraficoClasPneus(resposta) {
    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Pontuação',
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
        var classificacao = resposta[i];
        labels.push(classificacao.nomePneuFabricante);
        dados.datasets[0].data.push(classificacao.qtdPontos);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    console.log(resposta);

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`chart-ranking-pneus`),
        config,
    );
}