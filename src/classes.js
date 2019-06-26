import { getWinnersFromLocalStorage } from './localStorage';

export const Gamer = function () {
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

    this.getPreviousWins = function () {
        const winners = getWinnersFromLocalStorage();
        const matchedPlayer = winners.find(winner => winner.name === this.name);
        if (!matchedPlayer) return 0;
        return confirm(`There is a player with the same name "${matchedPlayer.name}" and ${matchedPlayer.wins} wins. It's you?`) ? matchedPlayer.wins : false;
    }
}

export const Player = function () {
    this.name = this.getName();
    this.score = 0;
    this.wins = this.getPreviousWins();
}

Player.prototype = new Gamer();