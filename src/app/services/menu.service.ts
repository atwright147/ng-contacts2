import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _openId: any = null;
  private _menuElement: HTMLElement | null;

  listener = (event: Event) => {
    const targetElement = event.target as HTMLElement;
    console.info(targetElement);
    if (this._menuElement && !this._menuElement.contains(targetElement) && !targetElement.classList.contains('menu-button')) {
      this.setClosed();
    }
  }

  constructor() {}

  setOpen(event: Event, id: any) {
    if ((event.target as HTMLElement).classList.contains('menu-button') && this._openId === id) {
      this.setClosed();
    } else {
      this._openId = id;
      this._menuElement = (event.target as HTMLElement).closest('.menu-container').querySelector('.menu-body');
    }
  }

  setClosed() {
    this._openId = null;
  }

  getOpen(id: any) {
    return this._openId === id;
  }

  addListener() {
    document.addEventListener('click', this.listener);
  }

  removeListener() {
    console.info('remove');
    document.removeEventListener('click', this.listener);
  }
}
