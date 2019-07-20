import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly _open: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  setOpen() {
    this._open.next(true);
  }

  setClosed() {
    this._open.next(false);
  }

  get open() {
    return this._open.value;
  }
}
