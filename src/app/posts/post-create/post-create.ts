import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostServ } from '../../core/services/post-serv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule,CommonModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css'
})
export class PostCreate implements OnInit{
  post = {
    title: '',
    description: ''
  };
postServ = inject(PostServ)  ;
ngOnInit(): void {
  
}  
onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted:', this.post);
this.postServ.createPost(this.post).subscribe((res:any)=>{
console.log(res,'post created')
});
form.reset();
    }
  }

}
