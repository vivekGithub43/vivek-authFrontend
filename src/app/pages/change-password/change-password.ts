import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule,CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  authServ = inject(Auth);

  oldPassword: string = '';
  newPassword: string = '';
  message: string = '';

  onChangePassword() {
  this.authServ.changePassword({
    oldPassword: this.oldPassword,
    newPassword: this.newPassword
  }).subscribe({
    next: (res) => this.message = "✅ Password updated successfully!",
    error: (err) => this.message = err.error?.message || "❌ Failed to update password."
  });
}
}
