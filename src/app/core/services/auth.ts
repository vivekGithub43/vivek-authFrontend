import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINTS } from '../../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class Auth {
private apiUrl = environment.apiUrl;
private http = inject(HttpClient);

login(data:any){
return this.http.post(`${this.apiUrl}${API_ENDPOINTS.auth.signin}`,data,{withCredentials:true})
}
register(data:any){
return this.http.post(`${this.apiUrl}${API_ENDPOINTS.auth.signUp}`,data)  
}
signOut(){
return this.http.post(`${this.apiUrl}${API_ENDPOINTS.auth.signOut}`,{},
   { withCredentials: true } 
)
}
sendVerificationCode(data:{email:string}){
return this.http.patch(`${this.apiUrl}${API_ENDPOINTS.auth.sendVerificationCode}`,data,{withCredentials:true})  
}
verifyVerificationCode(data:{email: string; providedCode: string }){
return this.http.patch(`${this.apiUrl}${API_ENDPOINTS.auth.verifyVerificationCode}`,data,{withCredentials:true})  
}
sendForgotPasswordCode(data: { email: string }){
return this.http.patch(`${this.apiUrl}${API_ENDPOINTS.auth.sendForgotPasswordCode}`,data)
}
verifyForgotPasswordCode(data: { email: string; providedCode: string; newPassword: string }){
return this.http.patch(`${this.apiUrl}${API_ENDPOINTS.auth.verifyForgotPasswordCode}`,data)
}
changePassword(data: { oldPassword: string; newPassword: string }){
return this.http.patch(`${this.apiUrl}${API_ENDPOINTS.auth.changePassword}`,data,{withCredentials:true})
}
  
}
