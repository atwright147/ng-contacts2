import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import cloneDeep from 'lodash/cloneDeep';

import { IContact } from '../interfaces/contact.interface';
import { getUniqueMerge } from '../../helpers/array.helper';
import { MoveType } from '../enums/move-type';
import { RelativePosition } from '../enums/relative-position';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly _contacts: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);
  private readonly _chosen: BehaviorSubject<IContact> = new BehaviorSubject<IContact>({} as IContact);
  private readonly _checked: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);
  private readonly _sortBy: BehaviorSubject<any> = new BehaviorSubject({ key: '', reverse: false });
  private readonly _searchResults: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>([]);

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

  get searchResults() {
    return this._searchResults.asObservable();
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

  move(contact: IContact, moveType: MoveType, relativePosition?: RelativePosition, relativeTo?: number) {
    const index = this._contacts.value.indexOf(contact);
    const contacts = cloneDeep(this._contacts.value);
    if (index === -1) { return; }

    switch (moveType) {
      case MoveType.UP:
        [contacts[index - 1], contacts[index]] = [contacts[index], contacts[index - 1]];
        break;

      case MoveType.DOWN:
        [contacts[index + 1], contacts[index]] = [contacts[index], contacts[index + 1]];
        break;

      case MoveType.FIRST:
        contacts.unshift(contacts.splice(index, 1)[0]);
        break;

      case MoveType.LAST:
        contacts.push(contacts.splice(index, 1)[0]);
        break;

      case MoveType.RELATIVE:
        let newIndex: number;
        if (relativePosition === RelativePosition.AFTER) {
          newIndex = Number(relativeTo) + 1;
        }
        if (relativePosition === RelativePosition.BEFORE) {
          newIndex = Number(relativeTo);
        }
        const removedElement = contacts.splice(index, 1)[0];
        contacts.splice(newIndex, 0, removedElement);
        break;
    }

    this._contacts.next(contacts);
  }

  isFirst(contact: IContact) {
    return this._contacts.value.indexOf(contact) === 0;
  }

  isLast(contact: IContact) {
    return this._contacts.value.indexOf(contact) === this._contacts.value.length - 1;
  }

  isSortedBy(key: string) {
    return this._sortBy.value.key === key;
  }

  isSortReversed(key: string) {
    return this._sortBy.value.key === key && this._sortBy.value.reverse;
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
  }

  search(term: string): IContact[] | [] {
    if (!term) {
      return [];
    }

    const fieldsToSearchBy = [
      'firstName',
      'lastName',
      'prefix',
      'email',
    ];
    const result = fieldsToSearchBy.map(sk => this.searchBy(sk, term));

    this._searchResults.next(getUniqueMerge(...result) as IContact[]);
  }

  searchBy(key: string, term: string) {
    const regex = new RegExp(term, 'i');
    return this._contacts.value.filter((contact: any) => regex.test(contact[key]));
  }

  clearSearchResults() {
    this._searchResults.next([]);
  }
}
