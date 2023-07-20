const btn_gravar = document.querySelector("#btn_gravar");
const btn_cancelar = document.querySelector("#btn_cancelar");
const f_nome = document.querySelector("#f_nome");
const f_cel = document.querySelector("#f_cel");
const f_email = document.querySelector("#f_email");
const f_nasc = document.querySelector("#f_nasc");

btn_gravar.addEventListener("click", (evt) => {

    const dados = {
        "f_nome": f_nome.value,
        "f_cel": f_cel.value,
        "f_email": f_email.value,
        "f_nasc": f_nasc.value

    }
    const cabecalho={
        method:'POST',
        body:JSON.stringify(dados) 
    }
    const endpoint = "http://127.0.0.1:1880/addagenda"

    fetch(endpoint,cabecalho)
        .then(res =>{
            if(res.status==200){
                reset();
               
            }else{
                alert("Erro ao gravar novo contato");
            }
        })
      

});
btn_cancelar.addEventListener("click", (evt) => {
    reset();
});

const reset=()=>{
    f_nome.value="",
    f_cel.value="",
    f_email.value="",
    f_nasc.value=""

    f_nome.focus();
}