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

//Criar cadastro de usuario

