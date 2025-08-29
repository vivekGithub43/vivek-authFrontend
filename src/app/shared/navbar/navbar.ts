import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedServ } from '../../core/services/shared-serv';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
sharedServ=inject(SharedServ);
authServ = inject(Auth);
router = inject(Router);
userNameLS:any='';
isLogin:boolean=true;
ngOnInit(): void {
   // 1️⃣ Load from localStorage on page reload
  const storedName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  if (storedName && token) {
    this.userNameLS = storedName;
    this.isLogin = false;
  }
this.sharedServ.setUserName$.subscribe((res)=>{
  this.userNameLS=res;
  this.isLogin=false;
})
}
signOut(){
  this.authServ.signOut().subscribe({
    next:(res:any)=>{
      console.log(res.message);
      this.clearSession();
      this.isLogin=true;
      this.router.navigate(['/home'])
    },
    error:(err)=>{
      console.error('signout failed',err);
      this.clearSession();
    }
  })
}  
private clearSession(){
   localStorage.removeItem('userName');
   localStorage.removeItem('token')
   this.userNameLS = null;
   this.sharedServ.setLoginStatussidebar(false); 
}
openLogin(){
  this.sharedServ.loginOpenModel();
}
onRegister(){
 this.sharedServ.registerOpenModel();
}
}
