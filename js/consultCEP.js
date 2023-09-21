
//-- GET DOCUMENT ELEMENTS  --//
// --- --- //

//-- FORM_CONTENT_CHECK_CEP (FRM_CNT_CHK_CEP) --//
const frmCntChkCep = document.getElementById("frm-cnt-chk-cep");
const inpChkCep = document.getElementById("inp-chk-cep");
//

//-- RESULT CEP --//
const resultCep01 = document.getElementById("resultCep-01"); 
const resultCep02 = document.getElementById("resultCep-02");
const resultCep03 = document.getElementById("resultCep-03");
const resultCep04 = document.getElementById("resultCep-04");
const resultCep05 = document.getElementById("resultCep-05");
const resultCep06 = document.getElementById("resultCep-06");

const resultsContainer = document.getElementById('results-container');
//

//-- DEFAULT DATA  --//
const appCepId = '45993135';
//

// --- --- //

//-- FUNCTION TO GET API DATA --//
const findCEP = async(cepId) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${cepId}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}
//

//-- FUNCTION CALL FUNCTION GET API DATA --//
const getCEP = async(cepId) =>{
    const dataCep = await findCEP(cepId);

    if(!("erro" in dataCep)){

        showBoxResult(true);
        //
        resultCep01.textContent = dataCep['cep'];
        //
        resultCep02.textContent = dataCep['ddd'];
        //
        resultCep03.textContent = dataCep['localidade'];
        //
        resultCep04.textContent = dataCep['uf'];
        //
        resultCep05.textContent = dataCep['bairro'];
        //
        resultCep06.textContent = dataCep['logradouro'];
        //


        console.log(dataCep);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}
//

//-- BUTTON INPUT FORM --//
inputSearchCep.addEventListener('input', (event) => {
    // Remove any non-numeric characters from the input
    event.target.value = event.target.value.replace(/\D/g, '');
});
frmCntChkCep.addEventListener('submit',(event) =>{
    event.preventDefault();

    let searchInput = inputSearchCep.value.trim();
    if(/^\d{8}$/.test(searchInput)){
        getCEP(inputSearchCep.value);
    }
    else{
        showBoxResult(false);

        console.error("Digite o número do CEP para buscar!");
    }
});
//

//-- REMOVE RESULT PANEL FROM PAGE --//
function showBoxResult(canShow) {
    if(canShow){    
        resultsContainer.classList.add("visible");
        return;
    }
    resultsContainer.classList.remove("visible");
}
//
