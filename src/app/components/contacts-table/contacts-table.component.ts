import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ContactService } from '../../services/contact.service';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent {
  @Input() contacts: IContact[];

  constructor(
    private readonly contactService: ContactService,
    private readonly http: HttpClient,
  ) { }

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

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const formValueAsArray = Object.values(formValue).map((_item, index) => formValue[index]);
    this.http.post('/contacts', formValueAsArray).subscribe();
  }
}
