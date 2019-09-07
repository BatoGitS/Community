import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TechnologyScoreService} from '../../../@core/service/users.service';
import {ITechnologyScore} from '../../../@core/data/users';
import {NbDialogService} from '@nebular/theme';
import {ActionsComponent} from './actions/actions.component';
import {AuthService} from '../../../@core/service/auth.service';

@Component({
  selector: 'ngx-app-technology-item',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent implements OnInit {
  @Input('technologyScore') technologyScore: ITechnologyScore;
  @Input('user-id') uId: string;
  @Input() canCallActions: boolean = false;
  @Output() deleted = new EventEmitter();

  constructor(
    private dialogService: NbDialogService,
    private technologyScoreService: TechnologyScoreService,
    private authService: AuthService) {
  }

  get status() {
    const Score = Number(this.technologyScore.avgScore);
    if (Score <= 2) {
      return 'danger';
    } else if (Score <= 3.2) {
      return 'warning';
    } else if (Score <= 4.2) {
      return 'info';
    } else {
      return 'success';
    }
  }


  action() {
    if (this.authService.isLoggedIn() && this.canCallActions)
      this.dialogService.open(ActionsComponent, {context: {userId: this.uId}})
        .onClose.subscribe((t) => {
        if (t) {
          if (t.a === 1)
            this.technologyScoreService.updateScore(this.uId, this.technologyScore.technology.id, t.s).subscribe(
              e => this.technologyScore = e,
            );
          if (t.a === 2)
            this.technologyScoreService.deleteTScore(this.uId, this.technologyScore.technology.id).subscribe(
              () => this.deleted.emit(this.technologyScore.technology.id),
            );
        }
      });
  }

  ngOnInit() {
  }

}
