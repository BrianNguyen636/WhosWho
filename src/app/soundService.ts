import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sound: Howl | undefined;
  private isPlaying = true;

  setSound(sound: Howl) {
    this.sound = sound;
  }

  getSound() {
    return this.sound;
  }

  setPlaying(tF: boolean) {
    this.isPlaying = tF;
  }

  getPlaying() {
    return this.isPlaying;
  }

  playPause(){
    if (this.sound) {
      if (!this.isPlaying) {
        this.sound.play();
        this.setPlaying(true);
      } else {
        this.sound.pause();
        this.setPlaying(false);
      }
    } else {
      console.error("Sound object is undefined");
    }
  }
  turnUp(){
    if (this.sound){
      if(this.getPlaying()){
        this.sound.volume(this.sound.volume() + .05)
      }
    }
  }
  turnDown(){
    if (this.sound){
      if(this.getPlaying()){
        this.sound.volume(this.sound.volume() - .05)
      }
    }
  }
}