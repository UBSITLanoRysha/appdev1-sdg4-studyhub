import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DetailComponent } from './pages/detail/detail';
import { AboutComponent } from './pages/about/about';
import { NotFoundComponent } from './pages/not-found/not-found';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  { path: 'resource/:id', component: DetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];