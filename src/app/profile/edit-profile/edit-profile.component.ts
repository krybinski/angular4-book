import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.user = this.authService.getAuthUser();
  }

  editProfile() {
    const { id, name, email } = this.user;
    this.userService.updateProfile(id, name, email)
      .then((user) => {
        this.user = user;
        this.notifyService.notify('Profile updated successfully!', 'success');
      });
  }

}
