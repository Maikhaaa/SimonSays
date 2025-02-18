"use strict";

const buttons = [
    document.getElementById("top"),
    document.getElementById("left"),
    document.getElementById("right"),
    document.getElementById("bottom")
];

const cButton = document.getElementById("center-button");

const seq = ["red","blue","yellowGreen","yellow"];

let sequance;
let seqMet;

let seqLen;
let seqMetLen;

let loopIndex;

window.onload = function(){
    reset();
    start();
}


function reset(){
    sequance = new Array;
    seqMet = new Array;
    seqLen = 0;
    seqMetLen = 0;
    loopIndex = 0;
}

function start(){
    addToSeq();
    displaySeq();
}


//------------------------------------------------------------------------------------------------//

function WhenClickChangeColor(element,color){
    element.addEventListener("click",function(){
        afterButtonPressed(element,color)
    });
}

function afterButtonPressed(element,color){
    lightUp(element,color);
    seqMet.push(color);
    seqMetLen += 1
    
    if(checkSeq() === true){
        if(seqMetLen === seqLen){
            lightUp(cButton,"yellowGreen");
            addToSeq();
            seqMet = new Array;
            seqMetLen = 0;
            loopIndex = 0;
            displaySeq();
        }
    }else{
        lightUp(cButton,"red");
        reset();
        start();
    }
}

function lightUp(element,color){
    element.style = "background-color:" + color + "; box-shadow: 0px 0px 50px " + color + ";";
    setTimeout(function() {
        element.style = "";
    }, 225);
    clearTimeout();
}

WhenClickChangeColor(buttons[0],"red");
WhenClickChangeColor(buttons[1],"blue");
WhenClickChangeColor(buttons[2],"yellowGreen");
WhenClickChangeColor(buttons[3],"yellow");

cButton.addEventListener("click",function(){
    lightUp(cButton,"white");
    reset();
    start();
})

//-----------------------------------------------------------------------------------------------------------------------//

function addToSeq(){
    seqLen += 1;
    let random = Math.floor(Math.random()*4);
    sequance.push(seq[random]);
}

function displaySeq(){
    setTimeout(myLoop,1000);
}

function myLoop(){
    setTimeout(function(){
        let element = sequance[loopIndex];
        let index = seq.indexOf(element);
        lightUp(buttons[index],element);

        loopIndex += 1

        if(loopIndex < seqLen){
            myLoop();
        }

    },250);
}

function checkSeq(){
    for(let i = 0; i < seqMetLen; i++){
        if(seqMet[i] !== sequance[i]){
            return false;
        }
    }
    return true;
}

//-----------------------------------------------------------------------------------------------------------------------//

//keyboard support

document.addEventListener('keydown', input);

function input(event) {
    if(event.key === "ArrowUp") {
        afterButtonPressed(buttons[0],"red");
    }
    if(event.key === "ArrowLeft") {
        afterButtonPressed(buttons[1],"blue");
    }
    if(event.key === "ArrowRight") {
        afterButtonPressed(buttons[2],"yellowGreen");
    }
    if(event.key === "ArrowDown") {
        afterButtonPressed(buttons[3],"yellow");
    }
    if(event.keyCode === 32) {
        lightUp(cButton,"white");
        reset();
        start();
    }
}