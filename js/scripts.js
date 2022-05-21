const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    //add digit to calculator screen || adiciona dígitos a tela da calculadora
    addDigit(digit) {
        // check if current operation has a dot || checa se a operação já possui um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //  Process all calculator operations || Processo de todas as operações da calculadora
    //  Pode ser criado uma bifurcação em métodos individuais caso queira expandir a calculadora
    processOperation(operation) {
        // Check if current value is empty || checa se o valor atual está vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Change operation || Mudança de operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperaton(operation);
            }
            return;
        }
        // Get current and previous value || Pega os valores atuais e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOpertion();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // Change values of the calculator screen || muda os valores na tela da calculadora 
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {
        console.log(operationValue, operation, current, previous)
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //check if value is zero, if it is just add current value
            //checa se o valor é igual a zero, caso sim adiciona o valor atual
            if (previous === 0) {
                operationValue = current;
            }

            //add current value to previous || adiciona o valor atual para o anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }

    }

    // Change math operation || Mudar as operações matemáticas
    // Quando expandir a calculadora incluir as mesmas também nesta função
    changeOperaton(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return;
            //aborta a lógica caso não receba a operação que não queira
        }
        // Retira o último caractere para adicionar a próxima operação
        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit || deleta o último dígito
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current operation || Limpa a operação atual
    processClearCurrentOpertion() {
        this.currentOperationText.innerText = "";
    }

    //Clear all operation || limpa todas as operações
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process operation || Processa a operação
    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});