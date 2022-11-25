import { Component, Input, OnInit, Inject } from '@angular/core';
import { GroupEventService } from '../../group-events.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'src/app/log/log.service';
import { GroupEvent } from 'src/app/group-event';
import { Group } from 'src/app/group';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
    selector: 'edit-group-events-dialog',
    templateUrl: './edit-group-event.component.html',
    styleUrls: ["./edit-group-event.css"]
})
export class EditGroupEventDialog implements OnInit {
    @Input() group?: Group;
    groupCode?: string;
    @Input() event?: GroupEvent;
    editEventForm: any;
    selectedTypeValue: string = "";
    eventTypes: any = [
        { name: 'Trip', value: 'trip' },
        { name: 'Expense', value: 'expense' },
        { name: 'Fill up gas', value: 'fillupgas' },
        { name: 'Income', value: 'income' },
    ];

    dropdownList: any = [];
    dropdownSettings: IDropdownSettings = {};

    constructor(
        public dialogRef: MatDialogRef<EditGroupEventDialog>,
        private eventService: GroupEventService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (this.data.groupCode) {
            this.groupCode = this.data.groupCode;
        }
        if (this.data.event) {
            this.event = this.data.event;
        }

        this.dialogRef.updateSize('400px', '80%');
        this.selectedTypeValue = this.event!.type;
        let hoursOffset = 1;
        let eventTime = new Date(this.event!.date);
        eventTime.setTime(eventTime.getTime() + hoursOffset * 60 * 60 * 1000);
        let doneFors = this.event!.done_fors.map(function (doneFor) { return doneFor.user; });
        let doneBies = this.event!.done_fors.map(function (doneBy) { return doneBy.user; });
        console.log(doneFors);
        console.log(doneBies);
        this.editEventForm = this.formBuilder.group({
            type: this.event!.type,
            description: this.event!.description,
            time: eventTime.toISOString().slice(0, 16),
            sum: this.event!.sum,
            distance: this.event!.distance,
            doneby: doneBies,
            donefor: doneFors
        });
    }

    ngOnInit() {
        if (this.data.event) {
            this.event = this.data.event;
        }
        if (this.data.group) {
            this.groupCode = this.data.group.code;
            this.group = this.data.group;
        }
        this.dropdownList = this.group!.members;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };

    }
    get type() {
        return this.editEventForm.value.type;
    }
    get description() {
        return this.editEventForm.value.description;
    }
    get time() {
        return this.editEventForm.value.time;
    }
    get sum() {
        return this.editEventForm.value.sum;
    }
    get distance() {
        return this.editEventForm.value.distance;
    }
    get doneby() {
        return this.editEventForm.value.doneby;
    }
    get donefor() {
        return this.editEventForm.value.donefor;
    }

    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

    close(): void {
        this.dialogRef.close()
    }

    updateEvent(): void {
        let data = {
            id: this.event!.id,
            type: this.type,
            description: this.description,
            time: this.time,
            sum: this.sum,
            distance: this.distance,
            doneby: this.doneby,
            donefor: this.donefor
        }
        this.eventService.updateEvent(this.groupCode!, data)
            .subscribe(resp => {
                if (resp) {
                    console.log('yayyy');
                    console.log(resp)
                    this.dialogRef.close(resp);
                } else {
                    console.log('nooo');
                }
            });
    }
}