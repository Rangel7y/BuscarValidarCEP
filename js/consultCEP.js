
//-- GET DOCUMENT ELEMENTS  --//
// --- --- //

//-- FORM_CONTENT_CHECK_CEP (FRM_CNT_CHK_CEP) --//
const frmCntChkCep = document.getElementById('frm-chk-cep');
const inpChkCep = document.getElementById('inp-chk-cep');
//

//-- ITEMS_RESULT_CHECKED (ITM_RES_CHKD) 
const itmLiFResChkd = document.getElementById('itm-li-f-res-chkd');
//

//-- ITEMS_RESULT (SPAN) --//
const itmResCep = document.getElementById('itm-res-cep');
const itmResCidade = document.getElementById('itm-res-cidade');
const itmResBairro = document.getElementById('itm-res-bairro');
const itmResEndereco = document.getElementById('itm-res-endereco');
const itmResEstado = document.getElementById('itm-res-estado');
const itmResDDD = document.getElementById('itm-res-ddd');
//

//-- DEFAULT DATA  --//
const appCepId = '45993135';
//
// --- --- //

//-- FUNCTION TO REMOVE PANEL RESULT FROM PAGE --//
function showBoxResult(canShow) {
    if(canShow){    
        itmLiFResChkd.classList.add("visible");
        return;
    }
    itmLiFResChkd.classList.remove("visible");
}
//

//-- FUNCTION TO TRY_CONNECTION WITH API (CHECK CEP ID) --//
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
    const dataCep = await checkCepOnAPI(cepId);

    if(!("erro" in dataCep)){

        showBoxResult(true);

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
        /* showBoxResult(false); */

        console.error("Digite o número do CEP para buscar!");
    }
});
//


