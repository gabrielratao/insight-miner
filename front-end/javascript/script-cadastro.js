// Mostrar formulario 
function tipoUsuario(tipo) {
    var showJudForm = document.getElementById("juridico");
    var showDepenForm = document.getElementById("juridico_dependente");
    var cad_btn = document.getElementById("cad-user")

    //Condição para mostrar formulario para conta respectiva
    if (tipo === 'conta_juridica') {
        showJudForm.style.display = "block";
        cad_btn.style.display = "block"
        showDepenForm.style.display = "none";  // Ocultar o outro formulário
    } else if (tipo === 'conta_dependente') {
        showJudForm.style.display = "none";  // Ocultar o outro formulário
        showDepenForm.style.display = "block";
        cad_btn.style.display = "block"
    }
}

//Adicionando funcionalidade aos botões
document.addEventListener("DOMContentLoaded", function() {
    var contaJud_Btn = document.getElementById("conta_juridica");
    var contaDepen_Btn = document.getElementById("conta_dependente");

    //Condição para que o botão selecionado mostre o formulario para conta respectiva 
    if (contaJud_Btn && contaDepen_Btn) {
        contaJud_Btn.addEventListener("click", function() {
            tipoUsuario('conta_juridica');
        });

        contaDepen_Btn.addEventListener("click", function() {
            tipoUsuario('conta_dependente');
        });
    }
});


async function createUserJuridico(){
    // Obter os valores dos campos do formulário jurídico
    var email = document.getElementById("jud-email").value;
    var nome = document.getElementById("jud-nome").value;
    var dtNascimento = document.getElementById("-jud-dt-Nascimento").value;
    var senha = document.getElementById("jud-senha").value;
    var nomeEmpresa = document.getElementById("nome-empresa").value;
    var tipoEmpresa = document.getElementById("tipo-empresa").value;

    // Formatar os dados em um objeto JSON
    var dadosJuridicos = {
        email: email,
        nome: nome,
        dt_nascimento: dtNascimento,
        senha: senha,
        nome_empresa: nomeEmpresa,
        tipo_empresa: tipoEmpresa
    };
    console.log(dadosJuridicos)

    // Fazer a requisição à API

    const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        dataType: "json",
        body: JSON.stringify(dadosJuridicos),
        headers: {
            "Content-Type": "application/json"
        },
    })

    const result = await response.json();

    console.log(result)

    if (result === 'Já há um dono para essa empresa'){
        alert('Já há um dono para essa empresa')
    }
    else if (result === 'Usuário menor de idade'){
        alert('Usuário menor de idade')
    }
    else{
        alert('Usuário cadastrado com sucesso')
        window.location.href = ('./userProfile.html')
    }
    // fetch('http://localhost:3000/users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify(dadosJuridicos),
    //     body: JSON.stringify(dadosJuridicos),
    //     dataType: "json"
    // })
    // .then(response => response.json())
    // .catch(error => {
    //     console.error('Erro na requisição:', error);
    // });

    
}



function createUserDependente(){
    console.log('Criar Usuario dependente')
}

function createUser(){
    // Verificar qual formulário está visível
    var judForm = document.getElementById("juridico");
    var depenForm = document.getElementById("juridico_dependente");

    if (judForm.style.display === "block") {
        // Se o formulário jurídico estiver visível, cadastrar um usuário jurídico
        createUserJuridico();
    } else if (depenForm.style.display === "block") {
        // Se o formulário dependente estiver visível, cadastrar um usuário dependente
        createUserDependente();
    }
}




//Criar cadastro de usuario depentendete


// Função para cadastrar um novo usuário dependente
// function cadastrarUsuarioDependente() {
//     console.log("Função para cadastrar usuário dependente");
// }

// // Adicionando event listener ao botão de cadastro
// var cadUserBtn = document.getElementById("cad-user");

// if (cadUserBtn) {
//     cadUserBtn.addEventListener("click", cadastrarUsuario);
// }
