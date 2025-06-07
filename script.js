let allBtn = document.querySelectorAll(".btn");
let span = document.querySelector("span");
let start = false;
let level = 0;
let col = ["red", "green", "blue", "yellow"];
let comSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let highestScore = 0;
document.addEventListener("keypress", () => {
  if (!start) {
    levelUp();
    start = true;
  }
});

const flash = (ele, cName) => {
  ele.classList.add(cName);
  setTimeout(() => ele.classList.remove(cName), 400);
};

function resetGame() {
  span.innerText = `|| Highest Score : ${highestScore}`;
  span.style.fontSize = "20px";
  level = 0;
  comSeq = [];
  userSeq = [];
  h2.innerText = "Press any key to restart game";
  start = false
}

function checkSequence(index) {
  if (comSeq[index] === userSeq[index]) { //* check individual steps of userSeq and comSeq
    if (comSeq.length == userSeq.length) { //* check user enter right number of pair existing in comSeq
      levelUp();
      if(highestScore < level) highestScore = level;
    }
  } else {
    flash(body, "redFlash");
    h2.innerText = `Your game over! Score is ${level}`;
    setTimeout(() => resetGame(), 2000);
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let random = col[Math.floor(Math.random() * col.length)];
  let randomBtn = document.querySelector(`.${random}`);
  flash(randomBtn, "whiteFlash");
  comSeq.push(`${random}`);
}

allBtn.forEach((e) => {
  e.addEventListener("click", () => {
    flash(e, "greenFlash");
    userSeq.push(e.id);
    checkSequence(userSeq.length - 1);
  });
});
