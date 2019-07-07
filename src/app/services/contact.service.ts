import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { IContact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);
  private _chosenContact: BehaviorSubject<IContact> = new BehaviorSubject<IContact>({} as IContact);

  constructor(
    private readonly http: HttpClient,
  ) { }

  fetchAll() {
    return this.http.get('/api/contacts').subscribe(
      (data: IContact[]) => this._contacts.next(data),
      (err) => console.debug(err),  // tslint:disable-line no-console
    );
  }

  fetchById(id: number) {
    return this.http.get(`/api/contacts/${id}`).subscribe(
      (data: IContact) => this._chosenContact.next(data),
      (err) => console.debug(err),  // tslint:disable-line no-console
    );
  }

  get contacts() {
    return this._contacts.asObservable();
  }

  get chosenContact() {
    return this._chosenContact.asObservable();
  }

  addChecked(contact: IContact) {
    const contacts = this._contacts.value;
    const contactIndex = this._contacts.value.findIndex((item) => item === contact);
    contacts[contactIndex].checked = true;
    this._contacts.next(contacts);
    console.info(this._contacts.value);
  }

  removeChecked(contact: IContact) {
    contact.checked = false;
  }
}
