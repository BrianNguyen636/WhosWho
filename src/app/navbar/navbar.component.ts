import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { State } from 'src/services/state';
import { filter } from 'rxjs/operators';
import { SoundService } from '../soundService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  disableRoute:boolean = false;

  constructor(private router: Router, private state:State, private soundService: SoundService) { }

  ngOnInit(): void {
    this.disableRoute=this.state.inProgress$.getValue()
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      // Pause the sound when navigation starts
      if (this.soundService.getPlaying()) {
        this.soundService.playPause();
      }
    });
  }
  goToNewGame() {
    if (this.soundService.getPlaying()){
      this.soundService.playPause()
    }
    this.router.navigate(['/game']);
    
      // Navigate to the root path (game page)
  }
  goToSettings() {
    if (this.soundService.getPlaying()){
      this.soundService.playPause()
    }
    this.router.navigate(['/settings']);
    // Navigate to the root path (settings page)
  }
  goToLandingPage() {
    if (this.soundService.getPlaying()){
      this.soundService.playPause()
    }
    this.router.navigate(['/']);
   // Navigate to the root path (landing page)
  }
}
