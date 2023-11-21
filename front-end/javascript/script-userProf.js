// Mostrar dados do usuario
document.addEventListener("DOMContentLoaded", function() {
    // Fazer uma solicitação GET à API (substitua 'sua_api_aqui' pela URL real da sua API)
    fetch('http://localhost:3000/sua_api_aqui')
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
});
// Alterar dados do usuario



// Deletar usuario



//Ir para pagina de planos