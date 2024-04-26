import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class State {
    genre$ = new BehaviorSubject<any>("pop");
    gamemode$ = new BehaviorSubject<String>("time");
    difficulty$ = new BehaviorSubject<String>("normal");
    inProgress$ = new BehaviorSubject<boolean>(false);
    isPlaying$ = new BehaviorSubject<boolean>(false);
    scores$ = new BehaviorSubject<Array<any>>(
     [
            {name: 'TheBrain', score: 12},
            {name: 'Smarty', score: 10},
             {name: 'Abacus', score: 8},
            {name: 'Mozart', score: 4},
            {name: 'Genie', score: 2}
     ]
    );
    /*tracks$ = new BehaviorSubject<Array<any>>(
        [
            {genre: 'pop', trackArtist: [{artist: 'DJO', track:'3qhlB30KknSejmIvZZLjOD'}, 
                {artist: 'FloRida', track:'3GpbwCm3YxiWDvy29Uo3vP'}, {artist: 'ColdPlay', track:'1mea3bSkSGXuIRvnydlB5b'},
                {artist: 'Outkast', track: '0I3q5fE6wg7LIfHGngUTnV'}, {artist: 'Miley Cyrus', track:'5Q0Nhxo0l2bP3pNjpGJwV1'}]
            },
            {genre: 'hip-hop', trackArtist: [{artist: 'Coolio', track:'1DIXPcTDzTj8ZMHt3PDt8p'},
                {artist: 'Gunna', track:'4rXLjWdF2ZZpXCVTfWcshS'}, {artist: 'Baby Keem', track:'15hJmqqEtASVXl6sM7i4UF'},
                {artist: 'Nas', track:'5zwz05jkQVT68CjUpPwFZe'}, {artist: 'De La Soul', track:'792UwI6utk5DMQUT1KXa5E'}]
            }, 
            {genre: 'rock', trackArtist: [{artist: 'ZZ Top', track:'0u6JFVn0KHHlidZxNL9gVE'}, 
                {artist: 'Red Hot Chili Peppers', track:'48UPSzbZjgc449aqz8bxox'}, {artist: 'AC/DC', track:'57bgtoPSgt236HzfBOd8kj'},
                {artist: 'Rush', track:'3QZ7uX97s82HFYSmQUAN1D'}, {artist: 'Van Halen', track:'05RgAMGypEvqhNs5hPCbMS'}]
            },
            {genre: 'country', trackArtist: [{artist: 'Zac Brown Band', track:'0LQtEJt7x0s6knb6RKdRYc'}, 
            {artist: 'Jason Aldean', track:'0okmLlOW6vKrilXDvtRMfg'}, {artist: 'Tim McGraw', track:'7B1QliUMZv7gSTUGAfMRRD'},
            {artist: 'Jake Owen', track:'3ts6xK5GzfMAAriT9AIBmP'}, {artist: 'Sam Hunt', track:'7mldq42yDuxiUNn08nvzHO'}]
            },
            {genre: 'jazz', trackArtist: [{artist: 'Louis Armstrong', track:'29U7stRjqHU6rMiS8BfaI9'}, 
            {artist: 'Frank Sinatra', track:'2dR5WkrpwylTuT3jRWNufa'}, {artist: 'Berlioz', track:'6OI1stBQI4YHH2ceWVIrk4'},
            {artist: 'Huntertones', track:'5hPmsVirHEtxjdJKUGYGjP'}, {artist: 'Niklouds', track:'0dgXRh3B4dDlm7zXRRB5aO'}]
            }
        ]
    )*/
}
