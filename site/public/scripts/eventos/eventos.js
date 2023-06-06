var idUsuario = sessionStorage.getItem("ID_USUARIO")

var listaEventosUsuario = [];

function obterEventosUsuario(idUsuario) {
    fetch(`/eventos/eventosUsuario/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(eventos => {
                for (let i = 0; i < eventos.length; i++) {
                    const evento = eventos[i];
                    listaEventosUsuario.push(evento.fkEvento)
                }
            });
        } else {
            console.log("Houve um erro ao tentar listar os eventos");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

function obterListaEventos() {
    fetch(`/eventos/listarEventos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

            resposta.json().then(eventos => {

                for (let i = 0; i < eventos.length; i++) {
                    const evento = eventos[i];
                    var dataEvento = new Date(evento.data);

                    var dia = dataEvento.getDate();
                    var mes = nomeMeses[dataEvento.getMonth()];
                    var ano = dataEvento.getFullYear();

                    var dataFormatada = `${dia} DE ${mes}, ${ano}`

                    var btnClass = "";

                    if (listaEventosUsuario.indexOf(evento.idEvento) == -1) {
                        btnClass = "btn-marcar";
                        textBtn = "MARCAR"
                    } else {
                        textBtn = "MARCADO"
                        btnClass = "btn-marcado";
                    }

                    document.getElementById("carousel_slides").innerHTML +=
                        `
                        <div class="evento-card-container">
                            <div class="barra-lado"></div>
                            <div class="evento-card">
                                <img class="evento-logo" src="${evento.logoEvento}" alt="DMGP LOGO">
                                <div class="round-localizacao">
                                    <span class="span-rodada">${evento.descricao}</span>
                                    <div class="localizacao-container">
                                        <img class="localizacao-img" src="${evento.bandeiraPais}" alt="Bandeira País">
                                        <span class="span-localizacao">${evento.localizacao}</span>
                                    </div>
                                </div>
                                <p class="data-hora-evento">${dataFormatada}</p>
                                <button class="${btnClass}" id="btn-marcar-${evento.idEvento}" onclick="toggleMarcarEvento(${evento.idEvento})">${textBtn}</button>
                            </div>
                            <div class="barra-lado"></div>
                        </div>    
                        `
                }

            });
        } else {
            console.log("Houve um erro ao tentar listar os eventos");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}


setTimeout(() => {
    obterEventosUsuario(idUsuario);
    obterListaEventos();
}, 1000);

function toggleMarcarEvento(idEvento) {
    var idEvento = idEvento;
    if (listaEventosUsuario.indexOf(idEvento) == -1) {
        marcarEvento(idEvento);
    } else {
        desmarcarEvento(idEvento);
    }
}


function marcarEvento(idEvento) {
    fetch(`/eventos/marcarEvento/${idUsuario}/${idEvento}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            listaEventosUsuario.push(idEvento)
            console.log(listaEventosUsuario);
            changeBtn(idEvento, true);
        } else {
            throw (`Houve um erro ao tentar marcar o evento ${idEvento}!`);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function desmarcarEvento(idEvento) {
    fetch(`/eventos/desmarcarEvento/${idUsuario}/${idEvento}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            const index = listaEventosUsuario.indexOf(idEvento);
            listaEventosUsuario.splice(index, 1);
            console.log(listaEventosUsuario);
            changeBtn(idEvento, false)
        } else if (resposta.status == 404) {
            window.alert("Oops, algo deu errado, por favor tente novamente!");
        } else {
            throw ("Houve um erro ao tentar tirar o like: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function changeBtn(idEvento, change) {
    var btn = document.getElementById(`btn-marcar-${idEvento}`);
    if (change) {
        btn.classList.remove("btn-marcar")
        btn.classList.add("btn-marcado")
        btn.innerHTML = "MARCADO"
    } else {
        btn.classList.remove("btn-marcado")
        btn.classList.add("btn-marcar")
        btn.innerHTML = "MARCAR"
    }
}