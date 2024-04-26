import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SoundService } from "./soundService";
import { AppComponent } from "./app.component";
import { SettingsComponent } from "./settings/settings.component";
import { LandingComponent } from './landing/landing.component';
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HighScoresComponent } from './high-scores/high-scores.component';



const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "settings", component: SettingsComponent },
  { path: "game", component: GameComponent}
];

@NgModule({
  declarations: [AppComponent, SettingsComponent, LandingComponent, GameComponent, NavbarComponent, HighScoresComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [SoundService],
  bootstrap: [AppComponent],
})
export class AppModule {}
