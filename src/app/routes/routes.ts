import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { WallComponent } from '../profile/wall/wall.component';
import { EditProfileComponent } from '../profile/edit-profile/edit-profile.component';

import { AuthGuard } from '../guards/auth.guard';
import { AuthedGuard } from '../guards/authed.guard';

export const ROUTES = [
  { path: 'auth/register', component: RegisterComponent, canActivate: [AuthedGuard] },
  { path: 'auth/login', component: LoginComponent, canActivate: [AuthedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'user/profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WallComponent },
      { path: 'edit', component: EditProfileComponent }
    ]
  }
];
