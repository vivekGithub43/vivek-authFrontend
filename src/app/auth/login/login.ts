import { AfterViewInit, Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedServ } from '../../core/services/shared-serv';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap'; 
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit, OnDestroy,OnInit{
sharedServ = inject(SharedServ);
private sub! : Subscription;
authServ = inject(Auth);
router = inject(Router);
loginData = {
  email:'',
  password:''
}
 // Forgot password state
  forgotMode = false;
  codeSent = false;
  forgotData = {
    email: '',
    providedCode: '',
    newPassword: ''
  };

ngAfterViewInit(): void {
  const modalEl = document.getElementById('loginModal');
  if(!modalEl) return;

const modal = new Modal(modalEl)
  this.sub = this.sharedServ.openLoginModel$.subscribe(()=>{
    modal.show()
  })
}  
ngOnInit(): void {
 
}
onSubmit(form:NgForm){
if(form.valid){
  this.authServ.login(this.loginData).subscribe((res:any)=>{
    console.log(res)
  localStorage.setItem('token', res.token);  
  localStorage.setItem('userName',res.name); //LOGIN USERNAME LOCALSTORAGE 
  this.sharedServ.usernameFunction(res.name) ;
  console.log('Token before signout:', localStorage.getItem('token'));
    this.sharedServ.setLoginStatussidebar(true);  
    this.router.navigate(['/home/posts'])
  })
 this.closeModal();
  
}
};
  // 🔹 Switch to Forgot Password
  switchToForgot() {
    this.forgotMode = true;
  }

  // 🔹 Send Forgot Password Code
  onForgotPassword(form: NgForm) {
    if (form.valid) {
      this.authServ.sendForgotPasswordCode({ email: this.forgotData.email })
        .subscribe({
          next: () => {
            this.codeSent = true;
            alert("Verification code sent to your email!");
          },
          error: err => alert(err.error.message || "Failed to send code.")
        });
    }
  }
// 🔹 Verify Code & Reset Password
  onVerifyCode(form: NgForm) {
    if (form.valid) {
      this.authServ.verifyForgotPasswordCode(this.forgotData)
        .subscribe({
          next: () => {
            alert("Password reset successfully! Please login again.");
            this.forgotMode = false;
            this.codeSent = false;
            this.forgotData = { email: '', providedCode: '', newPassword: '' };
          },
          error: err => alert(err.error.message || "Failed to reset password.")
        });
    }
  }
private closeModal() {
    const modalEl = document.getElementById('loginModal');
    if (modalEl) {
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();
    }
  }
ngOnDestroy(): void {
  this.sub.unsubscribe();
}
}
