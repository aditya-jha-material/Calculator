let button=document.querySelectorAll("button");
let records=[];

button.forEach((e)=>{
    e.addEventListener('click', f);         
})

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
