let LAST_RESULT = 0;
var currentExpression = "";

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerHTML = "🌙";
    localStorage.setItem("theme", "light");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-toggle").innerHTML = "☀️";
  }
});

function appendToResult(value) { currentExpression += value.toString(); updateResult(); }
function bracketToResult(value) { currentExpression += value; updateResult(); }
function backspace() { currentExpression = currentExpression.slice(0, -1); updateResult(); }
function operatorToResult(value) { currentExpression += (value === "^" ? "**" : value); updateResult(); }
function clearResult() { currentExpression = ""; updateResult(); }

function normalizeExpression(expr) {
  return expr.replace(/asin\(/g, "asinDeg(").replace(/acos\(/g, "acosDeg(").replace(/atan\(/g, "atanDeg(")
             .replace(/sin\(/g, "sinDeg(").replace(/cos\(/g, "cosDeg(").replace(/tan\(/g, "tanDeg(")
             .replace(/asinh\(/g, "asinh(").replace(/sinh\(/g, "sinh(").replace(/\be\b/g, "Math.E")
             .replace(/\bpi\b/g, "Math.PI");
}

function percentToResult() {
  if (!currentExpression) return;
  const match = currentExpression.match(/(.+?)(\*\*|[+\-*/^])([0-9.]*)$/);
  if (!match) {
    const num = parseFloat(currentExpression);
    if (!isNaN(num)) currentExpression = (num / 100).toString();
  } else {
    const leftVal = eval(match[1]);
    const rightVal = parseFloat(match[3]);
    currentExpression = ((leftVal * rightVal) / 100).toString();
  }
  currentExpression += "*";
  updateResult();
}

function calculateExpression(expression) {
  try {
    let normalized = normalizeExpression(expression).replace(/\bans\b/gi, LAST_RESULT);
    let result = eval(normalized);
    return (isNaN(result) || !isFinite(result)) ? "Error" : result;
  } catch (e) { return "Error"; }
}

function calculateResult() {
  if (!currentExpression) return;
  let result = calculateExpression(currentExpression);
  LAST_RESULT = result;
  document.getElementById("result").value = result;
  currentExpression = String(result);
  updateResult();
}

function updateResult() { document.getElementById("result").value = currentExpression || "0"; }

// Temperature Conversion Logic
function convertTemperature() {
  const inputVal = parseFloat(document.getElementById("temp-input").value);
  const fromUnit = document.getElementById("temp-from").value;
  const resC = document.getElementById("temp-res-c"), resF = document.getElementById("temp-res-f"), resK = document.getElementById("temp-res-k");

  if (isNaN(inputVal)) { resC.innerText = "0°C"; resF.innerText = "32°F"; resK.innerText = "273.15K"; return; }
  
  let celsius = (fromUnit === "C") ? inputVal : (fromUnit === "F") ? (inputVal - 32) * 5 / 9 : inputVal - 273.15;
  resC.innerText = celsius.toFixed(2).replace(/\.00$/, "") + "°C";
  resF.innerText = ((celsius * 9 / 5) + 32).toFixed(2).replace(/\.00$/, "") + "°F";
  resK.innerText = (celsius + 273.15).toFixed(2).replace(/\.00$/, "") + "K";
}