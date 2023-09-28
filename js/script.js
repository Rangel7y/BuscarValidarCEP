/* SCRIPT - CONSULT CEP AND CONSULT ADDRESS */
// --- --- //

//-- GET DOCUMENT ELEMENTS  --//
// --- --- //
//-- FORM_CONTENT_CHECK_CEP (FRM_CNT_CHK_CEP) --//
const frmChkCep = document.getElementById('frm-chk-cep');
const inpChkCep = document.getElementById('inp-chk-cep');
//
//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmLiFResChkd = document.getElementById('itm-li-f-res-chkd');
//
//-- ITEMS_RESULT (SPAN) (FIXED) --//
const itmResCep = document.getElementById('itm-res-cep');
const itmResCidade = document.getElementById('itm-res-cidade');
const itmResBairro = document.getElementById('itm-res-bairro');
const itmResEndereco = document.getElementById('itm-res-endereco');
const itmResEstado = document.getElementById('itm-res-estado');
const itmResDDD = document.getElementById('itm-res-ddd');
//
// --- --- //
//
//-- FORM_CHECK_ADDRESS_INFOS (FORM_INPUTS) --//
const frmChkAddress = document.getElementById('frm-chk-address');
const inpChkUf = document.getElementById('inp-chk-uf');
const inpChkCidade = document.getElementById('inp-chk-cidade');
const inpChkEndereco = document.getElementById('inp-chk-endereco');
//
//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmUlResChkd = document.getElementById('itm-ul-res-chkd');
//
//-- BUTTON_SWITCH_MODE (SWITCH) --//
const swFrmMd = document.getElementById('sw-frm-md');
//  
//-- TYPES_SWITCH_FORM_MODE --//
const typeSwFrmMd = {
    typeFrmChkCep: "typeFrmChkCep",
    typeFrmChkAddress: "typeFrmChkAddress"
};
let currentTypeSwFrmMd = typeSwFrmMd.typeFrmChkCep;
//

// -- TITLE_PANEL_FORM_CONTENT (TITLE H1) -- //
const ttlPnlFrm = document.getElementById('ttl-pnl-frm');
//

// -- SECTION_TEXT1DESCRIPTION_FORM_CHECK (TEXT1 H2)
const secTxt1FrmChk = document.getElementById('sec-text1-frm-chk');
//
// -- SECTION_TEXT2DESCRIPTION_FORM_CHECK (TEXT2 H2)
const secTxt2FrmChk = document.getElementById('sec-text2-frm-chk');
//

// -- PANEL_RESULT_CEP_ADDRESS -- //
const pnlResCepAddress = document.getElementById('pnl-res-cep-address');
// 

// -- BLOCK FLOOD REQUESTS -- //
let currentReqCep = "";
let currentReqUf = "";
let currentReqCidade = "";
let currentReqEndereco = "";
//


/* SHOW/HIDE ITEM FROM PAGE */
function showHideItmPg(itmShowHide, typeItmDisplay, typeEffectFade) {
    itmShowHide.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';

    if(typeEffectFade === "in") {
        itmShowHide.style.opacity = '1';
        itmShowHide.style.transform = 'scale(1)';
    }else if (typeEffectFade === "out") {
        itmShowHide.style.opacity = '0';
        itmShowHide.style.transform = 'scale(0.8)';
    }
    setTimeout(() => {
        itmShowHide.style.display = typeItmDisplay;
    }, 500);
}
/* --- --- */

//-- FUNCTION TO TRY_CONNECTION WITH API (CHECK_CEP) --//
const checkCepOnAPI = async(cepId) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${cepId}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}
//
//-- FUNCTION TO GET RESULT TRY_CONNECTION AND SHOW RESULT DATA_CEP --//
const checkCEP = async(cepId) =>{
    /* if(cepId == currentReqCep){
        return console.log("ERROR");
    } */

    const dataCep = await checkCepOnAPI(cepId);

    if(!("erro" in dataCep)){

        currentReqCep = dataCep.cep;
        console.log(currentReqCep);

        showHideItmPg(pnlResCepAddress,"flex","in");
        showHideItmPg(itmLiFResChkd, "flex","in");

        itmResCep.innerText = dataCep.cep;
        itmResCidade.innerText = dataCep.localidade;
        itmResBairro.innerText = dataCep.bairro;
        itmResEndereco.innerText = dataCep.logradouro;
        itmResEstado.innerText = dataCep.uf;
        itmResDDD.innerText = dataCep.ddd;

        console.log(dataCep);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}
//

//-- FUNCTION TO TRY_CONNECTION WITH API (CHECK_ADDRESS) --//
const getAPIFilled = async(uf,cidade,endereco) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${endereco}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}
//
//-- FUNCTION TO GET RESULT TRY_CONNECTION AND SHOW RESULT DATA_ADDRESS --//
const getInfoFilled = async(uf,cidade,endereco) =>{
    
    if(uf == currentReqUf && cidade == currentReqCidade && endereco == currentReqEndereco){
        return;
    }

    const dataCep = await getAPIFilled(uf,cidade,endereco);

    if(!("erro" in dataCep)){
  
        currentReqUf = dataCep.uf;
        currentReqCidade = dataCep.localidade;
        currentReqEndereco = dataCep.logradouro;

        for(var c = 0; c < dataCep.length; c++){
            
            let liRes, divRes1, ttlLblResCep, styH3ResCep,spnH3ResCep,
                ttlLblResCidade,styH3ResCidade,spnH3ResCidade,divRes2,ttlLblResBairro,
                styH3ResBairro,spnH3ResBairro,ttlLblResEndereco,styH3ResEndereco,spnH3ResEndereco,
                divRes3,ttlLblResEstado,styH3ResEstado,spnH3ResEstado,ttlLblResDDD,
                styH3ResDDD,spnH3ResDDD;

            liRes = document.createElement('li'); 
            liRes.setAttribute('id','itm-li-r-res-chkd'); /* LI (RELATIVE) */
            liRes.setAttribute('class', 'itm-li-r-res-chkd-del') /* LI (CLASS USED TO DELETE WHEN SW_BTN) */
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

            showHideItmPg(liRes, "flex");
        }

        console.log(dataCep);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}
//

//-- INPUT FORM_CHECK_CEP --//
inpChkCep.addEventListener('input', (event) => {
    // Remove any non-numeric characters from the input
    event.target.value = event.target.value.replace(/\D/g, '');
});
//-- BUTTON FORM_CHECK_CEP --//
frmChkCep.addEventListener('submit',(event) =>{
    event.preventDefault();

    let searchInput = inpChkCep.value.trim();
    if(/^\d{8}$/.test(searchInput)){
        if(inpChkCep.value == currentReqCep.replace(/\D/g, '')){
            return;
        }

        checkCEP(inpChkCep.value);
    }
    else{
        showHideItmPg(itmLiFResChkd, "flex");

        console.error("Digite o número do CEP para buscar!");
    }
});
//

//-- INPUTS FORM_CHECK_ADDRES --//
frmChkAddress.addEventListener('submit',(event) =>{
    event.preventDefault();

    getInfoFilled(inpChkUf.value,inpChkCidade.value,inpChkEndereco.value); 
});
//
//-- BUTTON FORM_CHECK_ADDRES --//
swFrmMd.addEventListener('click',(event) =>{
    event.preventDefault();

    if(currentTypeSwFrmMd == typeSwFrmMd.typeFrmChkCep){
        
        showHideItmPg(frmChkCep, "none","out");
        setTimeout(() => {
            showHideItmPg(frmChkAddress, 'flex', 'in');
        }, 180);

        ttlPnlFrm.innerText = "CONSULTAR ENDEREÇO";

        currentTypeSwFrmMd = typeSwFrmMd.typeFrmChkAddress;
    }
    else if(currentTypeSwFrmMd == typeSwFrmMd.typeFrmChkAddress){
        
        showHideItmPg(frmChkAddress, "none","out");
        setTimeout(() => {
            showHideItmPg(frmChkCep, "flex", "in");
            const itmLiRResChkd = document.querySelectorAll('.itm-li-r-res-chkd-del');
            itmLiRResChkd.forEach(element => {
                element.remove();
            });
        }, 180);

        if(pnlResCepAddress.style.display == "flex"){
            showHideItmPg(pnlResCepAddress,"none","out");
        }

        ttlPnlFrm.innerText = "VALIDAR CEP";

        currentTypeSwFrmMd = typeSwFrmMd.typeFrmChkCep;
    }
});

function applyTransition(element, className) {
    element.classList.add(className);
    // Adicione um evento de transição para remover a classe após a transição
    element.addEventListener('transitionend', () => {
      element.classList.remove(className);
    }, { once: true });
}
