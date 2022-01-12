const weight = document.getElementById("weight");
const height = document.getElementById("height");
const resultBtn = document.querySelector("#result-btn");
const resultText = document.querySelector(".result-text");
const progressWidth = document.querySelector(".progress-bar");
const diagnosisText = document.querySelector(".diagnosis");
const wynik = document.querySelector(".wynik");
const wynikText = document.querySelector(".wynik-text");
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

//////////////////////////////////////////////////////////////////////////////////////
function output() {
  let calcResult = weight.value / ((height.value / 100) * (height.value / 100));
  const res = calcResult.toFixed();

  wynik.style.display = "";

  if (!res || weight.value < 10 || height.value < 60) {
    resultText.style.color = "red";
    resultText.textContent = "Złe dane !";
    height.style.border = "1px solid red";
    weight.style.border = "1px solid red";
    document.querySelector(".result-title").style.display = "none";
    wynikText.style.transform = "translateX(-2000%)";
    wynik.style.display = "none";
    return;
  } else {
    const step = 0.1;
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

  function calc(color, diagnosis, progress, translate) {
    progressWidth.style.background = color;
    diagnosisText.innerHTML = diagnosis;
    let percent = progress + res / 2;
    if (percent > 100) {
      percent = 99;
    }
    progressWidth.style.width = `${percent}%`;
    diagnosisText.style.color = color;
    resultText.style.color = color;
    wynik.innerHTML = `Twój wynik to ${diagnosis.toLocaleLowerCase()}!`;
    wynikText.style.transform = `translateX(${translate}%)`;
  }

  function conditions() {
    if (res <= 16) {
      calc("#1d3057", "Wygłodzenie", 8, 0);
    }
    if (res >= 16 && res < 17) {
      calc("#3a63b5", "Wychudzenie", 20, 0);
    }
    if (res >= 17 && res < 18.5) {
      calc("#369adc", "Niedowaga", 35, 0);
    }
    if (res >= 18.5 && res < 25) {
      calc("#68a13a", "Waga prawidłowa", 40, -2000);
    }
    if (res >= 25 && res < 30) {
      calc("#e66a17", "Nadwaga", 50, 0);
    }
    if (res >= 30 && res < 35) {
      calc("#e84600", "I stopień otyłości", 70, 0);
    }
    if (res >= 35 && res < 40) {
      calc("#b83e09", "II stopień otyłości", 85, 0);
    }
    if (res >= 40) {
      calc("#8a300a", "III stopień otyłości (otyłość skrajna)", 90, 0);
    }
  }

  setTimeout(conditions, 1000);
  ///Animation
  function animation() {
    wynik.classList.add("active");
    wynikText.classList.add("active");
  }
  setTimeout(animation, 1000);
  return calcResult;
}

function reset() {
  weight.value = "";
  height.value = "";
  resultText.innerHTML = "00:00";
  resultText.style.color = "#999";
  progressWidth.style.width = `0%`;
  diagnosis = "";
  wynik.textContent = "";
  wynikText.style.transform = "translateX(-2000%)";
  diagnosisText.innerHTML = "";
}

function doThis(event) {
  if (!isClick && weight.value && height.value) {
    resultBtn.innerHTML = "Reset";
    isClick = true;
    output();
  } else {
    resultBtn.innerHTML = "Przelicz";
    isClick = false;
    reset();
  }
}

let isClick = false;

resultBtn.addEventListener("click", () => {
  doThis();
});

weight.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    doThis();
  }
});
height.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    doThis();
  }
});
