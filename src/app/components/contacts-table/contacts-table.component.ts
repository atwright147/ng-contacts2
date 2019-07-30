import { Component, Input, OnInit } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { MenuService } from '../../services/menu.service';
import { IContact } from '../../interfaces/contact.interface';
import { MoveType } from '../../enums/move-type';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent {
  @Input() contacts: IContact[];
  positionsEnum = MoveType;

  constructor(
    private readonly contactService: ContactService,
    private readonly menuService: MenuService,
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

  move(contact: IContact, position: MoveType) {
    this.contactService.move(contact, position);
  }

  isFirst(contact: IContact) {
    return this.contactService.isFirst(contact);
  }

  isLast(contact: IContact) {
    return this.contactService.isLast(contact);
  }

  handleSubmit(event: Event, contact: IContact, form: any) {
    event.preventDefault();
    this.menuService.setClosed();
    const direction = form.value.direction.toUpperCase();  // linting fix (line length)
    this.contactService.move(contact, MoveType[direction] as any, form.value.relativePosition, form.value.relativeTo);
  }

  isReorderFormValid(form: any) {
    if (form.value.direction) {
      if (form.value.direction === MoveType.RELATIVE) {
        return form.value.relativePosition && form.value.relativeTo;
      }
      return true;
    }
    return false;
  }
}
