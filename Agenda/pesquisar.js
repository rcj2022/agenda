const btn_pesq=document.querySelector("#btn_pesq");
const f_txtpesq=document.querySelector("#f_txtpesq");
const dados=document.querySelector("#dados");

btn_pesq.addEventListener("click",(evt)=>{
    dados.innerHTML="";
    const valorPesq=f_txtpesq.value;
    if(valorPesq==""){
        alert("Digite a pesquisa");
        f_txtpesq.focus();
        return;
    }
    const f_pesq=document.querySelector("input[name=f_pesq]:checked").value;
    const endpoint=`http://127.0.0.1:1880/pesquisaragenda/${f_pesq}/${valorPesq}`;
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{

        dados.innerHTML="";

        res.forEach((el)=>{
           const linha=document.createElement("div");
           linha.setAttribute("class","linhasdados");

           const c1=document.createElement("div");
           c1.setAttribute("class","coluna c1");
           c1.innerHTML=el.id_cont;
           linha.appendChild(c1);

           const c2=document.createElement("div");
           c2.setAttribute("class","coluna c2");
           c2.innerHTML=el.nome;
           linha.appendChild(c2);

           const c3=document.createElement("div");
           c3.setAttribute("class","coluna c3");
           c3.innerHTML=el.cel;
           linha.appendChild(c3);

           const c4=document.createElement("div");
           c4.setAttribute("class","coluna c4");
           c4.innerHTML=el.email;
           linha.appendChild(c4);

           const c5=document.createElement("div");
           c5.setAttribute("class","coluna c5");
           c5.innerHTML=el.nasc;
           linha.appendChild(c5);

           dados.appendChild(linha);


        })
        // console.log(res);
    })

});
