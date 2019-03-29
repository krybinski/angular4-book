import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnChanges {

  @Input() currentProfileId;
  public isFollowing: boolean;
  private isLoading: boolean = true;

  constructor(
      private followService: FollowService
  ) {}

  ngOnInit() {
    this.checkIfFollowing();
  }

  ngOnChanges(changes) {
      this.checkIfFollowing();
  }

  checkIfFollowing() {
      this.followService.isFollowing(this.currentProfileId)
          .then((res) => {
              this.isLoading = false;
              this.isFollowing = res;
          });
  }

  follow() {
      this.isLoading = true;
      this.followService.follow(this.currentProfileId)
          .then((res) => {
              this.isLoading = false;
              this.isFollowing = true;
          });
  }

  unfollow() {
      this.isLoading = true;
      this.followService.unfollow(this.currentProfileId)
          .then((res) => {
              this.isLoading = false;
              this.isFollowing = false;
          });
  }

}
