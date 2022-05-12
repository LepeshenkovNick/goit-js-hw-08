import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const KEY = 'videolayer-current-time';

const player = new Player('vimeo-player');
const key = localStorage.getItem(KEY);
if (key) {
    player.setCurrentTime(parseFloat(key));
}

player.on(
    'timeupdate',
    throttle(data => {
        localStorage.setItem(KEY, data.seconds.toString());
    }, 1000),
);
