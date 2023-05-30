function toggleModalLogin() {
    var modalContainer = document.getElementById("container-modal")
    if (modalContainer.style.display == "flex") {
        modalContainer.style.display = "none"
    } else {
        modalContainer.style.display = "flex"
    }
}

function toggleModalCadastro(mensagem) {
    var modalContainerCadastro = document.getElementById("container-modal-cadastro")
    var modalTexto = document.querySelector(".modal-erro-login-txt");
    modalTexto.innerHTML = mensagem
    if (modalContainerCadastro.style.display == "flex") {
        modalContainerCadastro.style.display = "none"
    } else {
        modalContainerCadastro.style.display = "flex"
    }
}
