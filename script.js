const botaoGerarSequencia = 
    document.querySelector('.controls button');
const selectSequencias = 
    document.querySelector('.controls select[data-select]');
const caixasSom = 
    document.querySelectorAll('.sound-box');
let sequenciaBase = [0 , 1 ,2];


function gerarPosicaoArray(){
    return Math.floor(Math.random() * sequenciaBase.length);
}


function gerarArraySequencias(numSequencia){
    let arraySequencias = []
    for(let i = 0 ; i<numSequencia;i++){
        let v1 = gerarPosicaoArray();
        let v2 = gerarPosicaoArray();
        let v3 = gerarPosicaoArray();
        arraySequencias.push([v1 , v2 ,v3]);
    }
    return arraySequencias;

}

function popularSelect(){
    
    selectSequencias.innerHTML = '';

    selectSequencias.appendChild(new Option("SELECIONE", "-1"));

    let sequencia = gerarArraySequencias(5);

    sequencia.forEach((el , i) =>{
        selectSequencias.appendChild( new Option(el , i));
    });
}

function tocarSequencia(arraySequencia){
    let intervalo = 0;
    arraySequencia.forEach((el)=>{
        let seletorCaixa = `[data-id='${el}']`;
        let caixaSelecionada = document.querySelector(seletorCaixa);
        console.log(caixaSelecionada);
        setTimeout(function(){
            tocarCaixinha(caixaSelecionada.children[0]);
        }, intervalo)

        intervalo+=1500;


    })

}



function selecionarCaixinha(caixa){
    
    caixa.classList.add('active');

    setTimeout(function(){
        caixa.classList.remove('active');
    }, 600)

}


function tocarCaixinha(audio){
    audio.currentTime = 0;
    audio.play();
    selecionarCaixinha(audio.parentElement);

}

caixasSom.forEach((el) => {
   el.addEventListener('click' , ()=>{
       const audio = el.children[0];
       tocarCaixinha(audio);
   }) 
})

window.addEventListener('load', function(){
    popularSelect();
})

botaoGerarSequencia.addEventListener('click', popularSelect);
selectSequencias.addEventListener('change' , ()=>{

    let valor = selectSequencias.options[selectSequencias.selectedIndex].text;
    
    let arraySequencia = valor.split(',');


    tocarSequencia(arraySequencia);

})