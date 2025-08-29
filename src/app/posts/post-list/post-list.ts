// post-list.ts
import { Component, inject, OnInit } from '@angular/core';
import { PostServ } from '../../core/services/post-serv';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList implements OnInit {
  postServ = inject(PostServ);
  postsList: any[] = [];
  constructor(private title: Title, private meta: Meta) {}
  ngOnInit(): void {
    this.setSEO();
    this.getAllPostsApi();
  }

  getAllPostsApi() {
    this.postServ.getPosts().subscribe((res: any) => {
      this.postsList = res.data;
      console.log(this.postsList, 'posts');
    });
  }
   // ✅ SEO setup
  setSEO() {
    this.title.setTitle("All Posts - My Angular Blog");
    this.meta.addTags([
      { name: 'description', content: 'Browse the latest posts from our Angular blog with full details and insights.' },
      { name: 'keywords', content: 'Angular, Blog, Posts, Articles, SEO' },
      { property: 'og:title', content: 'All Posts - My Angular Blog' }, // ✅ Open Graph (for social media)
      { property: 'og:description', content: 'Browse the latest posts from our Angular blog.' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
