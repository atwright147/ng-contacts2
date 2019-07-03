import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts;
  isLoaded = false;

  constructor(
    private readonly contact: ContactService,
  ) { }

  ngOnInit() {
    this.contact.getAll().subscribe(
      (data) => this.contacts = data,
      (err) => console.debug(err),
      () => this.isLoaded = true,
    );
  }

}
