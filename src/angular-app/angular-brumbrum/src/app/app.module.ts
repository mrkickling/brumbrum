import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupEventsComponent } from './group-events/group-events.component';
import { GroupFinancesComponent } from './group-finances/group-finances.component';
import { AddGroupEventsDialog } from './group-events/add-group-event-dialog/add-group-event.component';
import { GroupComponent } from './group/group.component'; // <-- NgModel lives here
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SortBydatePipe } from './pipes/sort-by.pipe';
import { EditGroupEventDialog } from './group-events/edit-group-event-dialog/edit-group-event.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogService } from './log/log.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    GroupEventsComponent,
    GroupFinancesComponent,
    GroupComponent,
    DateAgoPipe,
    AddGroupEventsDialog,
    EditGroupEventDialog,
    SortBydatePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgMultiSelectDropDownModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
