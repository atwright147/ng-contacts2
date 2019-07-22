import { Component, OnInit, OnDestroy } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { MenuService } from '../../services/menu.service';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: IContact[];
  isLoaded = false;

  constructor(
    private readonly contactService: ContactService,
    private readonly menuService: MenuService,
  ) { }

  ngOnInit() {
    this.contactService.fetchAll();
    this.contactService.contacts.subscribe(
      (data) => this.contacts = data,
    );
    this.menuService.addListener();
  }

  ngOnDestroy() {
    this.menuService.removeListener();
  }

  onSubmit(data: any) {
    this.contactService.search(data.searchTerm);
  }

  get searchResults() {
    return this.contactService.searchResults;
  }

  clearSearchResults() {
    this.contactService.clearSearchResults();
  }

  removeListener() {
    this.menuService.removeListener();
  }
}
