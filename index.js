const angleOneInput = document.querySelector("#ang-one-input");
const angleTwoInput = document.querySelector("#ang-two-input");
const angleThreeInput = document.querySelector("#ang-three-input");
const btnContainer = document.querySelector(".btn-container");
const output = document.querySelector(".output-section");

function angleLessThan360OrNot(angle) {
  return angle < 360 ? angle : angle % 360;
}

function displayOutput(msg, color) {
  output.innerHTML = `
  <span style="color: ${color ? "green" : "red"}">
    ${msg}
  </span>
  `;
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!("btn" in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const angle1 = angleOneInput.valueAsNumber;
  const angle2 = angleTwoInput.valueAsNumber;
  const angle3 = angleThreeInput.valueAsNumber;
  const referenceAngle1 = angleLessThan360OrNot(angle1);
  const referenceAngle2 = angleLessThan360OrNot(angle2);
  const referenceAngle3 = angleLessThan360OrNot(angle3);
  if (btnClicked === "clear") {
    angleOneInput.value = "";
    angleTwoInput.value = "";
    angleThreeInput.value = "";
    output.innerText = "";
    return;
  }

  if (!(angleOneInput.value && angleTwoInput.value && angleThreeInput.value)) {
    displayOutput("Please fill all input fields !!!", false);
    return;
  }
  if (
    angleOneInput.value <= 0 ||
    angleTwoInput.value <= 0 ||
    angleThreeInput.value <= 0
  ) {
    displayOutput("Angle of a 🔼can't be zero or negative ➖", false);
    return;
  }

  const sumOfAllAngles = referenceAngle1 + referenceAngle2 + referenceAngle3;
  const complementary = sumOfAllAngles === 180;
  const shownAngles = [angle1, angle2, angle3]
    .map((item) => {
      return `${item}°`;
    })
    .join(", ");
  const shownReferenceAngles = [
    referenceAngle1,
    referenceAngle2,
    referenceAngle3,
  ]
    .map((item) => {
      return `${item}°`;
    })
    .join(", ");
  if (complementary) {
    displayOutput(
      `Congratulations, your angles ${shownAngles} i.e. (${shownReferenceAngles}) forms a triangle.`,
      true
    );
  } else {
    displayOutput(
      `Oops, your angles ${shownAngles} i.e. (${shownReferenceAngles}) doesn't form a triangle.`,
      false
    );
  }
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
