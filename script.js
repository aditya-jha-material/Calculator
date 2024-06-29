document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const buttons = document.querySelectorAll("input[type='button']");
    const records = [];
    const textField = document.querySelector("input[name='display']");
    const historyBox = document.getElementById('history-box');
    const historyList = document.getElementById('history-list');
    let resultDisplayed = false;

    function buttonAnimation(key) {
        buttons.forEach(function(button) {
            console.log(button);
            if (button.value === key) {
                button.classList.add("pressed");
                setTimeout(function() {
                    button.classList.remove("pressed");
                }, 100);
            }
            else if ((key === 'Backspace' || key === 'DE') && button.value === 'DE') {
                button.classList.add("pressed");
                setTimeout(function() {
                    button.classList.remove("pressed");
                }, 100);
            } 
            else if ((key === 'Delete' || key.toUpperCase() === 'C') && button.value === 'AC') {
                button.classList.add("pressed");
                setTimeout(function() {
                    button.classList.remove("pressed");
                }, 100);
            }
        });
    }
    
    //event listener for theme toggle button
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    });

    // initial theme based on user or default to light
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }

    // for calculator buttons
    buttons.forEach((e) => {
        e.addEventListener('click', handleButtonClick);
    });

    document.addEventListener('keydown', g);

    function handleButtonClick(event) {
        const value = event.target.value;
        buttonAnimation(value);
        if (value === '=') {
            let result = execute(textField.value);
            records.push(`${textField.value} = ${result}`);
            textField.value = result;
            resultDisplayed = true;
        } else if (value === 'HIS') {
            toggleHistory()
        } else if (value === 'AC') {
            textField.value = '';
            resultDisplayed = false;
        } else if (value === 'DE') {
            textField.value = textField.value.toString().slice(0, -1);
        } else {
            if (resultDisplayed) {
                textField.value = '';
                resultDisplayed = false;
            }
            textField.value += value;
        }
    }

    function g(event){
        buttonAnimation(event.key)
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', '.'];
        if(event.key === 'Enter'){
            let result = execute(textField.value);
            records.push(`${textField.value} = ${result}`);
            textField.value = result;
            resultDisplayed = true;
        }
        else if(event.key === 'Backspace'){
            textField.value = textField.value.slice(0, -1);
        }
        else if(event.key === 'C' || event.key === 'c' || event.key === 'Delete'){
            textField.value = '';
        }
        else if(arr.includes(event.key)){
            if (resultDisplayed) {
                textField.value = '';
                resultDisplayed = false;
            }
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

    function toggleHistory() {
        if (historyBox.style.display === 'block') {
            historyBox.style.display = 'none';
        } else {
            showHistory();
        }
    }

    function showHistory() {
        historyList.innerHTML = ''; 
        if (records.length === 0) {
            historyList.innerHTML = '<li>EMPTY</li>';
        } else {
            records.forEach(record => {
                const listItem = document.createElement('li');
                listItem.textContent = record;
                historyList.appendChild(listItem);
            });
        }
        historyBox.style.display = 'block'; //  history box
    }
});
