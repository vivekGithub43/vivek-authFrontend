// myposts.ts
import { Component, inject, OnInit } from '@angular/core';
import { PostServ } from '../../core/services/post-serv';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myposts',
  imports: [CommonModule, FormsModule],
  templateUrl: './myposts.html',
  styleUrl: './myposts.css'
})
export class Myposts implements OnInit {
  postsServ = inject(PostServ);
  mypostsList: any[] = [];
  editingPost: any = null;

  ngOnInit(): void {
    this.postsServ.myPosts().subscribe((res: any) => {
      this.mypostsList = res.data;
      console.log(res, 'mypostList');
    });
  }

  onDelete(id: any) {
    this.postsServ.deletePost(id).subscribe({
      next: (res: any) => {
        console.log('Post deleted:', res);
        this.mypostsList = this.mypostsList.filter(post => post._id !== id);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }

  onEdit(post: any) {
    this.editingPost = { ...post };
  }

  onUpdate() {
    if (!this.editingPost) return;
    this.postsServ.updatePost(this.editingPost._id, {
      title: this.editingPost.title,
      description: this.editingPost.description
    }).subscribe({
      next: (res: any) => {
        console.log('Post updated:', res);
        this.mypostsList = this.mypostsList.map(p =>
          p._id === this.editingPost._id ? { ...p, ...this.editingPost } : p
        );
        this.editingPost = null;
      },
      error: (err) => console.error('Error updating post:', err)
    });
  }

  onCancelEdit() {
    this.editingPost = null;
  }
}
