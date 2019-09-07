import {Component, OnInit} from '@angular/core';
import {TechnologyScoreService, UserService} from 'app/@core/service/users.service';
import {ActivatedRoute} from '@angular/router';
import {ITechnologyScore, IUser} from '../../@core/data/users';
import {AuthService} from '../../@core/service/auth.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {WrapperComponent} from './wrapper/wrapper.component';

@Component({
  providers: [UserService],
  selector: 'ngx-app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  user: IUser = {
    id: null,
    fullName: null,
    city: null,
    birthDay: null,
    about: null,
  };

  technologies: ITechnologyScore[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dialogService: NbDialogService,
              private technologyScoreService: TechnologyScoreService,
              private authService: AuthService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    const uId = this.route.snapshot.params.id;
    this.userService
      .getUser(uId)
      .subscribe(
        (data) => {
          this.user = data.data;
        },
      );
    this.technologyScoreService.getScores(uId)
      .subscribe(
        (data) => {
          this.technologies = data;
        },
      );
  }

  isEditable(): boolean {
    return this.authService.isLoggedIn()
      && this.route.snapshot.params.id === this.authService.CurrentId();
  }

  deleted(id) {
    this.technologies = this.technologies.filter(function(el) { return el.technology.id !== id; });
  }

  addTechnology() {
    this.dialogService.open(WrapperComponent)
      .onClose.subscribe(t => {
        if (this.technologies.findIndex(f => f.technology.id === t) === -1)
      t && this.technologyScoreService.addTechnology(this.user.id, t).subscribe(
        (tech: any) => tech.error ?
          this.toastrService.show(tech.error, `Ooops!`, {status: 'danger', icon: ''}) :
          this.technologies.push(tech),
      );
    });
  }

  save($event: MouseEvent) {
    this.userService.updateUserAsync(this.user)
      .subscribe();
  }
}
