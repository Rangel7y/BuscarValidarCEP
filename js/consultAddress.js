
/* GET PANEL FORM TO FILL INFOS */
const form2Content = document.getElementById('form2-content');
const inputFillAll = document.querySelectorAll('.input-find-cep');
const inputFillUf = document.querySelector('.input-fill-uf');
const inputFillCidade = document.querySelector('.input-fill-cidade');
/* const inputFillBairro = document.querySelector('.input-fill-bairro'); */
const inputFillRua = document.querySelector('.input-fill-rua');
/* --- --- */

//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmUlResChkd = document.getElementById('itm-ul-res-chkd');
//

/* GET API FILLED INFOS */
const getAPIFilled = async(uf,cidade,rua) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
const getInfoFilled = async(uf,cidade,rua) =>{
    const data = await getAPIFilled(uf,cidade,rua);

    if(!("erro" in data)){
        showBoxResult(true);
  
        for(var c = 0; c < dataCep.length; c++){
            let address = dataCep[c]['cep'] + dataCep[c]['ddd'] +
            dataCep[c]['localidade'] + dataCep[c]['uf'] + 
            dataCep[c]['bairro'] + dataCep[c]['logradouro'];

            let liRes, divRes1, ttlLblResCep, styH3ResCep,spnH3ResCep,
                ttlLblResCidade,styH3ResCidade,spnH3ResCidade,divRes2,ttlLblResBairro,
                styH3ResBairro,spnH3ResBairro,ttlLblResEndereco,styH3ResEndereco,spnH3ResEndereco,
                divRes3,ttlLblResEstado,styH3ResEstado,spnH3ResEstado,ttlLblResDDD,
                styH3ResDDD,spnH3ResDDD;

            liRes = document.createElement('li'); 
            itmUlResChkd.appendChild(liRes);

            divRes1 = document.createElement('div');
            liRes.appendChild(divRes1);


            ttlLblResCep = document.createElement('label');
            ttlLblResCep.setAttribute('for', 'Cep');
            ttlLblResCep.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResCep.innerText = "CEP";
            divRes1.appendChild(ttlLblResCep);

            styH3ResCep = document.createElement('h3');
            divRes1.appendChild(styH3ResCep);
            styH3ResCep.setAttribute('name','Cep');
            styH3ResCep.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResCep = document.createElement('span');
            styH3ResCep.appendChild(spnH3ResCep);

            ttlLblResCidade = document.createElement('label');
            ttlLblResCidade.setAttribute('for', 'Cidade');
            ttlLblResCidade.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResCidade.innerText = "CIDADE";
            divRes1.appendChild(ttlLblResCidade);

            //
            styH3ResCidade = document.createElement('h3');
            divRes1.appendChild(styH3ResCidade);
            styH3ResCidade.setAttribute('name','Cidade');
            styH3ResCidade.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResCidade = document.createElement('span');
            styH3ResCidade.appendChild(spnH3ResCidade);

            divRes2 = document.createElement('div');
            liRes.appendChild(divRes2);

            ttlLblResBairro = document.createElement('label');
            ttlLblResBairro.setAttribute('for', 'Bairro');
            ttlLblResBairro.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResBairro.innerText = "BAIRRO";
            divRes2.appendChild(ttlLblResBairro);

            styH3ResBairro = document.createElement('h3');
            divRes2.appendChild(styH3ResBairro);
            styH3ResBairro.setAttribute('name','Bairro');
            styH3ResBairro.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResBairro = document.createElement('span');
            styH3ResBairro.appendChild(spnH3ResBairro);

            ttlLblResEndereco = document.createElement('label');
            ttlLblResEndereco.setAttribute('for', 'Endereco');
            ttlLblResEndereco.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResEndereco.innerText = "ENDEREÇO";
            divRes2.appendChild(ttlLblResEndereco);

            styH3ResEndereco = document.createElement('h3');
            divRes2.appendChild(styH3ResEndereco);
            styH3ResEndereco.setAttribute('name','Endereco');
            styH3ResEndereco.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResEndereco = document.createElement('span');
            styH3ResEndereco.appendChild(spnH3ResEndereco);

            divRes3 = document.createElement('div');
            liRes.appendChild(divRes3);

            ttlLblResEstado = document.createElement('label');
            ttlLblResEstado.setAttribute('for', 'Estado');
            ttlLblResEstado.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResEstado.innerText = "ESTADO";
            divRes3.appendChild(ttlLblResEstado);

            styH3ResEstado = document.createElement('h3');
            divRes3.appendChild(styH3ResEstado);
            styH3ResEstado.setAttribute('name','Estado');
            styH3ResEstado.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResEstado = document.createElement('span');
            styH3ResEstado.appendChild(spnH3ResEstado);

            ttlLblResDDD = document.createElement('label');
            ttlLblResDDD.setAttribute('for', 'DDD');
            ttlLblResDDD.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResDDD.innerText = "DDD";
            divRes3.appendChild(ttlLblResDDD);

            styH3ResDDD = document.createElement('h3');
            divRes3.appendChild(styH3ResDDD);
            styH3ResDDD.setAttribute('name','DDD');
            styH3ResDDD.setAttribute('class','sty-h3-itm-res-chkd');

            spnH3ResDDD = document.createElement('span');
            styH3ResDDD.appendChild(spnH3ResDDD); 
        }

        console.log(data);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}

form2Content.addEventListener('submit',(event) =>{
    event.preventDefault();

    getInfoFilled(inputFillUf.value,inputFillCidade.value,inputFillRua.value); 
});
/* --- --- */

/* REMOVE RESULT PANEL FROM PAGE */
function showBoxResult(canShow) {
    if(canShow){    
        itmResChkd.classList.add("visible");
        return;
    }
    itmResChkd.classList.remove("visible");
}
/* --- --- */