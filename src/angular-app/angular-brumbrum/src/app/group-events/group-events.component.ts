import { Component, Input, OnInit } from '@angular/core';
import { GroupEventService } from '../group-events.service';
import { GroupEvent } from '../group-event'
import { AddGroupEventsDialog } from './add-group-event-dialog/add-group-event.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditGroupEventDialog } from './edit-group-event-dialog/edit-group-event.component';
import { Group } from '../group';
@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css'],
})
export class GroupEventsComponent implements OnInit {
  @Input()
  get events(): GroupEvent[] {
    return this._events;
  }
  set events(events: GroupEvent[]) {
    this._events = this.sortByDate(events);
  }
  private _events: GroupEvent[] = [];

  @Input() group?: Group;
  selectedEvent?: GroupEvent;

  constructor(
    private eventService: GroupEventService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  sortByDate(events: GroupEvent[]): GroupEvent[] {
    return events.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  onSelect(event: GroupEvent): void {
    if (this.selectedEvent == event) {
      this.selectedEvent = undefined;
    } else {
      this.selectedEvent = event;
    }
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddGroupEventsDialog, {
      data: { group: this.group },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.events = [...this.events, result];
      }
    });
  }
  openEditEventDialog(event: GroupEvent): void {
    const dialogRef = this.dialog.open(EditGroupEventDialog, {
      data: { group: this.group, event: event },
    });

    dialogRef.afterClosed().subscribe(
      (editedEvent) => {
        if (editedEvent) {
          this.events = this.events!.filter(event => event.id !== editedEvent.id);
          this.events = [...this.events, editedEvent];
        }
      });
  }

  deleteEvent(event: GroupEvent): void {
    this.eventService.deleteEvent(event.id, this.group!.code).subscribe(
      (deletedEvent) => {
        if (deletedEvent) {
          this.events = this.events!.filter(event => event.id !== deletedEvent.id);
        }
      }
    )
  }

}
