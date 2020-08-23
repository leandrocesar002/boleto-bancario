const express = require('express');
const { response } = require('express');

const app = express();

app.use(express.json());

app.post('/titulos', (request, response) => {
    let {codigo} = request.body;

    //remover espaços
    codigo = codigo.replace(/\s/g,'')

    //remover pontos
    codigo = codigo.split('.').join("")

    //pegar valor e data
    const finalNumber = codigo.slice(33);

    //pegar data
    const date = parseInt(finalNumber.substring(0,4));

    //pegar valor
    let value = finalNumber.substring(4);

    //fazer soma de data segundo o BB
    var myDate = new Date('October 07, 1997');
    myDate.setDate(myDate.getDate() + date);

    //remover zeros a esquerda
    value = value.replace(/^0+/, '');

    //primeiro conjunto para verificar digito 1
    const campo1 = codigo.slice(0,9);
    const dvCampo1 = codigo.slice(9,10);

    //conjunto para verificar digito 2
    const campo2 = codigo.slice(10,20);
    const dvCampo2 = codigo.slice(20,21);

    //conjunto para verificar digito 3
    const campo3 = codigo.slice(21,31)
    const dvCampo3 = codigo.slice(31,32);

    //array para fazer a multiplicação usando for
    const arr2 = [2,1,2,1,2,1,2,1,2,1,2,1,2]; 
    //array para fazer a muyltiplicação
    const arr3 = [4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2];
    var resto=0;
    var div=0;
    var total=0;

    //Verificação grupo 1
    var sum = 0;
    for(var i=0; i< campo1.length; i++) {
        sum += campo1[i]*arr2[i];

        if (sum > 9) 
        {
            resto = sum % 10
            div = (sum - resto)/10
            sum = div + resto 
        }
        total = total+sum;
        sum = 0;
    }

    var restoDV1 = total%10;
    var digitoDV1 = 10-restoDV1;

    //Verificação grupo 2
    resto=0;
    div=0;
    total=0;
    for(var x=0; x< campo2.length; x++) {
        sum += campo2[x]*arr2[x+1];

        if (sum > 9) 
        {
            resto = sum % 10
            div = (sum - resto)/10
            sum = div + resto 
        }
        total = total+sum;
        sum = 0;
    }

    var restoDV2 = total%10;
    var digitoDV2 = 10-restoDV2;

    //Verificação grupo 3
    resto=0;
    div=0;
    total=0;
    for(var y=0; y< campo3.length; y++) {
        sum += campo3[y]*arr2[y+1];

        if (sum > 9) 
        {
            resto = sum % 10
            div = (sum - resto)/10
            sum = div + resto 
        }
        total = total+sum;
        sum = 0;
    }

    var restoDV3 = total%10;
    var digitoDV3 = 10-restoDV3;

    //digito verificador
    var digitoVerificador = codigo.slice(32,33);

    //convertendo linha digitavel em codigo de barras
    var codigoBarras = codigo.slice(0,4) + codigo.slice(32,47) + codigo.slice(4,9) + codigo.slice(10,16) + codigo.slice(16,20) + codigo.slice(21,31);
    //remover digito vevrificador para fazer calculo
    var removed = codigoBarras.slice(0,4) + codigoBarras.slice(5,47);

    //for para fazer calculo
    total=0;    
    for(var y=0; y< arr3.length; y++) {
        sum += removed[y]*arr3[y];
        total = total+sum;
        sum = 0;
    }

    //calculod e digito verificador
    var restoDV = total%11

    if (restoDV == 0 || restoDV == 1 || restoDV == 10)
    {
        restoDV==1;
    }
    DV = 11 - restoDV;

    //verificação de boleto para verificar se é valido ou não
    if ((digitoDV1 == dvCampo1) && (digitoDV2 == dvCampo2) && (digitoDV3 == dvCampo3) && (digitoVerificador == DV))
    {
    return response.json({
        myDate,
        value,
    });
    }
    else
    {
        return response.json({
        message: "codigo não válido"
        })
    }
})     

app.listen(3333);