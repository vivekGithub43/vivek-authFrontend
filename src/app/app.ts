import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,Register,Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'auth';
}
