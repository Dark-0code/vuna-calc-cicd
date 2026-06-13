let displayValue = "";

// --- Standard Calculator Logic ---
function appendNumber(num) {
    displayValue += num;
    document.getElementById("display").value = displayValue;
}

function appendOperator(op) {
    displayValue += " " + op + " ";
    document.getElementById("display").value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("display").value = "0";
}

function calculateResult() {
    try {
        let result = eval(displayValue);
        document.getElementById("display").value = result;
        displayValue = result.toString();
    } catch (error) {
        document.getElementById("display").value = "Error";
        displayValue = "";
    }
}

// --- Dynamic Mode Switching Logic ---
function switchMode() {
    const mode = document.getElementById("calc-mode").value;
    if (mode === "standard") {
        document.getElementById("standard-ui").style.display = "block";
        document.getElementById("temp-ui").style.display = "none";
    } else {
        document.getElementById("standard-ui").style.display = "none";
        document.getElementById("temp-ui").style.display = "block";
    }
}

// --- Temperature Conversion Logic ---
function convertTemperature() {
    const val = parseFloat(document.getElementById("temp-input").value);
    const fromUnit = document.getElementById("temp-from").value;
    const toUnit = document.getElementById("temp-to").value;
    const resultField = document.getElementById("temp-result");

    if (isNaN(val)) {
        resultField.value = "";
        return;
    }

    let celsiusValue;

    // Convert input unit systematically to Base Celsius
    if (fromUnit === "C") {
        celsiusValue = val;
    } else if (fromUnit === "F") {
        celsiusValue = (val - 32) * 5 / 9;
    } else if (fromUnit === "K") {
        celsiusValue = val - 273.15;
    }

    let finalOutput;

    // Convert Base Celsius out to target unit
    if (toUnit === "C") {
        finalOutput = celsiusValue;
    } else if (toUnit === "F") {
        finalOutput = (celsiusValue * 9 / 5) + 32;
    } else if (toUnit === "K") {
        finalOutput = celsiusValue + 273.15;
    }

    resultField.value = finalOutput.toFixed(2);
}