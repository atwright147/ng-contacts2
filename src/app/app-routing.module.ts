import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { DatePickerPageComponent } from './components/date-picker-page/date-picker-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsListComponent,
  },
  {
    path: 'date-picker',
    component: DatePickerPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
