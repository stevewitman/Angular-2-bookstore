'use strict';

import {Component} from 'angular2/core';
import {MusicService} from './music.service';

@Component({
  selector: 'my-music',
  templateUrl: 'components/music/music.component.html',
  styleUrls: ['components/music/music.component.css']
})
export class MusicComponent{
  constructor(musicService){
    this.title = "Music";
    this.musicService = musicService;
    this.music = [];
  }

  static get parameters(){
    return [[MusicService]];
  }

  ngOnInit(){
    this.getMusic();
  }

  getMusic(){
    this.musicService.getList()
                     .subscribe(
                       music => this.music = music,
                       error => this.errorMessage = error
                     )
  }
}
