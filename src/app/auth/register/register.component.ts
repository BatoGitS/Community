import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../@core/service/auth.service';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastrService: NbToastrService) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      fullName: [''],
    });
  }

  register() {
    this.authService.register(
      {
        email: this.f.email.value,
        password: this.f.password.value,
        fullName: this.f.fullName.value,
      },
    )
      .subscribe(success => {
        if (success === true) {
          this.router.navigate(['/']);
        } else {
          this.toastrService.show(success.errors, `Ooops!`, { status: 'danger', icon: '' });
        }
      });
  }

}
