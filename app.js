const allBtn = document.querySelectorAll('button');
const svg = document.querySelectorAll('.svgObj');
const rulesContainer = document.querySelector('.rulesContainer');
const container = document.querySelector('.container');
const gameMap = document.querySelector('.gameMap');
const youPicked = document.querySelector('.youPicked');
const housePicked = document.querySelector('.housePicked');
const rps = document.querySelectorAll('.gameMap button');
const step2 = document.querySelector('.step2');
const result = document.querySelector('.result');
const playAgain = document.querySelector('.result .playAgain');
const resultLabel = document.querySelector('.resultLabel');
const rpsList = [];

let score = document.querySelector('.scoreScore');

if (
  !localStorage.getItem('score')
    ? (score.innerHTML = 0)
    : (score.innerHTML = localStorage.getItem('score'))
);

rps.forEach(e => rpsList.push(e.id));
let randomItem = rpsList[Math.floor(Math.random() * rpsList.length)];

allBtn.forEach(btn => {
  btn.closest('button').addEventListener('click', () => {
    let you = btn.id;
    let house = randomItem;
    if (btn.id === 'again') {
      gameMap.style.display = 'block';
      step2.style.display = 'none';
      randomItem = rpsList[Math.floor(Math.random() * rpsList.length)];
      console.log(randomItem);
    }
    if (btn.id === 'btnRules') {
      rulesContainer.style.display = 'flex';
      container.style.opacity = '0.2';
      container.style.transition = 'all 3s ease';
    }
    if (btn.id === 'x') {
      rulesContainer.style.display = 'none';
      container.style.opacity = '1';
    }
    if (btn.id === 'rock' || btn.id === 'paper' || btn.id == 'scissors') {
      gameMap.style.display = 'none';
      step2.style.display = 'flex';

      youPicked.innerHTML = `YOU PICKED
          <div class="btn${btn.id}-border">
            <button class="btnItem" >
              <object data="./images/icon-${btn.id}.svg" type=""></object>
            </button>      
          </div>
      `;
      housePicked.innerHTML = `HOUSE PICKED
          <div class="btn${randomItem}-border">
            <button class="btnItem" >
              <object data="./images/icon-${randomItem}.svg" type=""></object>
            </button>      
          </div>
      `;
    }

    if (
      (you === 'rock' && house === 'scissors') ||
      (you === 'scissors' && house === 'paper') ||
      (you === 'paper' && house === 'rock')
    ) {
      score.innerHTML++;
      localStorage.setItem('score', score.innerHTML);
      playAgain.style.color = 'hsl(230, 89%, 62%)';
      resultLabel.innerHTML = 'You Win';
    } else if (
      (you === 'scissors' && house === 'scissors') ||
      (you === 'rock' && house === 'rock') ||
      (you === 'paper' && house === 'paper')
    ) {
      resultLabel.innerHTML = 'Equal';
      playAgain.style.color = 'hsl(39, 89%, 49%)';
    } else if (
      (you === 'scissors' && house === 'rock') ||
      (you === 'paper' && house === 'scissors') ||
      (you === 'rock' && house === 'paper')
    ) {
      resultLabel.innerHTML = 'You Lose';
      playAgain.style.color = 'hsl(349, 71%, 52%)';
      if (score.innerHTML == 0 ? (score.innerHTML = 0) : score.innerHTML--);
      localStorage.setItem('score', score.innerHTML);
    }
  });
});
