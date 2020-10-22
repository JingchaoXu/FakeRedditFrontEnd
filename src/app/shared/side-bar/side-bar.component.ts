import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }

  // tslint:disable-next-line:typedef
  goToCreateSubreddit() {
    this.router.navigateByUrl('/create-subreddit');
  }
}
