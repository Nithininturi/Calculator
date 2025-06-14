class Calculator {
  constructor() {
    this.displayValue = '0';
    this.currentEquationDisplay = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
    this.recentOperations = [];
    this.memory = 0;
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
  }

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      if (this.operator) {
        this.currentEquationDisplay = `${this.firstOperand}${this.operator}${digit}`;
      } else {
        this.currentEquationDisplay = digit;
      }
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
      if (this.firstOperand !== null && this.operator) {
        this.currentEquationDisplay = `${this.firstOperand}${this.operator}${this.displayValue}`;
      } else {
        this.currentEquationDisplay = this.displayValue;
      }
    }
  }

  inputDecimal(dot) {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0.';
      this.currentEquationDisplay = '0.';
      this.waitingForSecondOperand = false;
      return;
    }

    if (!this.displayValue.includes(dot)) {
      this.displayValue += dot;
      this.currentEquationDisplay = this.displayValue;
    }
  }

  handleBackspace() {
    if (this.waitingForSecondOperand) return;
    
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
      this.currentEquationDisplay = this.displayValue;
    } else {
      this.displayValue = '0';
      this.currentEquationDisplay = '0';
    }
  }

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (nextOperator === '=') {
      if (this.firstOperand === null || this.operator === null || this.waitingForSecondOperand) {
        return;
      }
      const result = this.operate(this.firstOperand, inputValue, this.operator);
      this.recentOperations.push(`${this.firstOperand} ${this.operator} ${inputValue} = ${result}`);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.currentEquationDisplay = `${this.firstOperand} ${this.operator} ${inputValue} = ${result}`;
      this.firstOperand = result;
      this.waitingForSecondOperand = true;
      this.operator = null;
      return;
    }

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      this.currentEquationDisplay = `${this.firstOperand} ${nextOperator}`;
      return;
    }

    if (this.firstOperand === null && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.operate(this.firstOperand, inputValue, this.operator);
      this.recentOperations.push(`${this.firstOperand} ${this.operator} ${inputValue} = ${result}`);
      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
    this.currentEquationDisplay = `${this.displayValue} ${nextOperator}`;
  }

  operate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '*': return firstOperand * secondOperand;
      case '/': return firstOperand / secondOperand;
      case '%': return (firstOperand * secondOperand) / 100;
      case '^': return Math.pow(firstOperand, secondOperand);
      case 'nthroot': return Math.pow(secondOperand, 1/firstOperand);
      default: return secondOperand;
    }
  }

  handleAdvancedOperation(operation) {
    const inputValue = parseFloat(this.displayValue);

    switch (operation) {
      case 'sqrt':
        const sqrtResult = Math.sqrt(inputValue);
        this.recentOperations.push(`√(${inputValue}) = ${sqrtResult}`);
        this.displayValue = `${parseFloat(sqrtResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = sqrtResult;
        this.waitingForSecondOperand = true;
        break;
      case 'cbrt':
        const cbrtResult = Math.cbrt(inputValue);
        this.recentOperations.push(`∛(${inputValue}) = ${cbrtResult}`);
        this.displayValue = `${parseFloat(cbrtResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = cbrtResult;
        this.waitingForSecondOperand = true;
        break;
      case 'sin':
        const sinResult = this.angleMode === 'DEG' 
          ? Math.sin(inputValue * Math.PI / 180)
          : Math.sin(inputValue);
        this.recentOperations.push(`sin(${inputValue}${this.angleMode === 'DEG' ? '°' : ' rad'}) = ${sinResult}`);
        this.displayValue = `${parseFloat(sinResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = sinResult;
        this.waitingForSecondOperand = true;
        break;
      case 'cos':
        const cosResult = this.angleMode === 'DEG'
          ? Math.cos(inputValue * Math.PI / 180)
          : Math.cos(inputValue);
        this.recentOperations.push(`cos(${inputValue}${this.angleMode === 'DEG' ? '°' : ' rad'}) = ${cosResult}`);
        this.displayValue = `${parseFloat(cosResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = cosResult;
        this.waitingForSecondOperand = true;
        break;
      case 'tan':
        const tanResult = this.angleMode === 'DEG'
          ? Math.tan(inputValue * Math.PI / 180)
          : Math.tan(inputValue);
        this.recentOperations.push(`tan(${inputValue}${this.angleMode === 'DEG' ? '°' : ' rad'}) = ${tanResult}`);
        this.displayValue = `${parseFloat(tanResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = tanResult;
        this.waitingForSecondOperand = true;
        break;
      case 'log':
        const logResult = Math.log10(inputValue);
        this.recentOperations.push(`log(${inputValue}) = ${logResult}`);
        this.displayValue = `${parseFloat(logResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = logResult;
        this.waitingForSecondOperand = true;
        break;
      case 'ln':
        const lnResult = Math.log(inputValue);
        this.recentOperations.push(`ln(${inputValue}) = ${lnResult}`);
        this.displayValue = `${parseFloat(lnResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = lnResult;
        this.waitingForSecondOperand = true;
        break;
      case 'pi':
        const piResult = Math.PI;
        this.recentOperations.push(`π = ${piResult}`);
        this.displayValue = `${parseFloat(piResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = piResult;
        this.waitingForSecondOperand = true;
        break;
      case 'e':
        const eResult = Math.E;
        this.recentOperations.push(`e = ${eResult}`);
        this.displayValue = `${parseFloat(eResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = eResult;
        this.waitingForSecondOperand = true;
        break;
      case 'fact':
        const factResult = this.factorial(Math.floor(inputValue));
        this.recentOperations.push(`${inputValue}! = ${factResult}`);
        this.displayValue = `${parseFloat(factResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = factResult;
        this.waitingForSecondOperand = true;
        break;
      case 'abs':
        const absResult = Math.abs(inputValue);
        this.recentOperations.push(`|${inputValue}| = ${absResult}`);
        this.displayValue = `${parseFloat(absResult.toFixed(7))}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = absResult;
        this.waitingForSecondOperand = true;
        break;
      case 'deg':
        this.angleMode = 'DEG';
        break;
      case 'rad':
        this.angleMode = 'RAD';
        break;
      case 'mc':
        this.memory = 0;
        break;
      case 'mr':
        this.displayValue = `${this.memory}`;
        this.currentEquationDisplay = this.displayValue;
        this.firstOperand = this.memory;
        this.waitingForSecondOperand = true;
        break;
      case 'm+':
        this.memory += parseFloat(this.displayValue);
        break;
      case 'm-':
        this.memory -= parseFloat(this.displayValue);
        break;
    }
  }

  factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }

  resetCalculator() {
    this.displayValue = '0';
    this.currentEquationDisplay = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
  }

  updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = this.currentEquationDisplay;
  }

  updateRecentOperations() {
    const recentOperationsList = document.getElementById('recent-operations-list');
    recentOperationsList.innerHTML = this.recentOperations
      .map(operation => `<div>${operation}</div>`)
      .join('');
  }
}

// Initialize calculator
const calculator = new Calculator();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const calculatorElement = document.querySelector('.calculator');
  const keys = calculatorElement.querySelector('.calculator-keys');

  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
      calculator.handleOperator(target.value);
      calculator.updateDisplay();
      calculator.updateRecentOperations();
      return;
    }

    if (target.classList.contains('decimal')) {
      calculator.inputDecimal(target.value);
      calculator.updateDisplay();
      return;
    }

    if (target.classList.contains('all-clear')) {
      calculator.resetCalculator();
      calculator.updateDisplay();
      return;
    }

    if (target.classList.contains('backspace')) {
      calculator.handleBackspace();
      calculator.updateDisplay();
      return;
    }

    if (target.classList.contains('advanced')) {
      calculator.handleAdvancedOperation(target.value);
      calculator.updateDisplay();
      calculator.updateRecentOperations();
      return;
    }

    calculator.inputDigit(target.value);
    calculator.updateDisplay();
  });
}); 