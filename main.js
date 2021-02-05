import "@babel/polyfill";
import TweetManager from "./TweetManager";

TweetManager.refreshTweets();

const refreshButton = document.querySelector('.refresh');

refreshButton.addEventListener('click', () => {
    refreshButton.classList.toggle('rotate');
    setTimeout(() => refreshButton.classList.toggle('rotate'), 500);

    TweetManager.refreshTweets();
    TweetManager.stopRefreshTimer();
    TweetManager.startRefreshTimer();
});

window.addEventListener('resize', () => TweetManager.reformatTweets());

TweetManager.startRefreshTimer();