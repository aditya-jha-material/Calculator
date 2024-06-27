let button = document.querySelectorAll("input[type='button']");
let records = [];
let textField = document.querySelector("input[name='display']");
button.forEach((e) => {
    e.addEventListener('click', f);
})

function f(buttons) {
    if (buttons.target.value == '=') {
        let result = execute(textField.value);
        textField.value = result;
        let string = result;  
        records.push(string);
    } else if (buttons.target.value == 'HIS') {
        let result = history();
        textField.value = result;
        let string = result;  
    }
}

document.addEventListener('keydown', g);

function g(event){
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*'];
    if(event.key === 'Enter'){
        let result = execute(textField.value);
        textField.value = result;
        let string = result;  
        records.push(string);
    }
    else if(event.key === 'Backspace'){
        textField.value = textField.value.slice(0, -1);
    }
    else if(event.key === 'C' || event.key === 'c' || event.key === 'Delete'){
        textField.value = '';
    }
    else if(arr.includes(event.key)){
        textField.value += event.key;
    }
}

function execute(expression) {
    try {
        return eval(expression);
    } catch (error) {
        console.log(error);
        return 'ERROR';
    }
}

function history() {
    try {
        if (records.length == 0) {
            return 'EMPTY';
        } else {
            return records.pop();
        }
    } catch (error) {
        return 'ERROR';
    }
}
