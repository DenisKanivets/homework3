import { Gamer, Player } from './classes';
import { saveWinnersToLocalStorage, updatedWinnersFromLocalStorage, getWinnersFromLocalStorage } from './localStorage';

export let players = [];
Player.prototype = new Gamer();

const RESET_VALUE = 1;

let activePlayer = 0;
let current = 0;
const diceElement = document.querySelector('.dice');
const diceElement2 = document.querySelector('.dice2');
const limit = document.getElementById('limit');
const showWinnersBtn = document.getElementById('winners');

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

    diceElement.src = `img/dice-${dice}.png`;
    diceElement.style.display = 'block';

    diceElement2.src = `img/dice-${dice2}.png`;
    diceElement2.style.display = 'block';

    let limitNum = limit.value ? Number(limit.value) : 100;

    if (dice !== 2 && dice2 !== 2 && dice !== dice2) {
        current += dice + dice2;
        document.getElementById('current-' + activePlayer).textContent = current;

        if (players[activePlayer].getScore() + current >= limitNum) {
            players[activePlayer].wins += 1;
            saveWinnersToLocalStorage();
            alert(`${players[activePlayer].name} won!!!`);
        }

    } else {
        changePlayer();
    }
});

showWinnersBtn.addEventListener('click', function () {
    const winners = getWinnersFromLocalStorage();
    let message = 'Nobody wins yet';

    if (winners.length) {
        message = winners
            .sort((a, b) => b.wins - a.wins)
            .map(player => `${player.wins} - ${player.name}`)
            .join('\n');
    }

    alert(message);
})

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
