import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  checkOne(event: any, row: IContact) {
    if (event.target.checked) {
      this.contactService.addChecked(row);
    } else {
      this.contactService.removeChecked(row);
    }
  }

  isChecked(contact: IContact) {
    return this.contactService.isChecked(contact);
  }

  getClassNames(key: string) {
    const classNames = [];

    if (this.contactService.isSortedBy(key)) {
      classNames.push('is-sorted-by');
    }

    if (this.contactService.isSortedBy(key) && this.contactService.isSortReversed(key)) {
      classNames.push('is-reversed');
    }

    return classNames.join(' ');
  }

  get checked() {
    let checked: IContact[];
    this.contactService.checked.subscribe(
      (data) => checked = data,
    );
    return checked;
  }

  sort(column: string) {
    this.contactService.sort(column);
  }

  move(contact: IContact, direction: 'up' | 'down' | 'first' | 'last') {
    this.contactService.move(contact, direction);
  }

  isFirst(contact: IContact) {
    return this.contactService.isFirst(contact);
  }

  isLast(contact: IContact) {
    return this.contactService.isLast(contact);
  }

  onSubmit(data: any) {
    this.contactService.search(data.searchTerm);
  }

  clearSearchResults() {
    this.contactService.clearSearch();
  }
}
