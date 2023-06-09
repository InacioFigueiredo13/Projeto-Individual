var icon_user = document.querySelector("#login_icon");
var icon_agenda = document.querySelector("#agenda_icon")
var box_login_actions = document.querySelector("#user_login_cadastro");

var btn_login = document.querySelector("#logar");
var btn_cadastrar = document.querySelector("#cadastrar");
var btn_logout = "";

var user_is_logged = sessionStorage.ID_USUARIO > 0;
var show_box = true

icon_user.addEventListener("click", function () {
    if (show_box) {
        box_login_actions.style.display = "block";
        if (user_is_logged) {
            box_login_actions.innerHTML = `<a href="#" class="btn_sair" id="logout">SAIR DA CONTA</a>`
            btn_logout = document.querySelector("#logout")
            btn_logout.addEventListener("click", function () {
                sessionStorage.clear();
                window.location.reload();
            })
        }
        show_box = false;
    } else {
        box_login_actions.style.display = "none";
        show_box = true;
    }
})

var agenda_usuario = document.querySelector("#agenda_eventos")
var show_agenda = true;
icon_agenda.addEventListener("click", function () {
    if (!user_is_logged) {
        if (show_agenda) {
            agenda_usuario.style.display = "block";
            agenda_usuario.innerHTML =
                `
                <p class="text-nenhum-evento">Faça login para marcar eventos na sua agenda!</p>
            `
            show_agenda = false;
        } else {
            agenda_usuario.style.display = "none";
            show_agenda = true;
        }

    } else {
        if (show_agenda) {
            agenda_usuario.style.display = "block";
            //função para pegar todos os eventos do usuário e adicionar na agenda - path: scripts/eventos/eventos.js
            setTimeout(() => {
                adicionarEventoAgenda();
            }, 1000);
            show_agenda = false;
        } else {
            agenda_usuario.style.display = "none";
            show_agenda = true;
        }
    }
})

btn_login.addEventListener("click", function () {
    window.location.href = "./login.html";
})

btn_cadastrar.addEventListener("click", function () {
    window.location.href = "./cadastro.html";
})

// Função que salva as informações e plota os eventos do usuário na agenda
function adicionarEventoAgenda() {
    document.getElementById("agenda_eventos").innerHTML = "";
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dataAtual = new Date();

    var idUsuario = sessionStorage.getItem("ID_USUARIO")

    fetch(`/eventos/eventosUsuario/detalhes/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                document.getElementById("agenda_eventos").innerHTML = `
                    <p class="text-nenhum-evento">Nenhum Evento marcado <br>
                        <a href="./eventos.html" class="eventos-link">Acesse a página de eventos e marque algum!</a>
                    </p>
                `;
                return false;
            }
            resposta.json().then(eventos => {
                console.log(eventos);
                for (let i = 0; i < eventos.length; i++) {
                    const evento = eventos[i];

                    var dataEvento = new Date(evento.data);

                    var dia = dataEvento.getDate();
                    var mes = nomeMeses[dataEvento.getMonth()];
                    var ano = dataEvento.getFullYear();

                    var dataFormatada = `${dia} DE ${mes}, ${ano}`;

                    var mesesRestantes = dataEvento - dataAtual;
                    var diasRestantes = mesesRestantes / (1000 * 60 * 60 * 24);

                    var classeDiasRestantes;
                    if (diasRestantes < 0) {
                        classeDiasRestantes = "agenda-evento-dias-late";
                    } else {
                        classeDiasRestantes = "agenda-evento-dias";
                    }

                    document.getElementById("agenda_eventos").innerHTML +=
                        `
                    <div class="agenda-card-evento">
                        <div class="agenda-evento-img">
                            <img src="${evento.logoEvento}" alt="Logo do Evento">
                        </div>
                        <div class="agenda-card-evento-infos">
                            <p class="agenda-evento-title">${evento.descricao}</p>
                            <p class="agenda-evento-localizacao">${evento.localizacao}</p>
                            <hr>
                            <div class="agenda-horario">
                                <div class="data">
                                    <i class="fa-solid fa-clock" style="color: #B73E3E; align-self: center;"></i>
                                    <p class="agenda-evento-data">${dataFormatada}</p>
                                </div>
                                <p class="${classeDiasRestantes}">${parseInt(diasRestantes)} dias restantes até o evento</p>
                            </div>
                        </div>
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