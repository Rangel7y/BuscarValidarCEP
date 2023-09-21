
/* GET PANEL FORM TO FILL INFOS */
const form2Content = document.getElementById('form2-content');
const inputFillAll = document.querySelectorAll('.input-find-cep');
const inputFillUf = document.querySelector('.input-fill-uf');
const inputFillCidade = document.querySelector('.input-fill-cidade');
/* const inputFillBairro = document.querySelector('.input-fill-bairro'); */
const inputFillRua = document.querySelector('.input-fill-rua');
/* --- --- */

/* RESULTS CEP CONTAINER */
const resultsContainer = document.getElementById('results-container');
/* --- --- */

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
  
        
        for(var i = 0; i < data.length; i++){

            let address = data[i]['cep'] + data[i]['ddd']
            + data[i]['localidade'] + data[i]['uf'] + data[i]['bairro']
            + data[i]['logradouro'];
            
            let sectionContainer,sidebox,resultTitle,
            infoResultCep,ul1,cepTitle,li1/* ,resultCepHText,resultCepSpan */; 
            
            sectionContainer = document.createElement('section');
            sectionContainer.setAttribute('id','panel-result-container');
            itmResChkd.appendChild(sectionContainer);
            
            sidebox = document.createElement('div');
            sidebox.setAttribute('class','side-box result-side-box');
            sectionContainer.appendChild(sidebox);
            
            resultTitle = document.createElement('h3');
            resultTitle.setAttribute('class','result-title-text');
            resultTitle.textContent = "CEP Encontrado!";
            sectionContainer.appendChild(resultTitle);
            
            infoResultCep = document.createElement('div');
            infoResultCep.setAttribute('id','info-result-cep');
            sectionContainer.appendChild(infoResultCep);
            
            ul1 = document.createElement('ul');
            infoResultCep.appendChild(ul1);
            
            cepTitle = document.createElement('h3');
            cepTitle.setAttribute('class','cep-title-text');
            cepTitle.textContent = "CEP";
            ul1.appendChild(cepTitle);
            
            li1 = document.createElement('li');
            li1.setAttribute('class','box-result');
            li1.innerHTML = address;
            ul1.appendChild(li1);
                
                        /* resultCepHText = document.createElement('h4');
                        li1.appendChild(resultCepHText); */
            
                       /*  resultCepSpan = document.createElement('span');
                        resultCepSpan.setAttribute('resultCep-01 cep-result-text');
                        resultCepSpan.textContent = ;
                        resultCepHText.appendChild(resultCepSpan); */
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