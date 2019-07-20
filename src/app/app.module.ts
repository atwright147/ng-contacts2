import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactsTableComponent,
    SearchResultsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
