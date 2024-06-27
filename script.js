document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const buttons = document.querySelectorAll("input[type='button']");
    const records = [];
    const textField = document.querySelector("input[name='display']");
    const historyBox = document.getElementById('history-box');
    const historyList = document.getElementById('history-list');
    let resultDisplayed = false;
    
    // Add event listener for theme toggle button
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    });

    // Set the initial theme based on user preference or default to light
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }

    // Add event listeners for calculator buttons
    buttons.forEach((e) => {
        e.addEventListener('click', handleButtonClick);
    });

    function handleButtonClick(event) {
        const value = event.target.value;
        if (value === '=') {
            let result = execute(textField.value);
            records.push(`${textField.value} = ${result}`);
            textField.value = result;
            resultDisplayed = true;
        } else if (value === 'HIS') {
            showHistory();
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

    function execute(expression) {
        try {
            return eval(expression);
        } catch (error) {
            console.log(error);
            return 'ERROR';
        }
    }

    function showHistory() {
        historyList.innerHTML = ''; // Clear the previous history
        if (records.length === 0) {
            historyList.innerHTML = '<li>EMPTY</li>';
        } else {
            records.forEach(record => {
                const listItem = document.createElement('li');
                listItem.textContent = record;
                historyList.appendChild(listItem);
            });
        }
        historyBox.style.display = 'block'; // Show the history box
    }
});
