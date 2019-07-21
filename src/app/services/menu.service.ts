import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _openId: any = null;
  private _menuElement: HTMLElement | null;

  constructor() {}

  setOpen(event: Event, id: any) {
    this._openId = id;
    this._menuElement = (event.target as HTMLElement).closest('.menu-container').querySelector('.menu-body');
  }

  setClosed() {
    this._openId = null;
  }

  getOpen(id: any) {
    return this._openId === id;
  }

  addListener() {
    document.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (this._menuElement && !this._menuElement.contains(targetElement) && !targetElement.classList.contains('menu-button')) {
        this.setClosed();
      }
    });
  }

  removeListener() {}
}
