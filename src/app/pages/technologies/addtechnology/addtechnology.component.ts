import {Component, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {ITechnology} from '../../../@core/data/technology';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-technology-add',
  templateUrl: './addtechnology.component.html',
  styleUrls: ['./addtechnology.component.scss'],
})
export class AddtechnologyComponent implements OnInit {


  constructor(protected ref: NbDialogRef<AddtechnologyComponent>,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.ref.close();
  }

  tech: ITechnology;


  submit(name, descr) {
    if (name.length === 0){
      this.toastrService.show('Technology name must be not empty', `Ooops!`,
        {status: 'danger', icon: ''});
      return;
    }
    this.tech = {name: name, description: descr};
    this.ref.close(this.tech);
  }
}
