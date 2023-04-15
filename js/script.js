
//-- GET DOCUMENT ELEMENTS  --//
//-- FORM CONTENT --//
const formContent = document.getElementById("form-content");
const inputSearchCep = document.getElementById("input-search-cep");
//

//-- DEFAULT DATA  --//
const appCepId = '45993135';
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

    if(dataCep){
        console.log(dataCep);
    }
}
//

//-- BUTTON INPUT FORM --//
inputSearchCep.addEventListener('input', (event) => {
    // Remove any non-numeric characters from the input
    event.target.value = event.target.value.replace(/\D/g, '');
});
formContent.addEventListener('submit',(event) =>{
    event.preventDefault();

    let searchInput = inputSearchCep.value.trim();
    if(/^\d{9}$/.test(searchInput)){
        getCEP(inputSearchCep.value);
    }
    else{
        console.error("Digite o número do CEP para buscar!");
    }
});

