import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { PostList } from './posts/post-list/post-list';
import { PostCreate } from './posts/post-create/post-create';
import { NotFound } from './pages/not-found/not-found';
import { Myposts } from './posts/myposts/myposts';
import { SinglePostComponent } from './posts/single-post/single-post';
import { ChangePassword } from './pages/change-password/change-password';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'home', component: Home, children: [
            { path: 'posts', component: PostList },
            { path: 'posts/create', component: PostCreate ,canActivate:[authGuard]},
            {path:'posts/my-posts',component:Myposts,canActivate:[authGuard]},
            {path:'post/:id',component:SinglePostComponent},
            {path:'changePassword',component:ChangePassword,canActivate:[authGuard]}
        ]
    },
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    { path: '**', component: NotFound }
];
