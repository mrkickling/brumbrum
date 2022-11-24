import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group';
import { GroupEvent } from '../group-event';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';

const emptyArticle = (): Group => ({
  id: 0,
  title: "Loading...",
  description: "Loading...",
  code: "Loading...",
  createdAt: "Loading...",
  updatedAt: "Loading...",
  events: [],
  members: []
});


@Component({
  selector: 'app-group-finances',
  templateUrl: './group-finances.component.html',
  styleUrls: ['./group-finances.component.css']
})
export class GroupFinancesComponent implements OnInit {
  @Input() group: Group = emptyArticle();

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
