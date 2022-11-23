import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { GroupEventsComponent } from '../group-events/group-events.component';

const emptyArticle = (): Group => ({
  id: 0,
  title: "Loading...",
  description: "Loading...",
  code: "Loading...",
  createdAt: "Loading...",
  updatedAt: "Loading...",
  events: []
});


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: Group = emptyArticle();
  selectedEvent?: Event;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute) { }

  getGroup(): void {
    const code = String(this.route.snapshot.paramMap.get("code"));
    this.groupService.getGroup(code)
      .subscribe(group => this.group = group);
  }

  ngOnInit(): void {
    this.getGroup();
  }

  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
}
