import {Component, OnInit, EventEmitter , Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ITechnology} from '../../@core/data/technology';
import {TechnologyService} from '../../@core/service/technology.service';
import {AuthService} from '../../@core/service/auth.service';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {AddtechnologyComponent} from './addtechnology/addtechnology.component';

@Component({
  selector: 'ngx-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent implements OnInit {
@Output() selected = new EventEmitter();
  queryField: FormControl = new FormControl();

  data: ITechnology[];
  forRender: ITechnology[];

  constructor(private technologyService: TechnologyService,
              private authService: AuthService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }

  isEditable(): boolean {
    return this.authService.isLoggedIn();
  }

  addTechnology() {
    this.dialogService.open(AddtechnologyComponent)
      .onClose.subscribe(t => {
      t && this.technologyService.createTechnology(t).subscribe(
        (tech: any) => tech.error ?
          this.toastrService.show(tech.error, `Ooops!`, {status: 'danger', icon: ''}) :
          this.data.push(tech),
      );
    });
  }


  ngOnInit() {
    this.technologyService.getTechnologies().subscribe((data) => {
      this.data = data;
      this.forRender = data;
    });
    this.queryField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(result => this.forRender = this.data.filter(o => o.name.includes(result)));
  }

  pick(id: string) {
    this.selected.emit(id);
  }
}
