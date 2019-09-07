import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {AddtechnologyComponent} from '../../../technologies/addtechnology/addtechnology.component';
import {AuthService} from '../../../../@core/service/auth.service';

@Component({
  selector: 'ngx-technology-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input() userId;

  constructor(protected ref: NbDialogRef<AddtechnologyComponent>,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  IsOwn() {
    return this.userId === this.authService.CurrentId();
  }

  setScore(action: number, score?: number) {
    this.ref.close({a: action, s: score});
  }
}
