

const appCepId = '45993135';

const findCEP = async(cepId) =>{
    const APIResponse = await fetch(`https://viacep.com.br/ws/${cepId}/json/`);

    if(APIResponse.status == 200){
        const dataCep = await APIResponse.json();
        return dataCep;
    }
}

const getCEP = async(cepId) =>{
    const dataCep = await findCEP(cepId);

    /* console.log(dataCep); */
    if(dataCep){
        console.log(dataCep);
    }
}

getCEP(appCepId);