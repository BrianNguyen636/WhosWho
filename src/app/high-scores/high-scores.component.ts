import { Component, OnInit } from '@angular/core';
import { State } from 'src/services/state';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css']
})
export class HighScoresComponent implements OnInit {
  timeScores: Array<any> = [];
  streakScores: Array<any> = [];

  constructor(private state:State) { }

  ngOnInit(): void {
    // this.scores = this.state.scores$.getValue();
    const timescores = JSON.parse(localStorage.getItem("timescores") || "[]")
    if (timescores.length == 0) { //scoreboard not on local
      let scores = [
        {name: 'TheBrain', score: 12},
        {name: 'Smarty', score: 10},
        {name: 'Abacus', score: 8},
        {name: 'Mozart', score: 4},
        {name: 'Genie', score: 2}
      ] 
      localStorage.setItem("timescores", JSON.stringify(scores));
      this.timeScores = scores;
      console.log("New scoreboard")
    } else {
      console.log("Scoreboard from local storage")
      this.timeScores = timescores;
    }

    const streakscores = JSON.parse(localStorage.getItem("streakscores") || "[]")
    if (streakscores.length == 0) { //scoreboard not on local
      let scores = [
        {name: 'Tenchi', score: 6},
        {name: 'Sanny', score: 5},
        {name: 'Raisin', score: 4},
        {name: 'Rachel', score: 2},
        {name: 'Marissa', score: 1}
      ] 
      localStorage.setItem("streakscores", JSON.stringify(scores));
      this.streakScores = scores;
      console.log("New scoreboard")
    } else {
      console.log("Scoreboard from local storage")
      this.streakScores = streakscores;
    }

  }


}
