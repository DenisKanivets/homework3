/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const Gamer = function () {
    this.getName = function getName() {
        const name = prompt('Please, enter player name') || getName();
        return name;
    }

    this.setScore = function (score) {
        this.score = score;
    }

    this.getScore = function () {
        return this.score;
    }

    this.resetScore = function () {
        this.setScore(0);
    }
}

const Player = function () {
    this.name = this.getName();
    this.score = 0;
}

Player.prototype = new Gamer();

const RESET_VALUE = 1;

let players = [];
let activePlayer = 0;
let current = 0;
const diceElement = document.querySelector('.dice');
const diceElement2 = document.querySelector('.dice2');
const limit = document.getElementById('limit');

const initGame = () => {
    players = [
        new Player(),
        new Player(),
    ];
    document.querySelector('#name-0').textContent = players[0].name;
    document.querySelector('#name-1').textContent = players[1].name;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = players[0].getScore();
    document.querySelector('#score-1').textContent = players[1].getScore();
    diceElement.style.display = 'none';
    diceElement2.style.display = 'none';
};

initGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    diceElement.src = `dice-${dice}.png`;
    diceElement.style.display = 'block';

    diceElement2.src = `dice-${dice2}.png`;
    diceElement2.style.display = 'block';

    let limitNum = limit.value ? Number(limit.value) : 100;

    if (dice !== 2 && dice2 !== 2 && dice !== dice2) {
        current += dice + dice2;
        document.getElementById('current-' + activePlayer).textContent = current;

        if (players[activePlayer].getScore() + current >= limitNum) {
            alert(`${players[activePlayer].name} won!!!`);
        }

    } else {
        changePlayer();
    }
});

const changePlayer = () => {
    current = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer = +!activePlayer;
    diceElement.style.display = 'none';
    diceElement2.style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

document.querySelector('.btn-hold').addEventListener('click', function () {
    splayers[activePlayer].setScore(players[activePlayer].getScore() + current);
    document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
    changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function () {
    initGame();
});
