// Mostrar dados do usuario
/*document.addEventListener("DOMContentLoaded", function() {
    // Fazer uma solicitação GET à API
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => {
            // Lidar com os dados da API e preencher a lista
            preencherListaUsuario(data);
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });

    // Função para preencher a lista de detalhes do usuário
    function preencherListaUsuario(usuario) {
        var userDetailsList = document.getElementById("user-details");

        // Limpar a lista antes de preenchê-la
        userDetailsList.innerHTML = "";

        // Verificar se há dados do usuário
        if (usuario) {
            // Adicionar itens à lista com os detalhes do usuário
            for (var chave in usuario) {
                var itemLista = document.createElement("li");
                itemLista.textContent = `${chave}: ${usuario[chave]}`;
                userDetailsList.appendChild(itemLista);
            }
        } else {
            // Se não houver dados do usuário, exibir uma mensagem ou realizar outra ação
            var mensagemSemDados = document.createElement("li");
            mensagemSemDados.textContent = "Nenhum dado do usuário disponível.";
            userDetailsList.appendChild(mensagemSemDados);
        }
    }
}); */

// Mostrar dados do usuário

function readUser(){
    
}

// function readUser(){
//     var email = document.getElementById('email')
//     var texto = email.value
//     console.log(texto)
    
// }

// document.addEventListener('DOMContentLoaded', readUser)





// Alterar dados do usuario



// Deletar usuario


//Mostrar plano do usuario


//Ir para pagina de planos
function redirecionarPlanos() {
    // variavel com a url da pagina
    var plan = "planos.html";
    
    // Redirecionamento para pagina cadastro
    window.location.href = plan;
}

// Configurando evento do botão
function eventoPlanos() {
    // Obtendo o elemento do botão pelo ID
    var btnPlan = document.getElementById("btn-plano");

    // Adicionando o evento de clique ao botão
    btnPlan.addEventListener("click", redirecionarPlanos);
}

// Chamando a função para configurar o evento ao carregar a página
window.onload = eventoPlanos;