export default class Tweet {
    constructor(tweet) {
        this.text = tweet.text;
        this.screen_name = tweet.screen_name;
        this.profile_image_url = tweet.profile_image_url;
    }

    construct() {
        const feed = document.querySelector('.feed');

        const tweetWrapper = document.createElement('div');
        tweetWrapper.classList.add('tweet-wrapper');
        feed.appendChild(tweetWrapper);

        const tweet = document.createElement('div');
        tweet.classList.add('tweet');
        tweetWrapper.appendChild(tweet);
        tweet.classList.toggle('slide');
        setTimeout(() => tweet.classList.toggle('slide'), 500);

        const divider = document.createElement('div');
        divider.classList.add('divider');
        tweetWrapper.appendChild(divider);

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        tweet.appendChild(textContainer);

        for (const key in this) {
            const value = this[key];

            const el = document.createElement(key === 'profile_image_url' ? 'img' : 'p');
            el.classList.add(key);
            if (key === 'profile_image_url') {
                el.setAttribute('src', value);
                // fall back to default user pic in case of invalid src
                el.onerror = () => el.setAttribute('src', 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png');
                el.classList.add('avatar');
                tweet.appendChild(el);
            } else {
                el.textContent = (key === 'screen_name') ? `@${value}` : value;
                textContainer.appendChild(el)
            }
        }
    }
}