



/* GET PANEL FORM TO FILL INFOS */
const form2Content = document.getElementById('form2-content');
const inputFillAll = document.querySelectorAll('.input-find-cep');
const inputFillUf = document.querySelector('.input-fill-uf');
const inputFillCidade = document.querySelector('.input-fill-cidade');
const inputFillBairro = document.querySelector('.input-fill-bairro');
const inputFillRua = document.querySelector('.input-fill-rua');
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

        resultCep01.textContent = data['0']['cep'];
        //
        resultCep02.textContent = data['0']['ddd'];
        //
        resultCep03.textContent = data['0']['localidade'];
        //
        resultCep04.textContent = data['0']['uf'];
        //
        resultCep05.textContent = data['0']['bairro'];
        //
        resultCep06.textContent = data['0']['logradouro'];    
        
        data.array.forEach(function(i) {
            let li = document.createElement('li');

            let anddress = data[i]['cep'] + data[i]['ddd']
            + data[i]['localidade'] + data[i]['uf'] + data[i]['bairro']
            + data[i]['logradouro'];

            li.innerHTML = anddress;
            li.setAttribute('');
            
            let sectionContainer,sidebox,resultTitle
            infoResultCep,ul1,cepTitle,li1,resultCepText; 

            sectionContainer = document.createElementById('section');
            sectionContainer.setAttribute('panel-result-container');

            sidebox = document.createElement('div');
            sidebox.setAttribute('side-box result-side-box');
            sectionContainer.appendChild(sidebox);

            resultTitle = document.createElement('h3');
            resultTitle.setAttribute('result-title-text');
            resultTitle.textContent = "CEP Encontrado!";
            sectionContainer.appendChild(resultTitle);

            infoResultCep = document.createElementById('div');
            infoResultCep.setAttribute('info-result-cep');
            sectionContainer.appendChild(infoResultCep);

            ul1 = document.createElement('ul');
            infoResultCep.appendChild(ul1);

            cepTitle = document.createElement('h3');
            cepTitle.setAttribute('cep-title-text');
            cepTitle.textContent = "CEP";
            ul1.appendChild(cepTitle);

            li1 = document.createElement('li');
            li1.setAttribute('box-result');
            ul1.appendChild(li1);
    
            resultCepText = document.createElement('h4');
            resultCepText.setAttribute('resultCep-01 cep-result-text');
            sectionContainer.appendChild(resultCepText);

             
        });

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