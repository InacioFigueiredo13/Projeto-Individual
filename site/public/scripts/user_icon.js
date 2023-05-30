var icon_user = document.querySelector("#login_icon");
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
            box_login_actions.innerHTML = `<a href="#" id="logout">SAIR DA CONTA</a>`
            btn_logout = document.querySelector("#logout")
            btn_logout.addEventListener("click", function () {
                sessionStorage.clear()
                window.location.href = "./index.html"
            })
        }
        show_box = false;
    } else {
        box_login_actions.style.display = "none";
        show_box = true;
    }
})


btn_login.addEventListener("click", function () {
    window.location.href = "./login.html"
})

btn_cadastrar.addEventListener("click", function () {
    window.location.href = "./cadastro.html"
})