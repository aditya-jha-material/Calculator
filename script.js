let button = document.querySelectorAll("button");
let records = [];
let textField = document.querySelector('#textField');  
button.forEach((e) => {
    e.addEventListener('click', f);         
})

function f(buttons){
    if(buttons.target.innerHTML == '='){
        let result = execute(textField.value);
        textField.value = result;
        let string = result;  
        records.push(string);
    } else if(buttons.target.innerHTML == 'HIS'){
        let result = history();
        textField.value = result;
        let string = result;  
    }
}

function execute(expression){
    try {
        return eval(expression);
    } catch (error) {
        console.log(error);
        return 'ERROR';
    }
}

function history(){
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
