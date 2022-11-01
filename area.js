const side1Input = document.querySelector('#sideOne-input');
const side2Input = document.querySelector('#sideTwo-input');
const side3Input = document.querySelector('#sideThree-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');

function squared(side) {
  return side ** 2;
}

function displayOutput(msg, condn) {
  output.innerHTML = `
  <span style="color: ${condn ? 'green' : 'red'}">
    ${msg}
  </span>
  `;
}

function displayErrorMsgToUser(text) {
  output.innerHTML = `
  <span style="color: red">
    ${text}
  </span>
  `;
}

function calculateAngleBetn(sideFacedAngle, sideOnRight, remainingSide) {
  const angle =
    (Math.acos(
      (squared(sideFacedAngle) +
        squared(sideOnRight) -
        squared(remainingSide)) /
        (2 * sideFacedAngle * sideOnRight)
    ) *
      180) /
    Math.PI;
  return angle || 0; // if angle is NaN returns 0
}

function isTriangle(a, b, c) {
  const angle13Alpha = calculateAngleBetn(b, c, a);
  const angle32Gamma = calculateAngleBetn(a, b, c);
  const angle23Beta = calculateAngleBetn(c, a, b);

  const sumOfAllAngles = Math.trunc(angle13Alpha + angle32Gamma + angle23Beta);
  // console.log(angle13Alpha + angle32Gamma + angle23Beta); //180.0000000003
  if (sumOfAllAngles === 180) {
    return true;
  } else {
    return false;
  }
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!('btn' in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const side1 = side1Input.valueAsNumber;
  const side2 = side2Input.valueAsNumber;
  const side3 = side3Input.valueAsNumber;
  if (btnClicked === 'clear') {
    side1Input.value = '';
    side2Input.value = '';
    side3Input.value = '';
    output.innerText = '';
    return;
  }

  if (!(side1Input.value && side2Input.value && side3Input.value)) {
    displayErrorMsgToUser('Please fill all input fields 🙏');
    return;
  }
  if (side1Input.value <= 0 || side2Input.value <= 0 || side3Input.value <= 0) {
    displayErrorMsgToUser("Sides can't be negative or zero ❌");
    return;
  }

  const semiPerimeter = (side1 + side2 + side3) / 2;
  const area = Math.sqrt(
    semiPerimeter *
      (semiPerimeter - side1) *
      (semiPerimeter - side2) *
      (semiPerimeter - side3)
  ).toFixed(2);

  // console.log(parseInt(area));
  // if sides are 10, 12, 22, then we get 0.00 sq.units, following to handle that
  if (!isTriangle(side1, side2, side3) || parseInt(area) === 0) {
    displayOutput(
      `Sides ${side1}, ${side2} & ${side3} doesn't form a triangle after using Law of Cosines`,
      false
    );
    return;
  }

  displayOutput(
    `Sides ${side1}, ${side2} & ${side3} forms a triangle and using Heron's Formula, the area is ${area} sq.units`,
    true
  );
}

btnContainer.addEventListener('click', handleContainerClick);

[...document.querySelectorAll('input')].forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    output.innerText = '';
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
  const scrollHeight = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;
  if (scrollHeight > headerHeight) {
    header.classList.add('fixed-nav');
  } else {
    header.classList.remove('fixed-nav');
  }
});