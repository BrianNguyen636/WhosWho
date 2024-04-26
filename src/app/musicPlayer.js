import {Howl} from 'howler'



var player = {
    isPlaying: false,
    playPause: function() {
        if (!this.isPlaying) {
            sound.play();
            this.isPlaying = true;
        } else {
            sound.pause();
            this.isPlaying = false;
        }
    },
    // load up new song
};
