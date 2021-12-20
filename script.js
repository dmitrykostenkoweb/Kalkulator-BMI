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
  const res = calcResult.toFixed();
  if (res <= 16) {
    progressWidth.style.background = "#1d3057";
    diagnosis = "Wygłodzenie";
    progressWidth.style.width = `${10 + res / 2}%`;
    diagnosisText.style.color = "#1d3057";
  }
  if (res > 16 && res <= 17) {
    progressWidth.style.background = "#3a63b5";
    diagnosis = "Wychudzenie";
    progressWidth.style.width = `${20 + res / 2}%`;
    diagnosisText.style.color = "#3a63b5";
  }
  if (res > 17 && res <= 18.5) {
    progressWidth.style.background = "#369adc";
    diagnosis = "Niedowaga";
    progressWidth.style.width = `${35 + res / 2}%`;
    diagnosisText.style.color = "#369adc";
  }
  if (res > 18.5 && res <= 25) {
    progressWidth.style.background = "#68a13a";
    diagnosis = "Waga prawidłowa";
    progressWidth.style.width = `${40 + res / 2}%`;
    diagnosisText.style.color = "#68a13a";
  }
  if (res > 25 && res <= 30) {
    progressWidth.style.background = "#e66a17";
    diagnosis = "Nadwaga";
    progressWidth.style.width = `${50 + res / 2}%`;
    diagnosisText.style.color = "#e66a17";
  }
  if (res > 30 && res <= 35) {
    progressWidth.style.background = "#e84600";
    diagnosis = "I stopień otyłości";
    progressWidth.style.width = `${70 + res / 2}%`;
    diagnosisText.style.color = "#e84600";
  }
  if (res > 35 && res <= 40) {
    progressWidth.style.background = "#b83e09";
    diagnosis = "II stopień otyłości";
    progressWidth.style.width = `${85 + res / 2}%`;
    diagnosisText.style.color = "#b83e09";
  }
  if (res >= 40) {
    progressWidth.style.background = "#8a300a";
    diagnosis = "III stopień otyłości (otyłość skrajna)";
    let maxPercent = 90 + res / 10;
    if (maxPercent > 100) {
      maxPercent = 99;
    }
    progressWidth.style.width = `${maxPercent}%`;
    diagnosisText.style.color = "#8a300a";
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
  weight.addEventListener("keydown", (event) => {
    doThis(event);
  });
  height.addEventListener("keydown", (event) => {
    doThis(event);
  });

  function doThis(event) {
    if (event.key === "Enter") {
      console.log("do this");
      outputInfo();
    }
  }
}
showResult();
