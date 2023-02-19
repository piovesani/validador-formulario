let validator = {
    handleSubmit: (e) => {
        e.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);

            if (check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let ruleDetails = rules[k].split('=');

                switch (ruleDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;

                    case 'min':
                        if (input.value.length < ruleDetails[1]) {
                            return `Campo deve ter pelo menos ${ruleDetails[1]} caracteres.`
                        }
                        break;

                    case 'email':
                        if (input.value !== '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if(!regex.test(input.value.toLowerCase())){
                                return 'O campo deve ser um email válido.'
                            }

                        }
                    break;

                    case 'key':
                        if (input.value !== '') {
                            let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])(?!\1)){8,}$/;

                            if(!regex.test(input.value.toLowerCase())){
                                return 'Senha deve ter ao menos 1 letra Maiúscula, 1 minúscula e 1 caracter especial ex: @.'
                            }
                        }
                    break;
                }
            }

        }
        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');

        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}


let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);