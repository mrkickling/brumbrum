import { Component, Input, OnInit } from '@angular/core';
import { GroupEventService } from '../group-events.service';
import { GroupEvent } from '../group-event'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css'],
})
export class GroupEventsComponent implements OnInit {
  @Input() events?: GroupEvent[];
  selectedEvent?: GroupEvent;

  constructor(
    private eventService: GroupEventService,
    private dialog: MatDialog
  ) { }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  onSelect(event: GroupEvent): void {
    this.selectedEvent = event;
  }

  showAddEventDialog() {
    this.dialog.open(AddGroupEventsDialog, {
      width: '250px',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
}

@Component({
  selector: 'add-group-events-dialog',
  templateUrl: './add-group-events-dialog.html',
})
export class AddGroupEventsDialog {
  constructor(public dialogRef: MatDialogRef<AddGroupEventsDialog>) { }
}