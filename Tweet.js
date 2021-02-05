import avatar1 from './images/avatar1.png';
import avatar2 from './images/avatar2.png';
import avatar3 from './images/avatar3.png';
import avatar4 from './images/avatar4.png';
import avatar5 from './images/avatar5.png';
import avatar6 from './images/avatar6.png';
import avatar7 from './images/avatar7.png';
import avatar8 from './images/avatar8.png';
import avatar9 from './images/avatar9.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

export default class Tweet {
    constructor(tweet) {
        this.text = tweet.text;
        this.screen_name = tweet.screen_name;
        this.profile_image_url = tweet.profile_image_url;
    }

    construct(ind) {
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

        Object.keys(this).forEach((key) => {
            const value = this[key];

            const el = document.createElement(key === 'profile_image_url' ? 'img' : 'p');
            el.classList.add(key);
            if (key === 'profile_image_url') {
                el.setAttribute('src', value);
                // fall back to default user pic in case of invalid src
                el.onerror = () => el.setAttribute('src', `${avatars[ind]}`);
                el.classList.add('avatar');
                tweet.appendChild(el);
            } else {
                if (key === 'screen_name') {
                    el.textContent = `@${value}`;
                    el.addEventListener('click', () => {
                        window.open(`https://www.twitter.com/${value}`)
                    });
                }
                if (key === 'text') {
                    el.textContent = value;
                }
                textContainer.appendChild(el);
            }
        })
    }
}