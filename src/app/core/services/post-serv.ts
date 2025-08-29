import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PostServ {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

getPosts(){
  return this.http.get(`${this.apiUrl}${API_ENDPOINTS.posts.getPosts}`)
}
createPost(data:any){
  return this.http.post(`${this.apiUrl}${API_ENDPOINTS.posts.createPost}`,data)
}
myPosts(){
  return this.http.get(`${this.apiUrl}${API_ENDPOINTS.posts.mypost}`)
}

updatePost(id:any, data:any){
  return this.http.put(`${this.apiUrl}${API_ENDPOINTS.posts.updatePost}?_id=${id}`, data);
}

deletePost(id:any){
  return this.http.delete(`${this.apiUrl}${API_ENDPOINTS.posts.deletePost}?_id=${id}`);
}
singlePost(id:any){
 return this.http.get(`${this.apiUrl}${API_ENDPOINTS.posts.singlePost}?_id=${id}`)
}
}
