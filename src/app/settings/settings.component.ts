import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import fetchFromSpotify, { request } from "../../services/api";
import { State } from "src/services/state";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router, private state:State) {}

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  gameMode: String ="";
  difficulty: String ="";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  ngOnInit(): void {

    this.selectedGenre = this.state.genre$.getValue();
    this.gameMode = this.state.gamemode$.getValue();
    this.difficulty = this.state.difficulty$.getValue();
    this.loadGenres();

    // this.authLoading = true;
    // const storedTokenString = localStorage.getItem(TOKEN_KEY);
    // if (storedTokenString) {
    //   const storedToken = JSON.parse(storedTokenString);
    //   if (storedToken.expiration > Date.now()) {
    //     console.log("Token found in localstorage");
    //     this.authLoading = false;
    //     this.token = storedToken.value;
    //     this.loadGenres(storedToken.value);
    //     return;
    //   }
    // }
    // console.log("Sending request to AWS endpoint");
    // request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
    //   const newToken = {
    //     value: access_token,
    //     expiration: Date.now() + (expires_in - 20) * 1000,
    //   };
    //   localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
    //   this.authLoading = false;
    //   this.token = newToken.value;
    //   this.loadGenres(newToken.value);
    // });
  }

  async test():Promise<void> {
    let response = await request('https://api.spotify.com/v1/artists/4gvNo6XIRTD2N0l75sY6II',{
      method:'get',
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
    })
    console.log(response);
  }
  resetScores(): void {
    let scores1 = [
      {name: 'TheBrain', score: 12},
      {name: 'Smarty', score: 10},
      {name: 'Abacus', score: 8},
      {name: 'Mozart', score: 4},
      {name: 'Genie', score: 2}
    ] 
    localStorage.setItem("timescores", JSON.stringify(scores1));
    let scores2 = [
      {name: 'Tenchi', score: 6},
      {name: 'Sanny', score: 5},
      {name: 'Raisin', score: 4},
      {name: 'Rachel', score: 2},
      {name: 'Marissa', score: 1}
    ] 
    localStorage.setItem("streakscores", JSON.stringify(scores2));
  }

  loadGenres = () => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################
    
    this.genres = [
      "rock",
      "pop",
      "country",
      "hip-hop",
      "jazz",
      "alternative",
      "j-pop",
      "k-pop",
      "emo"
    ]
    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    this.state.genre$.next(selectedGenre);
    // console.log(this.selectedGenre);
    // console.log(TOKEN_KEY);
  }
  setGameMode(gameMode:any) {
    this.gameMode = gameMode;
    this.state.gamemode$.next(gameMode);
    // console.log(this.gameMode);
  }
  setDifficulty(difficulty:any) {
    this.difficulty=difficulty;
    this.state.difficulty$.next(difficulty);
    // console.log(this.difficulty);
  }
}
