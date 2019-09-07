import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/service/auth.service';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastrService: NbToastrService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      remember: [''],
    });
  }

  login() {
    this.authService.login(
      {
        email: this.f.email.value,
        password: this.f.password.value,
      },
      this.f.remember.value,
    )
      .subscribe(success => {
        if (success === true) {
          this.router.navigate(['/']);
        } else {
          this.toastrService.show(success.errors, `Ooops!`, {status: 'danger', icon: ''});
        }
      });
  }

}
