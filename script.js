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

  let diagnosis = "";
  const progressWidth = document.querySelector(".progress-bar");
  const scale = document.querySelector(".label");
  const diagnosisText = document.querySelector(".diagnosis");
  const res = calcResult.toFixed();
  const wynik = document.querySelector(".wynik");
  const wynikText = document.querySelector(".wynik-text");
  wynik.style.display = "";
  function conditions() {
    if (res <= 16) {
      progressWidth.style.background = "#1d3057";
      diagnosis = "Wygłodzenie";
      progressWidth.style.width = `${10 + res / 2}%`;
      diagnosisText.style.color = "#1d3057";
      resultText.style.color = "#1d3057";
      wynikText.style.transform = "translateX(0%)";
    }
    if (res > 16 && res <= 17) {
      progressWidth.style.background = "#3a63b5";
      diagnosis = "Wychudzenie";
      progressWidth.style.width = `${20 + res / 2}%`;
      diagnosisText.style.color = "#3a63b5";
      resultText.style.color = "#3a63b5";
      wynikText.style.transform = "translateX(0%)";
    }
    if (res > 17 && res <= 18.5) {
      progressWidth.style.background = "#369adc";
      diagnosis = "Niedowaga";
      progressWidth.style.width = `${35 + res / 2}%`;
      diagnosisText.style.color = "#369adc";
      resultText.style.color = "#369adc";
      wynikText.style.transform = "translateX(0%)";
    }
    if (res > 18.5 && res <= 25) {
      progressWidth.style.background = "#68a13a";
      diagnosis = "Waga prawidłowa";
      progressWidth.style.width = `${40 + res / 2}%`;
      diagnosisText.style.color = "#68a13a";
      resultText.style.color = "#68a13a";
      wynikText.style.transform = "translateX(-2000%)";
    }
    if (res > 25 && res <= 30) {
      progressWidth.style.background = "#e66a17";
      diagnosis = "Nadwaga";
      progressWidth.style.width = `${50 + res / 2}%`;
      diagnosisText.style.color = "#e66a17";
      resultText.style.color = "#e66a17";
      wynikText.style.transform = "translateX(0%)";
    }
    if (res > 30 && res <= 35) {
      progressWidth.style.background = "#e84600";
      diagnosis = "I stopień otyłości";
      progressWidth.style.width = `${70 + res / 2}%`;
      diagnosisText.style.color = "#e84600";
      resultText.style.color = "#e84600";
      wynikText.style.transform = "translateX(0%)";
    }
    if (res > 35 && res <= 40) {
      progressWidth.style.background = "#b83e09";
      diagnosis = "II stopień otyłości";
      let maxPercent = 85 + res / 10;
      if (maxPercent > 100) {
        maxPercent = 99;
      }
      progressWidth.style.width = `${maxPercent}%`;
      diagnosisText.style.color = "#b83e09";
      resultText.style.color = "#b83e09";
      wynikText.style.transform = "translateX(0%)";
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
      wynikText.style.transform = "translateX(0%)";
    }

    diagnosisText.textContent = `${diagnosis}`;
    wynik.textContent = `Twój wynik to ${diagnosis.toLocaleLowerCase()}!`;
  }
  const progressTimeout = setTimeout(conditions, 1000);

  //

  if (!calcResult) {
    resultText.style.color = "red";
    resultText.textContent = "Uzupełnij dane !";
    height.style.border = "1px solid red";
    weight.style.border = "1px solid red";
    document.querySelector(".result-title").style.display = "none";
    wynikText.style.transform = "translateX(-2000%)";
    wynik.style.display = "none";
  } else {
    const step = 0.09;
    const time = 1000;
    let num = 0;
    let t = Math.round(time / (calcResult.toFixed(2) / step));
    let interval = setInterval(() => {
      num = num + step;
      if (num >= calcResult.toFixed(2)) {
        clearInterval(interval);
      }
      resultText.textContent = `${num.toFixed(2)}`;
    }, t);
  }
  ///
  function animation() {
    wynik.classList.add("active");
    wynikText.classList.add("active");
  }

  const animationTimeout = setTimeout(animation, 1000);
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
      outputInfo();
    }
  }
}
showResult();
