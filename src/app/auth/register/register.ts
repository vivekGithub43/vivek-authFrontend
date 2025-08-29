import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedServ } from '../../core/services/shared-serv';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit, OnDestroy{
  registerForm = {
    name: '',
    email: '',
    password: ''
  };

  step: 'register' | 'verify' = 'register';
  message = '';
  verificationCode = '';
  sharedServ = inject(SharedServ);
  private subscription!: Subscription;
  private modal!: Modal;
  constructor(private auth: Auth) {}

  // Register
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.auth.register(this.registerForm).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Registration successful! Please verify your email.';
        this.step = 'verify';
        // After registration, trigger sending code automatically
        this.sendCode();
      },
      error: (err) => {
        this.message = err.error?.message || 'Registration failed';
      }
    });
  }

  // Send Code
  sendCode() {
    this.auth.sendVerificationCode({ email: this.registerForm.email }).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Verification code sent!';
      },
      error: (err) => {
        this.message = err.error?.message || 'Error sending code';
      }
    });
  }

  // Verify Code
 verifyCode() {
  const data = {
    email: this.registerForm.email,
    providedCode: this.verificationCode
  };

  this.auth.verifyVerificationCode(data).subscribe({
    next: (res: any) => {
      this.message = res.message || 'Email verified successfully!';

      // ✅ Auto-close modal
      const modalEl = document.getElementById('registerModal');
      if (modalEl) {
        const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
        modalInstance.hide();
      }

      // reset state
      this.step = 'register';
      this.verificationCode = '';
      this.registerForm = { name: '', email: '', password: '' };
    },
    error: (err) => {
      this.message = err.error?.message || 'Verification failed';
    }
  });
}

ngAfterViewInit(): void {
    const modalEl = document.getElementById('registerModal');
    if (modalEl) {
      this.modal = new Modal(modalEl);
    }

    // ✅ subscribe to openRegisterModel$ (from service)
    this.subscription = this.sharedServ.openRegisterModel$.subscribe(() => {
      if (this.modal) {
        this.modal.show();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}