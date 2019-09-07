import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../@core/service/auth.service';
import {FormControl} from '@angular/forms';
import {IPaginatedUsers} from "../../@core/data/users";
import {UserService} from "../../@core/service/users.service";

@Component({
  selector: 'ngx-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  loading = true;

  queryField: FormControl = new FormControl();

  userList: IPaginatedUsers = {
    data: [],
    pageNumber: this.route.snapshot.params.page || 1,
    pageSize: 100,
    nextPage: null,
    previousPage: null,
  };
  disabled() {
    return  {
      previous: this.userList.previousPage == null,
      next: this.userList.nextPage == null,
    };
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private location: Location) { }

  ngOnInit() {
    this.loadUsers(this.userList.pageNumber);
    this.queryField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((query) =>  this.userService.getUsers(query))
      .subscribe( result => {
        this.userList = result;
      });
  }

  updateRoute(newPage: number) {
    const page = this.userList.pageNumber;
    const url = this.location.path().replace(
      '/users/' + this.userList.pageNumber,
      '/users/' + (page + newPage));
    this.location.go(url);
  }

  loadUsers(page: any, query: string = '') {
    this.userService
      .getUsers(query, page)
      .subscribe(
        (data) => {
          this.loading = false;
          this.userList = data;
        },
      );
  }


  previousPage() {
    if (!this.disabled().previous) {
      this.loading = true;
      this.updateRoute(-1);
      this.loadUsers(--this.userList.pageNumber);
    }
  }

  nextPage() {
    if (!this.disabled().next) {
      this.loading = true;
      this.updateRoute(1);
      this.loadUsers(++this.userList.pageNumber);
    }
  }
}
