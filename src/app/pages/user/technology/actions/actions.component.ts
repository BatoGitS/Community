import {Component, Input, OnInit} from '@angular/core';
import {TechnologyScoreService} from "../../../../@core/service/users.service";
import {NbDialogRef} from "@nebular/theme";
import {AddtechnologyComponent} from "../../../technologies/addtechnology/addtechnology.component";

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddtechnologyComponent>,) {
  }

  ngOnInit() {
  }

  setScore(action: number, score?: number) {
    this.ref.close({a: action, s: score});
  }
}
