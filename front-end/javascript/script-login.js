//Realizando login na plataforma
/*function realizarLogin() {
    var email_login = document.getElementById("email-login").value;
    var senha_login = document.getElementById("password-login").value;
    
    var data = {
        email_login: email_login,
        senha_login: senha_login
    }

    fetch ('http://localhost:3000/sua_api_aqui', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }) */


//Redireciona para pagina cadastro
function redirecionarCadastro() {
    // variavel com a url da pagina
    var cad = "cadastro.html";
    
    // Redirecionamento para pagina cadastro
    window.location.href = cad;
}

// Configurando evento do botão
function eventoCadastro() {
    // Obtendo o elemento do botão pelo ID
    var botao = document.getElementById("signin");

    // Adicionando o evento de clique ao botão
    botao.addEventListener("click", redirecionarCadastro);
}

// Chamando a função para configurar o evento ao carregar a página
window.onload = eventoCadastro;


