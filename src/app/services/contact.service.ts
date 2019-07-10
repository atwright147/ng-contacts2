import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { IContact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);
  private _chosen: BehaviorSubject<IContact> = new BehaviorSubject<IContact>({} as IContact);
  private _checked: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);
  private _sortBy: BehaviorSubject<any> = new BehaviorSubject({ key: '', reverse: false });

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
      (data: IContact) => this._chosen.next(data),
      (err) => console.debug(err),  // tslint:disable-line no-console
    );
  }

  get contacts() {
    return this._contacts.asObservable();
  }

  get chosen() {
    return this._chosen.asObservable();
  }

  get checked() {
    return this._checked.asObservable();
  }

  isChecked(contact: IContact) {
    return this._checked.value.includes(contact);
  }

  addChecked(contact: IContact) {
    const contacts = [contact, ...this._checked.value];
    this._checked.next(contacts);
  }

  removeChecked(contact: IContact) {
    const checkedClone = [].concat(this._checked.value);
    const checkedIndex = this._checked.value.findIndex((item) => item === contact);
    checkedClone.splice(checkedIndex, 1);
    this._checked.next(checkedClone);
  }

  move(row: IContact, direction: 'up' | 'down' | 'first' | 'last') {
    const index = this._contacts.value.indexOf(row);
    if (index === -1) { return; }

    switch (direction) {
      case 'up':
        [this._contacts.value[index - 1], this._contacts.value[index]] = [this._contacts.value[index], this._contacts.value[index - 1]];
        break;

      case 'down':
        [this._contacts.value[index + 1], this._contacts.value[index]] = [this._contacts.value[index], this._contacts.value[index + 1]];
        break;

      case 'first':
        [this._contacts.value[0], this._contacts.value[index]] = [this._contacts.value[index], this._contacts.value[0]];
        break;

      case 'last':
        const len = this._contacts.value.length - 1;
        [this._contacts.value[len], this._contacts.value[index]] = [this._contacts.value[index], this._contacts.value[len]];
        break;
    }
  }

  isFirst(contact: IContact) {
    return this._contacts.value.indexOf(contact) === 0;
  }

  isLast(contact: IContact) {
    return this._contacts.value.indexOf(contact) === this._contacts.value.length - 1;
  }

  sort(key: string) {
    let _reverse = this._sortBy.value.reverse || false;
    if (this._sortBy.value.key === key) {
      _reverse = !this._sortBy.value.reverse;
    }
    const sorted = this._contacts.value.sort(this.sortBy(key, _reverse));
    this._contacts.next(sorted);
    this._sortBy.next({ key, reverse: _reverse });
  }

  private sortBy(key: string, reverse: boolean) {
    const moveSmaller = reverse ? 1 : -1;
    const moveLarger = reverse ? -1 : 1;

    return (a: any, b: any) => {
      if (a[key] < b[key]) {
        return moveSmaller;
      }
      if (a[key] > b[key]) {
        return moveLarger;
      }
      return 0;
    };
  };
}
