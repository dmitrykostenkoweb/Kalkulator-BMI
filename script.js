// variables

const weight = document.getElementById("weight");
const height = document.getElementById("height");

const errorMassage = document.querySelector(".result-title");

const calculationHandler = document.querySelector("#result-btn");
const bmi = document.querySelector(".result-text");
const progressWidth = document.querySelector(".progress-bar");

const diagnosis = document.querySelector(".diagnosis");
const descriptionText = document.querySelector(".description-text");

const textData = {
  wyglodzenie:
    "Inny tekst w przypadku Wygłodzenie.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  wychudzenie:
    "Inny tekst w przypadku Wychudzenie.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  niedowaga:
    "Inny tekst w przypadku Niedowaga.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta. ",
  wagaPrawidlowa:
    "Inny tekst w przypadku Waga prawidłowa.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  nadwaga:
    "Inny tekst w przypadku Nadwaga.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  stopienOtylosci1:
    "Inny tekst w przypadku 1 stopień otyłości.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  stopienOtylosci2:
    "Inny tekst w przypadku 2 stopień otyłości.  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej  wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
  stopienOtylosci3:
    "Inny tekst w przypadku 3 stopień otyłości (otyłość skrajna).  Niestety Twoja waga jest nieprawidłowa. Musisz zadbać o stan swojej    wagi. Jednym ze sposobów poprawy wagi to prawidłowa dieta.",
};
// debounce
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
// wrongData
const wrongData = (element) => {
  if (element) {
    element.style.border = "2px solid red";
    errorMassage.textContent = "Złe dane !";
    errorMassage.style.color = "red";
    bmi.style.display = "none";
    calculationHandler.disabled = true;
  }
};

// correctData
const correctData = (element) => {
  if (element) {
    element.style.border = "";
    errorMassage.textContent = "Twój wynik BMI:";
    errorMassage.style.color = "";
    bmi.style.display = "";
    calculationHandler.disabled = false;
  }
};

// validation
const validation = () => {
  const reg = new RegExp("^[0-9]+$");
  const inputsArr = [weight, height];

  inputsArr.forEach((input) => {
    input.addEventListener("input", (event) => {
      if (!input.value.match(reg) || input.value > 500 || input.value < 20) {
        debounce(wrongData(input), 2000);
      } else {
        correctData(input);
      }
    });
  });
};
validation(); //call

////////////////////////////////////////////////////////////////////////////////////
function output() {
  descriptionText.style.transform = "";
  diagnosis.style.transform = "";

  let calcResult = weight.value / ((height.value / 100) * (height.value / 100));
  console.log(calcResult);

  if (calcResult) {
    const step = 0.09;
    const time = 0;
    let num = 0;
    let t = Math.round(time / (calcResult.toFixed(2) / step));

    let interval = setInterval(() => {
      num = num + step;
      if (num >= calcResult.toFixed(2)) {
        clearInterval(interval);

        setTimeout(() => {
          bmi.textContent = calcResult.toFixed(2);
        }, 1);
      }
      bmi.textContent = `${num.toFixed(2)}`;
    }, t);
  } else {
    wrongData();
  }

  function calc(color, diagnosisText, progress, description) {
    let percent = progress + calcResult / 2;
    if (percent > 100) {
      percent = 99;
    }
    progressWidth.style.width = `${percent}%`;
    progressWidth.style.background = color;
    diagnosis.innerHTML = `Twój wynik to ${diagnosisText.toLocaleLowerCase()}!`;
    diagnosis.style.color = color;
    bmi.style.color = color;
    descriptionText.innerHTML = `${description}`;
  }

  function conditions() {
    if (calcResult <= 16) {
      calc("#1d3057", "Wygłodzenie", 8, textData.wyglodzenie);
    }
    if (calcResult >= 16 && calcResult < 17) {
      calc("#3a63b5", "Wychudzenie", 20, textData.wychudzenie);
    }
    if (calcResult >= 17 && calcResult < 18.5) {
      calc("#369adc", "Niedowaga", 35, textData.niedowaga);
    }
    if (calcResult >= 18.5 && calcResult < 25) {
      calc("#68a13a", "Waga prawidłowa", 40, textData.wagaPrawidlowa);
    }
    if (calcResult >= 25 && calcResult < 30) {
      calc("#e66a17", "Nadwaga", 50, textData.nadwaga);
    }
    if (calcResult >= 30 && calcResult < 35) {
      calc("#e84600", "1 stopień otyłości", 70, textData.stopienOtylosci1);
    }
    if (calcResult >= 35 && calcResult < 40) {
      calc("#b83e09", "2 stopień otyłości", 85, textData.stopienOtylosci2);
    }
    if (calcResult >= 40) {
      calc(
        "#8a300a",
        "3 stopień otyłości (otyłość skrajna)",
        90,
        textData.stopienOtylosci3
      );
    }
  }
  ///Animation
  function animation() {
    diagnosis.classList.add("active");
    descriptionText.classList.add("active");
  }
  setTimeout(conditions, 1000);

  setTimeout(animation, 500);
}

function reset() {
  weight.value = "";
  height.value = "";
  bmi.innerHTML = "00:00";
  bmi.style.color = "#999";
  progressWidth.style.width = `0%`;
  descriptionText.style.transform = "translateX(-2000%)";
  diagnosis.style.transform = "translateX(2000%)";
}

function doThis(event) {
  if (!isClick && weight.value && height.value) {
    calculationHandler.innerHTML = "Reset";
    isClick = true;
    output();
  } else {
    calculationHandler.innerHTML = "Przelicz";
    isClick = false;
    reset();
    correctData();
  }

  if (!isClick) {
    height.disabled = false;
    weight.disabled = false;
  } else {
    weight.disabled = true;
    height.disabled = true;
  }
}

let isClick = false;

calculationHandler.addEventListener("click", () => {
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
