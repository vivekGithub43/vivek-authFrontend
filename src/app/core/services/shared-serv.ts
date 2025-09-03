import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServ {
  private  openLoginModalSource = new Subject<void>();
  private openRegisterModelSource = new Subject<void>();
  openLoginModel$ = this.openLoginModalSource.asObservable();
  openRegisterModel$ = this.openRegisterModelSource.asObservable();
  private setUserName = new Subject<string>();
  setUserName$ = this.setUserName.asObservable();
 private loginStatusSource = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  loginStatus$ = this.loginStatusSource.asObservable();

private loader = new BehaviorSubject<boolean>(false);
loader$ = this.loader.asObservable();

showLoader(){
this.loader.next(true);
}
hideLoader(){
  this.loader.next(false);
}
  usernameFunction(data:any){
  this.setUserName.next(data)  
  }
setLoginStatussidebar(isLoggedIn: boolean) {
    this.loginStatusSource.next(isLoggedIn);
  }
  loginOpenModel(){
    this.openLoginModalSource.next();
  }
  registerOpenModel(){
    this.openRegisterModelSource.next();
  }
  
}
