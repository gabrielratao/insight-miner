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

async function readUser(){
    var email = document.getElementById('email').value

    const response = await fetch(`http://localhost:3000/users/${email}`, {
        method: "GET",
        dataType: "json"
    });

    const result = await response.json()

    if (result === 'Usuário não existe'){
        alert('Usuário não existe')
    }
    else{
        console.log(result.recordset[0].tipo)
    }
    // console.log(result)
}

// function readUser(){
//     var email = document.getElementById('email')
//     var texto = email.value
//     console.log(texto)
    
// }

// document.addEventListener('DOMContentLoaded', readUser)





// Alterar dados do usuario




//---------------------------------------------------------------
// Deletar usuario
// document.addEventListener("DOMContentLoaded", function () {

//     const btnCall = document.getElementById("DelDados");
    
//     btnCall.addEventListener('click', function() {
        

//         let senhaConfirm = prompt ("Digite sua senha para confirmar");
//         if (senhaConfirm == "senha correta") {
//             //Aqui entra a logica do delete que foi feito no back-en

//             //redireciona para a pagina de despedida
//             window.location.href = "despedida.html";
//         } else {
//             alert("Senha incorrenta. Por favor, tente novamente.")
//         }
//     })


// })

/*function deletConfirm () {
    let alert;
    let senha = prompt ("Porfavor digite sua senha para confirmar");
    if (senha == null || senha == "") {
        alert = "Senha incorreta por favor digite novamente";
    } else {
        alert = "Seus dados foram deletados com sucesso";
    }

    document.getElementById("demo").innerHTML = alert;
}*/


//---------------------------------------------------------------
//Mostrar plano do usuario



//---------------------------------------------------------------
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