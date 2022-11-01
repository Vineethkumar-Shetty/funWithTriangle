const baseInput = document.querySelector("#base-input");
const heightInput = document.querySelector("#height-input");
const btnContainer = document.querySelector(".btn-container");
const output = document.querySelector(".output-section");

function displayOutput(hypoVal) {
  output.innerHTML = `The length of hypotenuse is 
  <span>${hypoVal}</span>`;
}

function displayErrorMsgToUser(msg) {
  output.innerHTML = `<span style="color:red">${msg}</span>`;
}

function squared(num) {
  return num ** 2;
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!("btn" in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const base = baseInput.valueAsNumber;
  const height = heightInput.valueAsNumber;
  if (btnClicked === "clear") {
    baseInput.value = "";
    heightInput.value = "";
    output.innerText = "";
    return;
  }

  if (!(baseInput.value && heightInput.value)) {
    displayErrorMsgToUser("Please fill all input fields 🙏");
    return;
  }
  if (baseInput.value <= 0 || heightInput.value <= 0) {
    displayErrorMsgToUser("Values can't be zero or negative ❌");
    return;
  }

  const hypotenuse = Math.sqrt(squared(base) + squared(height)).toFixed(2);
  displayOutput(hypotenuse);
}

btnContainer.addEventListener("click", handleContainerClick);

[...document.querySelectorAll("input")].forEach((singleInput) => {
  singleInput.addEventListener("click", () => {
    output.innerText = "";
  });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  const scrollHeight = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;
  if (scrollHeight > headerHeight) {
    header.classList.add("fixed-nav");
  } else {
    header.classList.remove("fixed-nav");
  }
});
