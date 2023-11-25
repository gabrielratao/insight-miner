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

//------------------------------------------------------------------------------------------
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

        if (email !== ''){
            console.log(result.recordset[0])

            var form = document.getElementById('profileForm')
            var nome = document.getElementById('jud-nome')
            var senha = document.getElementById('jud-senha')
            var empresa = document.getElementById('nome-empresa')
            var tipo = document.getElementById('tipo-empresa')
            var dt_nascimento = document.getElementById('jud-dt-Nascimento')
            var btn_alterar_dado = document.getElementById('alterar-dado')
            var btn_deletar_dado = document.getElementById('deletar-dado')
            var text_inical_plano = document.getElementById('info-inicial-plano')
            var tipo_plano = document.getElementById('tipo-plano')
            var limite_plano = document.getElementById('limite-plano')
    
            form.style.display = 'Block'
            btn_alterar_dado.style.display = 'Block'
            btn_deletar_dado.style.display = 'Block'
            senha.type = 'text'
            text_inical_plano.style.display = 'none'

            nome.value = result.recordset[0].nome
            senha.value = result.recordset[0].senha
            empresa.value = result.recordset[0].empresa
            tipo.value = result.recordset[0].tipo
            dt_nascimento.value = result.recordset[0].dt_nascimento.slice(0, 10)


            //mostrar o tipo de plano
            const response2 = await fetch(`http://localhost:3000/users/plano/${email}`, {
                method: "GET",
                dataType: "json"
            });

            const result2 = await response2.json()

            tipo_plano.textContent = 'Plano: ' + result2.recordset[0].tipo
            tipo_plano.style.display = 'Block'
            limite_plano.textContent = 'Limite usuários: ' + result2.recordset[0].limite_usuarios
            limite_plano.style.display = 'Block'

        }
  
    }
    // console.log(result)
}


//------------------------------------------------------------------------------------------
// Alterar usuario 
async function alterUser(){
    var email = document.getElementById('email').value
    var nome_usuario = document.getElementById('jud-nome').value
    var dt_nascimento = document.getElementById('jud-dt-Nascimento').value
    var senha = document.getElementById('jud-senha').value
    var nome_empresa = document.getElementById('nome-empresa').value
    var ramo_empresa = document.getElementById('tipo-empresa').value

    var data = {
        email: email,
        nome_usuario: nome_usuario,
        dt_nascimento: dt_nascimento,
        senha: senha,
        nome_empresa: nome_empresa,
        ramo_empresa: ramo_empresa
    }
    // console.log(data)
    const response = await fetch(`http://localhost:3000/users`, {
        method: "PUT",
        dataType: "json",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    });

    const result = await response.json()

    console.log(result)
    if (result === 'Usuário não existe'){
        alert('Usuário não existe')
    }
    else if (result === 'Usuário menor de idade'){
        alert('Usuário menor de idade')
    }
    else{
        alert('Usuário alterado com sucesso')
    }
    // if (result.rowsAffected[0] === 1){
    //     console.log('Usuario alterado com sucesso')
    // }
}



//------------------------------------------------------------------------------------------
// Deletar usuario
async function deleteUser() {

    var email = document.getElementById('email').value
    
    const response = await fetch(`http://localhost:3000/users/${email}`, {
                method: "DELETE",
                dataType: "json"
            });
    const result = await response.json()

    console.log(result)
    if (result === 'Usuário não existe'){
        alert('Usuário não existe')
    }
    else{
        alert('Usuário deletado com sucesso')
    }
    
}   



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