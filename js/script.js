
//-- GET DOCUMENT ELEMENTS  --//
//-- FORM CONTENT --//
const formValidateCep = document.getElementById("form-validate-cep");
const inputSearchCep = document.getElementById("input-validate-cep");
//
//-- RESULT CEP --//
const resultCep01 = document.getElementById("resultCep-01"); 
const resultCep02 = document.getElementById("resultCep-02");
const resultCep03 = document.getElementById("resultCep-03");
const resultCep04 = document.getElementById("resultCep-04");
const resultCep05 = document.getElementById("resultCep-05");
const resultCep06 = document.getElementById("resultCep-06");

const boxResultCep = document.getElementById("result-cep-container");
//

/* GET PANEL FORM TO FILL INFOS */
const formToFillCep = document.getElementById('form-to-fill-info');
const inputFillAll = document.querySelectorAll('.input-find-cep');
const inputFillUf = document.querySelector('.input-fill-uf');
const inputFillCidade = document.querySelector('.input-fill-cidade');
const inputFillBairro = document.querySelector('.input-fill-bairro');
const inputFillRua = document.querySelector('.input-fill-rua');
//

//-- DEFAULT DATA  --//
const appCepId = '45993135';
let toggleHasActived = true;
//

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
formValidateCep.addEventListener('submit',(event) =>{
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

/* GET API FILLED INFOS */
const getAPIFilled = async(uf,cidade,bairro,rua) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${bairro}+${rua}/json/`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
const getInfoFilled = async(uf,cidade,bairro,rua) =>{
    const data = await getAPIFilled(uf,cidade,bairro,rua);

    if(!("erro" in data)){
        showBoxResult(true);

        resultCep01.textContent = data['cep'];
        //
        resultCep02.textContent = data['ddd'];
        //
        resultCep03.textContent = data['localidade'];
        //
        resultCep04.textContent = data['uf'];
        //
        resultCep05.textContent = data['bairro'];
        //
        resultCep06.textContent = data['logradouro'];    
        
        console.log(data);
    }
    else{
        console.error("Erro ao procurar pelo CEP fornecido!");
    }
}

formToFillCep.addEventListener('submit',(event) =>{
    event.preventDefault();


    getInfoFilled(inputFillUf.value,inputFillCidade.value,inputFillBairro.value,inputFillRua.value);
    console.log(inputFillUf.value,inputFillCidade.value,inputFillBairro.value,inputFillRua.value);
    
});
//

/* TOGGLE MODE FUNCTION - FIND OR VALIDATE */
function callToggleMode(){
    toggleHasActived = !toggleHasActived;
    toggleMode();
}
function toggleMode() {
    showBoxResult(false);

    if(!toggleHasActived){
        formValidateCep.classList.remove("visible");
        formToFillCep.classList.add("visible");
        return;
    }
    formToFillCep.classList.remove("visible");
    formValidateCep.classList.add("visible");
}
//

//-- REMOVE RESULT PANEL FROM PAGE --//
function showBoxResult(canShow) {
    if(canShow){    
        boxResultCep.classList.add("visible");
        return;
    }
    boxResultCep.classList.remove("visible");
}
//

toggleMode();



