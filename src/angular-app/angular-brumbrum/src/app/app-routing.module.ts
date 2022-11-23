import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupEventsComponent } from './group-events/group-events.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: 'events', component: GroupEventsComponent },
  { path: 'group/:code', component: GroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }