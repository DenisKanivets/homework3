import { players } from './index';

export const LOCALSTORAGE_WINNERS_KEY = 'winners';

export function getWinners() {
    return players.filter(player => player.wins > 0);
}

export function saveWinnersToLocalStorage() {
    const winnersFromLocalStorage = getWinnersFromLocalStorage();
    const winners = getWinners();
    const winnersFromLocalStorageWithoutCurrentWinners = winnersFromLocalStorage.filter(winnerFromLocalStorage => {
        return !winners.some(winner => winnerFromLocalStorage.name === winner.name);
    })

    const updatedWinnersFromLocalStorage = [...winnersFromLocalStorageWithoutCurrentWinners, ...winners];
    localStorage.setItem(LOCALSTORAGE_WINNERS_KEY, JSON.stringify(updatedWinnersFromLocalStorage));
}

export function getWinnersFromLocalStorage() {
    return localStorage.getItem(LOCALSTORAGE_WINNERS_KEY) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_WINNERS_KEY)) : [];
} 