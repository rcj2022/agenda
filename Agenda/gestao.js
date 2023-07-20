const fundopopup = document.querySelector("#fundopopup");
const btn_gravar = document.querySelector("#btn_gravar");
const btn_cancelar = document.querySelector("#btn_cancelar");
const dados = document.querySelector("#dados");
const f_id = document.querySelector("#f_id");
const f_nome = document.querySelector("#f_nome");
const f_cel = document.querySelector("#f_cel");
const f_email = document.querySelector("#f_email");
const f_nasc = document.querySelector("#f_nasc");


btn_gravar.addEventListener("click", (evt) => {
    fundopopup.classList.add("ocultar");
    const endpoint = `http://127.0.0.1:1880/atualizarAgenda/${f_id.value}/${f_nome.value}/${f_cel.value}/${ f_email.value}/${f_nasc.value}`;
    fetch(endpoint)
    .then(res=>{
        if(res.status==200){
            alert("Dados atualizados com sucesso!");
            preencherdgv();
        }else{
            alert("Erro ao atualizar!");
        }

    })

});
btn_cancelar.addEventListener("click", (evt) => {
    fundopopup.classList.add("ocultar");

});

const preencherdgv = () => {
    dados.innerHTML = "";
    const endpoint = `http://127.0.0.1:1880/pesquisartodasagenda`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {

            dados.innerHTML = "";

            res.forEach((el) => {
                const linha = document.createElement("div");
                linha.setAttribute("class", "linhasdados");

                const c1 = document.createElement("div");
                c1.setAttribute("class", "coluna c1");
                c1.innerHTML = el.id_cont;
                linha.appendChild(c1);

                const c2 = document.createElement("div");
                c2.setAttribute("class", "coluna c2");
                c2.innerHTML = el.nome;
                linha.appendChild(c2);

                const c3 = document.createElement("div");
                c3.setAttribute("class", "coluna c3");
                c3.innerHTML = el.cel;
                linha.appendChild(c3);

                const c4 = document.createElement("div");
                c4.setAttribute("class", "coluna c4");
                c4.innerHTML = el.email;
                linha.appendChild(c4);

                const c5 = document.createElement("div");
                c5.setAttribute("class", "coluna c5");
                c5.innerHTML = el.nasc.split("T")[0];
                linha.appendChild(c5);

                const c6 = document.createElement("div");
                c6.setAttribute("class", "coluna c6 c_op");
                const imgdelete = document.createElement("img");
                imgdelete.setAttribute("src", "delete.svg");
                imgdelete.setAttribute("class", "iconeop");
                imgdelete.addEventListener("click", (evt) => {
                    // console.log(evt.target.parentNode.parentNode.firstChild.innerHTML);
                    removerContato(evt.target.parentNode.parentNode.firstChild.innerHTML);

                });
                const imgeditar = document.createElement("img");
                imgeditar.setAttribute("src", "edit.svg")
                imgeditar.setAttribute("class", "iconeop")
                imgeditar.addEventListener("click", (evt) => {

                    fundopopup.classList.remove("ocultar");
                    const dados = evt.target.parentNode.parentNode.childNodes;

                    f_id.value=dados[0].innerHTML;
                    f_nome.value=dados[1].innerHTML; 
                    f_cel.value=dados[2].innerHTML;
                    f_email.value=dados[3].innerHTML;
                    f_nasc.value=dados[4].innerHTML.split("T")[0];
                                        
                });
                linha.appendChild(c6);
                c6.appendChild(imgdelete);
                c6.appendChild(imgeditar);
                dados.appendChild(linha);


            })
            // console.log(res);
        })

};
preencherdgv();

const removerContato = (id) => {
    const endpoint = `http://127.0.0.1:1880/deleteagenda/${id}`;
    fetch(endpoint)
        .then(res => {
            if (res.status == 200) {
                preencherdgv();

            }
        })
}