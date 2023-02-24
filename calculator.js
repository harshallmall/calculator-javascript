let firstOperand = ''
let secondOperand = ''
let presentOperator = null
let screenReset = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsButton')
const clearButton = document.getElementById('clearButton')
const deleteButton = document.getElementById('deleteButton')
const decimalButton = document.getElementById('decimalButton')
const previousOperation = document.getElementById('previousOperation')
const presentOperation = document.getElementById('presentOperation')

window.addEventListener('keydown', keyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => appendOperation(button.textContent))
)

function appendNumber(number) {
  if (presentOperation.textContent === '0' || screenReset)
    resetScreen()
  presentOperation.textContent += number
}

function resetScreen() {
  presentOperation.textContent = ''
  screenReset = false
}

function clear() {
  presentOperation.textContent = '0'
  previousOperation.textContent = ''
  firstOperand = ''
  secondOperand = ''
  presentOperator = null
}

function appendDecimal() {
  if (screenReset) resetScreen()
  if (presentOperation.textContent === '')
    presentOperation.textContent = '0'
  if (presentOperation.textContent.includes('.')) return
  presentOperation.textContent += '.'
}

function deleteNumber() {
  presentOperation.textContent = presentOperation.textContent
    .toString()
    .slice(0, -1)
}

function appendOperation(operator) {
  if (presentOperator !== null) evaluate()
  firstOperand = presentOperation.textContent
  presentOperator = operator
  previousOperation.textContent = `${firstOperand} ${presentOperator}`
  screenReset = true
}

function evaluate() {
  if (presentOperator === null || screenReset) return
  if (presentOperator === '÷' && presentOperation.textContent === '0') {
    alert("Dividing by 0 is not permitted, Old Sport.")
    return
  }
  secondOperand = presentOperation.textContent
  presentOperation.textContent = roundResult(
    operate(presentOperator, firstOperand, secondOperand)
  )
  previousOperation.textContent = `${firstOperand} ${presentOperator} ${secondOperand} =`
  presentOperator = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendDecimal()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    appendOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return 'x'
  if (keyboardOperator === '-') return '-'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case 'x':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}