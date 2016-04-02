'use strict';

import {Component} from 'angular2/core';
import {MoviesService} from './movies.service';

@Component({
  selector: 'my-movies',
  templateUrl: 'components/movies/movies.component.html',
  styleUrl: ['components/movies/movies.component.css']
})
export class MoviesComponent{
  constructor(moviesSercice){
    this.title = "Movies";
    this.moviesSercice = moviesSercice;
    this.movies = [];
  }

  static get parameters(){
    return [[MoviesService]]
  }

  ngOnInit(){
    this.getMovies();
  }

  getMovies(){
    this.moviesSercice.getList()
                      .subscribe(
                        movies => this.movies = movies,
                        error => this.errorMessage =error
                      )
  }
}
