import { Component, inject, OnInit } from '@angular/core';
import { PostServ } from '../../core/services/post-serv';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedServ } from '../../core/services/shared-serv';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
postServ = inject(PostServ);
sharedServ = inject(SharedServ)
postsList:any[]=[];
isLoggedIn:boolean=false;
isSidebarOpen = true; // default open
ngOnInit(): void {
this.sharedServ.loginStatus$.subscribe((status) => {
    this.isLoggedIn = status;
  })
  this.getAllPostsApi();
}
getAllPostsApi(){
this.postServ.getPosts().subscribe((res:any)=>{
  this.postsList=res.data;
  console.log(this.postsList,'posts')
})
}
toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
