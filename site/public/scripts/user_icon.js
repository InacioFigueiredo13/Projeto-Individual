var icon_user = document.querySelector("#login_icon");
var box_login_actions = document.querySelector("#user_login_cadastro");

var btn_login = document.querySelector("#logar");
var btn_cadastrar = document.querySelector("#cadastrar");

var user_is_logged = true;
var show_box = true

icon_user.addEventListener("click", function () {
    console.log(icon_user);
    console.log(box_login_actions);

    if (show_box) {
        box_login_actions.style.display = "block";
        show_box = false;
    } else {
        box_login_actions.style.display = "none";
        show_box = true;
    }

    if (user_is_logged) {

    }

})


btn_login.addEventListener("click", function () {
    window.location.href = "./login.html"
})

btn_cadastrar.addEventListener("click", function () {
    window.location.href = "./cadastro.html"
})
