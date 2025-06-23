let memory = 0;

function getInput() {
  return document.getElementById("inputDisplay").value;
}

function setInput(val) {
  document.getElementById("inputDisplay").value = val;
}

function setOutput(val) {
  document.getElementById("outputDisplay").value = val;
}

function append(value) {
  setInput(getInput() + value);
}

function clearAll() {
  setInput("");
  setOutput("");
}

function backspace() {
  setInput(getInput().slice(0, -1));
}

function isDivideByZero(expr) {
  return /\/\s*0(?![0-9.])/.test(expr);
}

function calculate() {
  const rawInput = getInput();
  const expr = rawInput.replace(/÷/g, "/").replace(/×/g, "*");

  if (expr.trim() === "") {
    setOutput("");
    return;
  }

  try {
    if (isDivideByZero(expr)) {
      throw new Error("DivideByZero");
    }

    const result = eval(expr);

    if (!isFinite(result)) {
      throw new Error("MathError");
    }

    setOutput(result);
  } catch (e) {
    if (e.message === "DivideByZero") {
      setOutput("Cannot divide by zero");
    } else {
      setOutput("Invalid input");
    }
  }
}

function sqrt() {
  try {
    const value = eval(getInput());
    if (value < 0) throw new Error("Invalid");
    setOutput(Math.sqrt(value).toFixed(6));
    setInput("");
  } catch {
    setOutput("Invalid input");
  }
}

function percentage() {
  try {
    const value = eval(getInput());
    setOutput((value / 100).toFixed(6));
    setInput("");
  } catch {
    setOutput("Invalid input");
  }
}

// Memory functions
function memoryAdd() {
  try {
    const value = parseFloat(document.getElementById("outputDisplay").value);
    if (!isNaN(value)) memory += value;
  } catch {}
}

function memorySubtract() {
  try {
    const value = parseFloat(document.getElementById("outputDisplay").value);
    if (!isNaN(value)) memory -= value;
  } catch {}
}

function memoryRecall() {
  setInput(memory.toString());
}

function memoryClear() {
  memory = 0;
}
