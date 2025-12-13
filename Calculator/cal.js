const displayEL = document.getElementById("display");
const allButtons = document.querySelectorAll(".buttons button");

let current = "";
let previous = "";
let operator = null;
let shouldReset = false;

// Update display initially
displayEL.value = "0";

// Button click handling
allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const number = btn.dataset.num;
        const action = btn.dataset.action;
        const op = btn.dataset.op;

        if(number) appendNumber(number);
        else if(op) chooseOperator(op);
        else if(action) handleAction(action);

        updateDisplay();
    });
});

function appendNumber(char){
    if(shouldReset){
        current = "";
        shouldReset = false;
    }
    current += char;
}

function chooseOperator(op){
    if(current === "") return;
    if(previous !== "") compute();
    operator = op;
    previous = current;
    shouldReset = true;
}

function handleAction(action){
    if(action === "clear"){
        current = "";
        previous = "";
        operator = null;
        shouldReset = false;
    } else if(action === "delete"){
        current = current.slice(0, -1);
    } else if(action === "equals"){
        if(previous === "" || current === "") return;
        compute();
        operator = null;
    }
}

function compute(){
    let result;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    switch(operator){
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = prev / curr; break;
        default: return;
    }

    current = result.toString();
    previous = "";
    shouldReset = true;
}

function updateDisplay(){
    displayEL.value = current || "0";
}
