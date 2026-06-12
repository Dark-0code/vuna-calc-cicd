// ==========================================
// 1. STANDARD CALCULATOR FUNCTIONALITY
// ==========================================
const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === '0' && !isNaN(value)) {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '0';
}

function calculateResult() {
    try {
        // Evaluate the mathematical expression typed into the display box
        if (display.value.trim() === '') return;
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1500); // Reset after 1.5 seconds if formula is wrong
    }
}


// ==========================================
// 2. CUSTOM TEMPERATURE CONVERTER FUNCTIONALITY
// ==========================================
document.getElementById('convertTempBtn').addEventListener('click', function() {
    const inputVal = parseFloat(document.getElementById('tempInput').value);
    const fromUnit = document.getElementById('tempFrom').value;
    const toUnit = document.getElementById('tempTo').value;
    const resultDisplay = document.getElementById('tempResult');

    // Validation Guard Check: Stop execution if field is blank
    if (isNaN(inputVal)) {
        resultDisplay.innerText = "Please input a valid number!";
        resultDisplay.style.color = "#f53b57"; // Alert Red color
        return;
    }

    let calculatedResult;

    // Mathematical formula routing
    if (fromUnit === toUnit) {
        calculatedResult = inputVal; 
    } else if (fromUnit === "C" && toUnit === "F") {
        // Celsius to Fahrenheit mapping: (C × 9/5) + 32
        calculatedResult = (inputVal * 9/5) + 32;
    } else if (fromUnit === "F" && toUnit === "C") {
        // Fahrenheit to Celsius mapping: (F − 32) × 5/9
        calculatedResult = (inputVal - 32) * 5/9;
    }

    // Output formatting to keep UX clean (2 decimal constraints)
    resultDisplay.innerText = `Result: ${calculatedResult.toFixed(2)} °${toUnit}`;
    resultDisplay.style.color = "#4a54f1"; // Primary theme blue color
});