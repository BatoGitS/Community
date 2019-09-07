import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  constructor(protected ref: NbDialogRef<WrapperComponent>) { }


  pick(id) {
    this.ref.close(id);
  }
  ngOnInit() {
  }

}
