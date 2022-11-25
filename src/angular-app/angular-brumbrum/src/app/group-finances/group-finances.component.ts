import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group';
import { GroupEvent } from '../group-event';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-finances',
  templateUrl: './group-finances.component.html',
  styleUrls: ['./group-finances.component.css']
})
export class GroupFinancesComponent implements OnInit {
  @Input()
  set group(group: Group) {
    this._group = group;
    this.getFinances();
  }
  get group(): Group {
    return this._group;
  }
  private _group: any;

  finances: any = { "Loading...": { "Loading...": { "Loading...": 0 } } };

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute) {
  }

  getFinances(): void {
    const code = this.group.code;
    this.groupService.getFinances(code)
      .subscribe(finances => this.finances = finances);
  }

  ngOnInit(): void {
  }

}
