import {Component, Input, OnInit} from '@angular/core';
import {ITechnologyScore, IUser} from '../../../@core/data/users';
import {TechnologyScoreService} from '../../../@core/service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-user-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() user: IUser;
  technologies: ITechnologyScore[];

  constructor(private technologyScoreService: TechnologyScoreService) { }

  ngOnInit() {
    this.technologyScoreService.getScores(this.user.id)
      .subscribe(
        (data) => {
          this.technologies = data.slice(0, 3);
        },
      );
  }

}
