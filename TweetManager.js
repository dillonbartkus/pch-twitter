import { statuses as tweetData } from './pch_twitter_response.json';
import { statuses as tweetDataTwo } from './pch_twitter_response_two.json';
import Tweet from './Tweet';

export default class TweetManager {
    static getTweets() {
        // "fetch" the twitter data
        this.tweets = this.pageNo === 1 ? tweetData.slice(0, 8) : tweetDataTwo.slice(0, 8);
        return this.tweets;
    }

    static renderTweets() {
        return this.tweets.map((tweet, ind) => {
            const { text, user: { screen_name, profile_image_url } } = tweet;
            const newTweet = new Tweet({ text, screen_name, profile_image_url });
            newTweet.construct(ind)
        })
    }

    static clearTweets() {
        const tweets = document.querySelectorAll('.tweet-wrapper');
        [...tweets].forEach(tweet => tweet.outerHTML = "");
    }

    static reformatTweets() {
        const mobileRegEx = window.navigator.userAgent.match(/Mobile/g);

        if (window.innerWidth < 650 && this.tweets.length > 5) {
            this.clearTweets();
            this.tweets = this.tweets.slice(0, 4);
            this.renderTweets();

            // add gesture events for mobile
            if (mobileRegEx?.length) {
                const tweetWrappers = document.querySelectorAll('.tweet-wrapper');
                tweetWrappers.forEach(wrapper => {
                    wrapper.childNodes[0].addEventListener('click', () => {
                        wrapper.childNodes[0].classList.toggle('touch')
                        setTimeout(() => wrapper.childNodes[0].classList.toggle('touch'), 500)
                    });

                    wrapper.addEventListener('touchmove', e => {
                        const swipe = e.touches[0].clientX;
                        if (swipe > window.innerWidth) {
                            wrapper.classList.add('swipe-right');
                            setTimeout(() => wrapper.remove(), 500);
                        }
                        if (swipe < 0) {
                            wrapper.classList.add('swipe-left');
                            setTimeout(() => wrapper.remove(), 500);
                        }
                    });
                });
            }
        }

        if (window.innerWidth > 650 && this.tweets.length < 5) {
            this.clearTweets();
            this.getTweets();
            this.renderTweets();
        }
    }

    static refreshTweets() {
        // if it's not the first time fetching, increment page no to fetch new tweets
        if (this.tweets.length) { this.pageNo++ };
        this.clearTweets();
        this.getTweets();
        this.renderTweets();
        this.reformatTweets();
    }

    static startRefreshTimer() {
        return this.refreshTimer = setInterval(() => {
            this.refreshTweets()
        }, 10000)
    }

    static stopRefreshTimer() {
        clearInterval(this.refreshTimer);
    }

    static refreshTimer = null;
    static tweets = [];
    // I used this to simulate the refresh, by fetching different tweets according to page number var
    static pageNo = 1;
}