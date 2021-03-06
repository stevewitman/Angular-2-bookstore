'use strict';

import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

// For using #location
import {provide} from 'angular2/core';
import {LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';

// Services (e.g. Providers)
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from '../books/books.service';
import {MusicService} from '../music/music.service';
import {MoviesService} from '../movies/movies.service';

// Components
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BooksComponent} from '../books/books.component';
import {AuthorsComponent} from '../authors/authors.component';
import {MusicComponent} from '../music/music.component';
import {MoviesComponent} from '../movies/movies.component';


@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, SidebarComponent],
  providers: [AuthorsService, BooksService, MusicService, MoviesService, HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })],
  templateUrl: 'components/app/app.component.html',
  styleUrls: ['components/app/app.component.css']
})
@RouteConfig([
  {
    path: '/books',
    name: 'Books',
    component: BooksComponent,
    useAsDefault: true
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsComponent
  },
  {
    path: '/music',
    name: 'Music',
    component: MusicComponent
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesComponent
  }
])
export class AppComponent{
  constructor(router, authorsService, booksService, musicService, moviesService){
    this.title = "My First Angular 2 App";
    this.router = router;
    this.authorsService = authorsService;
    this.booksService = booksService;
    this.musicService = musicService;
    this.moviesService = moviesService;
  }


  // Angular 2 Dependency Injection for ECMAScript 6
  // If you're using TypeScript, you can use @Inject on
  // constructor parameters. Sadly, this is not valid
  // ES6 or ES7 syntax.
  // NOTE: 1st in call order
  static get parameters() {
    return [[Router], [AuthorsService], [BooksService], [MusicService], [MoviesService]];
  }

  ngOnInit() {

  }

}
