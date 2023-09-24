
/* FORM_CHECK_ADDRESS_INFOS (FORM_INPUTS) */
const frmChkAddress = document.getElementById('frm-chk-address');
const inpChkUf = document.getElementById('inp-chk-uf');
const inpChkCidade = document.getElementById('inp-chk-cidade');
const inpChkEndereco = document.getElementById('inp-chk-endereco');
/* --- --- */

//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmUlResChkd = document.getElementById('itm-ul-res-chkd');
//

/* BUTTON_SWITCH_MODE */
// const swFrmM
// 

/* REMOVE RESULT PANEL FROM PAGE */
function showBoxResult(canShow, teste) {
    if(canShow){    
        
        teste.classList.add("visible");
        return;
    }
    teste.classList.remove("visible");
}
/* --- --- */

/* GET API FILLED INFOS */
const getAPIFilled = async(uf,cidade,endereco) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${endereco}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}
const getInfoFilled = async(uf,cidade,endereco) =>{
    const dataCep = await getAPIFilled(uf,cidade,endereco);

    if(!("erro" in dataCep)){
  
        for(var c = 0; c < dataCep.length; c++){
            
            let liRes, divRes1, ttlLblResCep, styH3ResCep,spnH3ResCep,
                ttlLblResCidade,styH3ResCidade,spnH3ResCidade,divRes2,ttlLblResBairro,
                styH3ResBairro,spnH3ResBairro,ttlLblResEndereco,styH3ResEndereco,spnH3ResEndereco,
                divRes3,ttlLblResEstado,styH3ResEstado,spnH3ResEstado,ttlLblResDDD,
                styH3ResDDD,spnH3ResDDD;

            liRes = document.createElement('li'); 
            liRes.setAttribute('id','itm-li-r-res-chkd'); /* LI (RELATIVE) */
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
            spnH3ResCep.innerText = dataCep[c]['cep'];
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
            spnH3ResCidade.innerText = dataCep[c]['localidade'];
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
            spnH3ResBairro.innerText = dataCep[c]['bairro'];
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
            spnH3ResEndereco.innerText = dataCep[c]['logradouro'];
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
            spnH3ResEstado.innerText = dataCep[c]['uf'];
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
            spnH3ResDDD.innerText =  dataCep[c]['ddd'];
            styH3ResDDD.appendChild(spnH3ResDDD); 

            showBoxResult(true,liRes);
        }

        console.log(dataCep);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}

frmChkAddress.addEventListener('submit',(event) =>{
    event.preventDefault();

    getInfoFilled(inpChkUf.value,inpChkCidade.value,inpChkEndereco.value); 
});
/* --- --- */


