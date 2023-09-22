
//-- GET DOCUMENT ELEMENTS  --//
// --- --- //

//-- FORM_CONTENT_CHECK_CEP (FRM_CNT_CHK_CEP) --//
const frmCntChkCep = document.getElementById("frm-cnt-chk-cep");
const inpChkCep = document.getElementById("inp-chk-cep");
//

//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmUlResChkd = document.getElementById('itm-ul-res-chkd');
//

//-- DEFAULT DATA  --//
const appCepId = '45993135';
//
// --- --- //

//-- FUNCTION TO TRY_CONNECTION WITH API (CHECK CEP ID) --//
const checkCepOnAPI = async(cepId) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${cepId}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}
//

//-- BUTTON/INPUT FORM_CONTENT_CHECK_CEP --//
inpChkCep.addEventListener('input', (event) => {
    // Remove any non-numeric characters from the input
    event.target.value = event.target.value.replace(/\D/g, '');
});
frmCntChkCep.addEventListener('submit',(event) =>{
    event.preventDefault();

    let searchInput = inpChkCep.value.trim();
    if(/^\d{8}$/.test(searchInput)){
        checkCEP(inpChkCep.value);
    }
    else{
        showBoxResult(false);

        console.error("Digite o número do CEP para buscar!");
    }
});
//

//-- FUNCTION TO REMOVE PANEL RESULT FROM PAGE --//
function showBoxResult(canShow) {
    if(canShow){    
        itmResChkd.classList.add("visible");
        return;
    }
    itmResChkd.classList.remove("visible");
}
//

//-- FUNCTION TO GET RESULT TRY_CONNECTION AND SHOW RESULT DATA_CEP --//
const checkCEP = async(cepId) =>{
    const dataCep = await checkCepOnAPI(cepId);

    if(!("erro" in dataCep)){

        /* showBoxResult(true); */

        for(var c = 0; c < dataCep.length; c++){
            let address = dataCep[c]['cep'] + dataCep[c]['ddd'] +
            dataCep[c]['localidade'] + dataCep[c]['uf'] + 
            dataCep[c]['bairro'] + dataCep[c]['logradouro'];

            let liRes, divRes1, ttlLblResCep, styH3ResCep,
                ttlLblResCidade,styH3ResCidade,divRes2,ttlLblResBairro,
                styH3ResBairro,ttlLblResEndereco,styH3ResEndereco,
                divRes3,ttlLblResEstado,styH3ResEstado,ttlLblResDDD,
                styH3ResDDD;

            liRes = document.createElement('li'); 
            itmUlResChkd.appendChild(liRes);

            divRes1 = document.createElement('div');
            liRes.appendChild(divRes1);


            ttlLblResCep = document.createElement('label');
            ttlLblResCep.setAttribute('for', 'Cep');
            ttlLblResCep.setAttribute('class','ttl-lbl-res-chkd');
            ttlLblResCep.innerText = "CEP";
            divRes1.appendChild(ttlLblResCep);
        }

        console.log(dataCep);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}
//
