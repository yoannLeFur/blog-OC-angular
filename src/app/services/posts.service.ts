import { Injectable } from '@angular/core';
import { Post } from '../models/posts.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor(private router: Router) {
    this.getPosts();
   }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts').on('value', (data) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    })
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    newPost.loveIts = 0;
    newPost.created_at = new Date().getTime();
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts()
    this.router.navigate(['/posts']);
  }

  deletePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postElt) => {
        if (postElt === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  addLoveIts(index: number) {
    this.posts[index].loveIts++;
    this.savePosts();
    this.emitPosts();
  }

  removeLoveIts(index: number) {
    this.posts[index].loveIts--;
    this.savePosts();
    this.emitPosts();
  }

}
