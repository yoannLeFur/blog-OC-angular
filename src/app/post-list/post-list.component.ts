import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/posts.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubcription: Subscription;

  constructor(private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    this.postsSubcription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  ngOnDestroy() {
    this.postsSubcription.unsubscribe();
  }

}
