import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';

import { ROUTES } from './routes/routes';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotifyComponent } from './notify/notify.component';
import { ProfileComponent } from './profile/profile.component';
import { WallComponent } from './profile/wall/wall.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthedGuard } from './guards/authed.guard';

import { AuthService } from './services/auth.service';
import { NotifyService } from './services/notify.service';
import { UserService } from './services/user.service';
import { FollowService } from './services/follow.service';
import { JokeService } from './services/joke.service';

import { PrettyDatePipe } from './pipes/pretty-date.pipe';
import { FollowComponent } from './profile/follow/follow.component';
import { CreateJokeComponent } from './create-joke/create-joke.component';
import { JokeComponent } from './joke/joke.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotifyComponent,
    ProfileComponent,
    PrettyDatePipe,
    WallComponent,
    EditProfileComponent,
    FollowComponent,
    CreateJokeComponent,
    JokeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgProgressModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthedGuard,
    NotifyService,
    UserService,
    FollowService,
    JokeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
