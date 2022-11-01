const data = [
  {
    question:
      "What is the third angle for the triangle where angle1 = 45° and angle2 = 45°?",
    options: ["45°", "30°", "60°", "90°"],
    correctOption: "d",
  },
  {
    question:
      "What is the type of the triangle when angle1 = 45° and angle2 = 45°?",
    options: ["obtuse", "acute", "right"],
    correctOption: "c",
  },
  {
    question: "A triangle can have ______",
    options: ["one right angle", "two right angles"],
    correctOption: "a°",
  },
  {
    question: "Which of the following sides can form a right angled triangle?",
    options: ["14, 15, 26", "1, 2, 3", "12, 16, 20", "5, 7, 8"],
    correctOption: "c",
  },
  {
    question: "Which of the following triangles are always similar?",
    options: [
      "Equilateral triangle",
      "Isosceles triangle",
      "Right angled Triangle",
    ],
    correctOption: "a",
  },
  {
    question:
      "If one angle of a triangle is obtuse, then which one of the following is the possible measure of remaining angles?",
    options: ["100°", "85°", "35°"],
    correctOption: "a",
  },
  {
    question:
      "If the largest angle in a triangle is 70°, what is the least possible value of the smallest angle of the triangle?",
    options: ["30°", "10°"],
    correctOption: "a",
  },
  {
    question: "The perimeter of scalene triangle with sides a, b, c is _____",
    options: ["a + b + c", "2a", "None of these"],
    correctOption: "a",
  },
  {
    question: "A scalene triangle has ___ lines of symmetry",
    options: ["2", "no", "15"],
    correctOption: "b",
  },
  {
    question:
      "There is a right triangle PQR where: angle Q = 90°; angle P = angle R. What is the measure of angles P and R?",
    options: ["85°", "65°", "45°"],
    correctOption: "c",
  },
];

const quizCenter = document.querySelector(".questions-center");
const output = document.querySelector(".output-section");

function charToNum(char) {
  return char.toUpperCase().charCodeAt(0) - 65;
}

function displayQuiz(quizData) {
  const myQuizes = quizData
    .map(({ question, options, correctOption }, i) => {
      return `
      <article class="question-article">
        <p>Q.${i + 1} ${question}</p>
        <div class="options-div" data-ans="${
          options[charToNum(correctOption)]
        }">
        ${[...options]
          .map((option, j) => {
            return `          
            <label for="${i + 1}${j + 1}">
              <input type="radio" name="question-${
                i + 1
              }" value="${option}" id="${i + 1}${j + 1}" /> ${option}</label>
          `;
          })
          .join("")}
        </div>
      </article>
      `;
    })
    .join("");

  quizCenter.innerHTML = `
    ${myQuizes}
    `;

  return quizCenter;
}

function handleSubmit(e) {
  e.preventDefault();
  console.log("Clicked", e.target);
  let score = 0;
  const formData = new FormData(e.currentTarget);

  const userSelectedAns = [];
  for (const entry of formData.entries()) {
    userSelectedAns.push(entry);
  }
  const updatedUserSelectedAns = userSelectedAns.map(([questionNo, ans]) => {
    return [questionNo.split("-")[1], ans];
  });
  const userAns = Object.fromEntries(updatedUserSelectedAns);
  for (const single in userAns) {
    const indexToSearch = Number(single) - 1;
    const correctAns =
      data[indexToSearch].options[charToNum(data[indexToSearch].correctOption)];
    if (correctAns === userAns[single]) {
      score++;
    }
  }

  output.innerHTML = `
    Your score is <span style="color:${
      score > 5 ? "green" : "red"
    }">${score}</span> / ${data.length} ${score > 5 ? "🎉" : "😟"}
    `;
}

function handleClear() {
  const allRadioInputs = document.querySelectorAll('[type="radio"]');
  allRadioInputs.forEach((input) => {
    input.checked = false;
  });
  output.innerHTML = "";
}

window.addEventListener("DOMContentLoaded", () => {
  displayQuiz(data);
  const form = document.querySelector(".quiz-section");
  form.addEventListener("submit", handleSubmit);
});

[...document.querySelectorAll(".btn")][1].addEventListener(
  "click",
  handleClear
);

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
