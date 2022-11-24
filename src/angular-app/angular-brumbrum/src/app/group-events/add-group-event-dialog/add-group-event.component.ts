import { Component, Input, OnInit, Inject } from '@angular/core';
import { GroupEventService } from '../../group-events.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LogService } from 'src/app/log/log.service';
import { Group } from 'src/app/group';

@Component({
    selector: 'add-group-events-dialog',
    templateUrl: './add-group-event.component.html',
})
export class AddGroupEventsDialog implements OnInit {
    @Input() group?: Group;
    groupCode?: string;
    addEventForm: any;
    selectedTypeValue: string = "expense";
    eventTypes: any = [
        { name: 'Trip', value: 'trip' },
        { name: 'Expense', value: 'expense' },
        { name: 'Fill up gas', value: 'fillupgas' },
        { name: 'Income', value: 'income' },
    ];

    dropdownList: any = [];
    selectedItems: any = [];
    dropdownSettings: IDropdownSettings = {};

    constructor(
        public dialogRef: MatDialogRef<AddGroupEventsDialog>,
        private eventService: GroupEventService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.dialogRef.updateSize('400px', '80%');
        this.addEventForm = this.formBuilder.group({
            type: ['', [Validators.required]],
            description: ['', [Validators.required]],
            time: ['', [Validators.required]],
            sum: [0, [Validators.required]],
            distance: [0, [Validators.required]],
            doneby: [[], [Validators.required]],
            donefor: [[], [Validators.required]],
        });
    }

    ngOnInit() {
        if (this.data.group) {
            this.groupCode = this.data.group.code;
            this.group = this.data.group;
        }
        console.log(this.group!.members);
        this.dropdownList = this.group!.members;
        this.selectedItems = [];
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
        return this.addEventForm.value.type;
    }
    get description() {
        return this.addEventForm.value.description;
    }
    get time() {
        return this.addEventForm.value.time;
    }
    get sum() {
        return this.addEventForm.value.sum;
    }
    get distance() {
        return this.addEventForm.value.distance;
    }
    get doneby() {
        return this.addEventForm.value.doneby;
    }
    get donefor() {
        return this.addEventForm.value.donefor;
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.addEventForm.value)
    }
    onSelectAll(items: any) {
        console.log(items);
        console.log(this.addEventForm.value)
    }

    close(): void {
        this.dialogRef.close()
    }

    addEvent(): void {
        let data = {
            type: this.type,
            description: this.description,
            time: this.time,
            sum: this.sum,
            distance: this.distance,
            doneby: this.doneby,
            donefor: this.donefor
        }
        console.log(data);
        this.eventService.addEvent(this.groupCode!, data)
            .subscribe(resp => {
                if (resp) {
                    console.log('yayyy');
                    this.dialogRef.close(resp)
                } else {
                    console.log('nooo');
                }
            });
    }
}