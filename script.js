const weight = document.getElementById("weight");
const height = document.getElementById("height");
const resultBtn = document.querySelector(".btn");
const resultText = document.querySelector(".result-text");

// validation
function validation() {
  const reg = new RegExp("^[0-9]+$");

  weight.addEventListener("input", () => {
    weight.style.border = "1px solid red";
    if (weight.value.match(reg)) {
      weight.style.border = "";
    } else {
      weight.style.border = "1px solid red";
    }
  });
  height.addEventListener("input", () => {
    height.style.border = "1px solid red";
    if (height.value.match(reg)) {
      height.style.border = "";
    } else {
      height.style.border = "1px solid red";
    }
  });
}
validation();
//
// body mass index
function outputInfo() {
  // calc result
  let calcResult = weight.value / ((height.value / 100) * (height.value / 100));
  console.log(weight.value);
  console.log(height.value);
  console.log(calcResult.toFixed());

  let diagnosis = "";
  const progressWidth = document.querySelector(".progress-bar");
  const scale = document.querySelector(".label");
  const diagnosisText = document.querySelector(".diagnosis");

  if (calcResult.toFixed() < 18) {
    progressWidth.style.background = "#f63a0f";
    diagnosis = "Wygłodzenie";
    progressWidth.style.width = "25%";
    diagnosisText.style.color = "#1d3057";
  }
  if (calcResult.toFixed() > 18 && calcResult.toFixed() < 25) {
    progressWidth.style.background = "#86e01e";
    diagnosis = "Normalna masa ciała";
    progressWidth.style.width = "50%";
    diagnosisText.style.color = "#86e01e";
  }
  if (calcResult.toFixed() > 25 && calcResult.toFixed() < 30) {
    progressWidth.style.background = "#f27011";
    diagnosis = "Nadwaga";
    progressWidth.style.width = "75%";
    diagnosisText.style.color = "#f27011";
  }
  if (calcResult.toFixed() > 30) {
    progressWidth.style.background = "#ff2f00";
    diagnosis = "Otyłość";
    progressWidth.style.width = "100%";
    diagnosisText.style.color = "#ff2f00";
  }

  //

  if (!calcResult) {
    resultText.style.color = "red";
    resultText.textContent = "Uzupełnij dane !";
    height.style.border = "1px solid red";
    weight.style.border = "1px solid red";
  } else {
    resultText.textContent = `Twój wynik BMI: ${calcResult.toFixed(2)}`;
    diagnosisText.textContent = `${diagnosis}.`;
  }
  ///
}

function showResult() {
  resultBtn.addEventListener("click", () => {
    outputInfo();
  });
}
showResult();
