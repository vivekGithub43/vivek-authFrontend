import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostServ } from '../../core/services/post-serv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [CommonModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css'
})
export class SinglePostComponent implements OnInit {
  post: any;
  isLoading = true;
 route = inject(ActivatedRoute) ;
 postServ=inject(PostServ)
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.postServ.singlePost(id).subscribe({
        next: (res:any) => {
          this.post = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading post', err);
          this.isLoading = false;
        }
      });
    }
  }
}