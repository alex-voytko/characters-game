const refs = {
  characters: document.querySelector(".js-characters-container"),
  descr: document.querySelector(".js-descr-container"),
  winStats: document.querySelector(".js-win-stats-container"),
  btn: document.querySelector("#js-btn"),
};

const characters = ["конь", "овца", "собака", "лось", "тигр"];

function renderCharacterList(arr) {
  arr.map((el) =>
    refs.characters.insertAdjacentHTML(
      "beforeend",
      `<button class="btn" data-index="${arr.indexOf(el)}">${el}</button>`
    )
  );
}
renderCharacterList(characters);

function makeComputerChoise(arr) {
  let rand = 0 + Math.random() * (arr.length - 0);
  return Math.floor(rand);
}

refs.characters.addEventListener("click", chooseCharacter);

function chooseCharacter(e) {
  if (refs.descr.children.length) {
    refs.descr.firstChild.remove();
  }
  for (let i = 0; i < refs.characters.children.length; i++) {
    refs.characters.children[i].setAttribute("disabled", true);
  }
  const { index } = e.target.dataset;
  refs.descr.insertAdjacentHTML(
    "beforeend",
    `<p class="choose-character">You chose - <span>${characters[index]}</span></p>`
  );
  return gameProcessStart(
    characters,
    Number(index),
    makeComputerChoise(characters)
  );
}

function gameProcessStart(arr, userChoice, compChoice) {
  let userWinItems = [];
  if (userChoice === compChoice)
    return renderStats("Draw", "draw", arr[compChoice]);

  const findTheHalf = Math.floor(arr.length / 2);

  if (userChoice <= findTheHalf) {
    userWinItems = arr.slice(userChoice + 1, userChoice + findTheHalf + 1);
    return determineTheWinner(userWinItems, arr[compChoice]);
  } else {
    userWinItems = [...arr];
    userWinItems.splice(userChoice - findTheHalf, findTheHalf + 1);
    return determineTheWinner(userWinItems, arr[compChoice]);
  }
}

function determineTheWinner(winItems, compChoice) {
  if (winItems.includes(compChoice)) {
    return renderStats("Congratulations! You're a winner!", "win", compChoice);
  }
  return renderStats("Sorry, the computer has won", "lose", compChoice);
}

function renderStats(str, className, compChoice) {
  refs.descr.insertAdjacentHTML(
    "beforeend",
    `<p class="win-stats">The computer's choice was <span>${compChoice}</span></p>`
  );
  refs.winStats.insertAdjacentHTML(
    "beforeend",
    `<p class="win-stats ${className}">${str}</p><button class="btn">Play new game</button>`
  );
  refs.winStats.lastChild.addEventListener("click", onNewGameClick);
}

function onNewGameClick() {
  const { children } = refs.characters;
  for (let i = 0; i < children.length; i++) {
    children[i].removeAttribute("disabled");
  }
  refs.descr.innerHTML = "";
  refs.winStats.innerHTML = "";
}
