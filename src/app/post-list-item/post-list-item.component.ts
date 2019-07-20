import { Component, Input} from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})

export class PostListItemComponent {

  @Input() post: Post;
  @Input() index: number;

  constructor(private postsService: PostsService) {}

  addLoveIt(index: number) {
    this.postsService.addLoveIts(index);
  }

  removeLoveIt(index: number) {
    this.postsService.removeLoveIts(index);
  }

  getLoveIt() {
    let classCard = 'list-group-item';
    if (this.post.loveIts < 0) {
      classCard += ', list-group-item-danger';
    }
    if (this.post.loveIts > 0) {
      classCard += ', list-group-item-success';
    }
    return classCard;
  }

  removePost(post: Post) {
    this.postsService.deletePost(post);
  }
}
