//pegando parametros da página, enviados quando clica no card do piloto
const paramKeys = window.location.search;
const urlParams = new URLSearchParams(paramKeys);

var idPiloto = urlParams.get("id");
var idUsuario = sessionStorage.getItem("ID_USUARIO");


//função para adicionar as informações do piloto na tela
function buscarInfosPiloto() {
    fetch(`/pilotos/detalhesPiloto/${idPiloto}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(infosPiloto => {
                infosPiloto.forEach(infosPiloto => {
                    document.getElementById("posicao-piloto").innerHTML = infosPiloto.posicao;
                    document.getElementById("foto-piloto").setAttribute("src", infosPiloto.fotoPiloto);
                    document.getElementById("nome").innerHTML = infosPiloto.nome;
                    document.getElementById("img-bandeira").setAttribute("src", infosPiloto.pilotoBandeira);
                    document.getElementById("idade").innerHTML = infosPiloto.idade;
                    document.getElementById("time-nome").innerHTML = infosPiloto.time;
                    document.getElementById("fab-carro").innerHTML = infosPiloto.carroFab;
                    document.getElementById("fab-pneu").innerHTML = infosPiloto.pneuFab;
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

// função que verifica se o usuário já deu like no piloto
var deuLike = false;
function pesquisarLike() {
    fetch(`/pilotos/toggleLike/pesquisarLike/${idPiloto}/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                deuLike = false
            } else {
                deuLike = true;
                changeLikeBtn(deuLike);
            }
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

//chamando as funções de pesquisas
buscarInfosPiloto();
pesquisarLike()

var likeBtn = document.getElementById("btn_like");

likeBtn.addEventListener("click", function () {
    toggleLike(idPiloto, idUsuario, deuLike)
})

// função para verificar dar like ou retirar o like
function toggleLike(idPiloto, idUsuario, darLike) {
    if (!idUsuario) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            iconColor: '#DD5353',
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            footer: `<a href="./login.html" class="footer-toast-alert">FAZER LOGIN OU CADASTRO</a>`
        })

        Toast.fire({
            icon: 'error',
            title: '<span class="title-toast-alert">Não é possível dar gostei sem fazer login antes!</span>'
        })
    } else if (!darLike) {
        fetch(`/pilotos/toggleLike/darLike/${idPiloto}/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                deuLike = true;
                changeLikeBtn(deuLike)
            } else {
                throw ("Houve um erro ao tentar dar like!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    } else {
        fetch(`/pilotos/toggleLike/tirarLike/${idPiloto}/${idUsuario}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            if (resposta.ok) {
                deuLike = false;
                changeLikeBtn(deuLike)
            } else if (resposta.status == 404) {
                window.alert("Oops, algo deu errado, por favor tente novamente!");
            } else {
                throw ("Houve um erro ao tentar tirar o like: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

// função que troca a imagem do btnLike 
function changeLikeBtn(deuLike) {
    if (deuLike) {
        likeBtn.setAttribute("src", "./assets/estrela-marked.png")
        likeBtn.classList.remove('btn-like')
        likeBtn.classList.add('like')
    } else {
        likeBtn.setAttribute("src", "./assets/estrela.png")
        likeBtn.classList.remove('like')
        likeBtn.classList.add('btn-like')
    }
}