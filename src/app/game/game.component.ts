import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/services/state';
import fetchFromSpotify, { request } from "../../services/api";
import {Howl} from 'howler'
import { SoundService } from '../soundService';
import { NavbarComponent } from '../navbar/navbar.component';

// import { Howl, Howler } from 'howler';


const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  score: number = 0;
  timerDisplay: any; //in seconds
  timer:any;
  maxTimer: number = 0; //in seconds
  timerSeconds:number =0;
  penalty: number = 0;
  gameMode: String = "";
  modeDisplay:String='';

  loading:boolean = false;
  authLoading:boolean = false;
  gameInProgress:boolean = false;
  timerPaused:boolean = false;
  endgame:boolean = false;
  scoreSubmitted:boolean = false;

  song:any = undefined;
  songsArray: any;
  choices: Array<String> = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

  token:any;



  constructor(private router: Router, private state:State, private soundService: SoundService) { 
  }


  ngOnInit(): void {
    Howler.autoUnlock = false;
    let difficulty = this.state.difficulty$.getValue();
    this.gameMode = this.state.gamemode$.getValue();
    if (this.gameMode =='time') this.modeDisplay = "Time Attack"
    if (this.gameMode =='streak') this.modeDisplay = "Streak"
    switch(difficulty) {
      case 'easy': {
        this.maxTimer = 120;
        this.penalty = 15;
        break;
      }
      case 'normal': {
        this.maxTimer = 90;
        this.penalty = 30;
        break;
      } 
      case 'hard': {
        this.maxTimer = 60;
        this.penalty = 60;
        break;
      }
    }

    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
    });
  }

  gameOver(): void {
    this.timerPaused = true;
    this.gameInProgress = false;
    this.endgame = true;
    //this.score = 0;
    if (this.soundService.getPlaying()){
      this.playPause();
      this.soundService.setPlaying(false);
    }
    
  }
  setNewScore(name:string): void {
    
    let scores = JSON.parse(localStorage.getItem(this.gameMode+"scores") || "")
    if (scores.length == 0 ) { //If for some reason not initialized, use default.
      if (this.gameMode == 'time') {
        scores = [
          {name: 'TheBrain', score: 12},
          {name: 'Smarty', score: 10},
          {name: 'Abacus', score: 8},
          {name: 'Mozart', score: 4},
          {name: 'Genie', score: 2}
        ]
      } else if (this.gameMode == 'streak') {
        scores = [
          {name: 'Tenchi', score: 6},
          {name: 'Sanny', score: 5},
          {name: 'Raisin', score: 4},
          {name: 'Rachel', score: 2},
          {name: 'Marissa', score: 1}
        ] 
      }
    }
    if (this.score > scores[4].score) {
      let newScore = {
        name: name,
        score: this.score
      }
      scores[4] = newScore;
      for (let i = 4; i > 0; i--) {
        if (scores[i].score > scores[i-1].score) {
          let temp = scores[i-1];
          scores[i-1] = newScore;
          scores[i] = temp;
        } else break;
      }
      localStorage.setItem(this.gameMode+"scores", JSON.stringify(scores));
    }
  }
  async getSong(url:string ): Promise<void> {
    let response = await request(url ,{
      method:'get',
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
    }).then(e => {
      this.songsArray = e.tracks.items
      let correct = Math.floor(Math.random() * 4);
      this.song = this.songsArray[correct];
    })


  }

  async loadNext(): Promise<void> {
    if(this.gameMode == 'time' && !this.gameInProgress){
        this.setTimer(180);
    }
    if(this.score > 0 && !this.gameInProgress){
      this.score = 0
    }
    this.gameInProgress = true;
    this.endgame = false;
    this.timerPaused = false;
    this.loading = true;
    this.scoreSubmitted = false;
    if (this.soundService.getPlaying()){
      this.playPause();
    }
    if (this.gameMode == 'time' && !this.timer) {
      this.setTimer(300);
    } else if (this.gameMode == 'streak'){
      this.setTimer(this.maxTimer);
    }
    let offset = Math.floor(Math.random() * 1000);
    let url = 'https://api.spotify.com/v1/search?q=genre%3A' + 
      this.state.genre$.getValue() + '&type=track&limit=4&market=US&offset=' + offset;

  
    this.song = undefined;
    while(this.song == undefined || this.song.preview_url == null) {
      await this.getSong(url)
      if (!this.song.preview_url) console.log("rerolling")
    }

    console.log(this.song.name); //SHOW CORRECT ANSWER
    if (this.song && this.song.preview_url ) {
      const howl = new Howl({
        src: [this.song.preview_url],
        format: ['mp3'],
        loop: true,
        volume: 0.07,
        html5: true,
        autoplay: true
      });
      this.soundService.setPlaying(true)
      this.soundService.setSound(howl);
      // console.log(this.sound)
    } else {
      console.error("Song or preview_url is undefined");
    }
    for (let i = 0; i < 4; i++) {
      let songTitle = this.songsArray[i].name;
      this.choices[i] = songTitle;
    }
    this.loading = false;
  }

  guess(guess:any) {
    this.timerPaused = true;
    if (guess == this.song.name) {
      // console.log('Correct answer')
      this.score++;
    } else {
      // console.log('Wrong answer')
      if (this.gameMode =='streak') {
        this.gameOver();
      } else if (this.gameMode == 'time') {
        this.setTimer(this.timerSeconds - this.penalty)
      }
    }
  }

  onSubmit(event:any): void {
    let text = event.target.name.value;
    this.scoreSubmitted = true;
    this.setNewScore(text);
  }
  isCorrect(num:number): boolean {
    return this.choices[num] == this.song.name && this.timerPaused;
  }

  setTimer(seconds:number) { //Source: https://stackblitz.com/edit/countdown-timer-angular-v2?file=src%2Fapp%2Fapp.component.ts
    // let minute = 1;
    clearInterval(this.timer);
    let textSec: any = "0";
    let statSec: number = seconds % 60;
    this.timerSeconds = seconds;

    this.timer = setInterval(() => {
      if (!this.timerPaused) {
        this.timerSeconds--;
        if (statSec != 0) statSec--;
        else statSec = 59;
      }
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.timerDisplay = `${Math.floor(this.timerSeconds / 60)}:${textSec}`;

      if (this.timerSeconds <= 0) {
        // console.log("finished");
        this.timerPaused = true;
        clearInterval(this.timer);
        this.gameOver();
      }
    }, 1000);
  }
  playPause(){
    this.soundService.playPause();
  }
  turnUp(){
    this.soundService.turnUp();
  }
  turnDown(){
    this.soundService.turnDown();
  }
}
