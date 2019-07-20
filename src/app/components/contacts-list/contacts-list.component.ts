import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts: IContact[];
  isLoaded = false;

  constructor(
    private readonly contactService: ContactService,
  ) { }

  ngOnInit() {
    this.contactService.fetchAll();
    this.contactService.contacts.subscribe(
      (data) => this.contacts = data,
    );
  }

  onSubmit(data: any) {
    this.contactService.search(data.searchTerm);
  }

  clearSearchResults() {
    this.contactService.clearSearchResults();
  }
}
