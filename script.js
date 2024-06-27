document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const button = document.querySelectorAll("input[type='button']");
    const records = [];
    const textField = document.querySelector("input[name='display']");
    
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
    button.forEach((e) => {
        e.addEventListener('click', f);
    });

    function f(buttons) {
        if (buttons.target.value == '=') {
            let result = execute(textField.value);
            textField.value = result;
            let string = textField.value;
            records.push(string);
        } else if (buttons.target.value == 'HIS') {
            let result = history();
            textField.value = result;
            let string = textField.value;
        } else {
            textField.value += buttons.target.value;
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
});
