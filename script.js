let button=document.querySelectorAll("button");
let records=[];

button.forEach((e)=>{
    e.addEventListener('click', f);         
})

function f(buttons){
    if(buttons.target.innerHTML=='='){
        let result=execute(textField.value);
        textField.value=result;
        string=result;
        records.push(string);
    }

    else if(buttons.target.innerHTML=='⏱'){
        let result=history();
        textField.value=result;
        string=result;
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
        if (records=='') {
            return 'EMPTY';
        }

        else
            return records.pop();
    } catch (error) {
        return 'ERROR';
    }
}
