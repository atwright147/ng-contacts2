import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly menuService: MenuService,
  ) { }

  ngOnInit() {}

  setOpen() {
    this.menuService.setOpen();
  }

  setClosed() {
    this.menuService.setClosed();
  }

  get open() {
    return this.menuService.open;
  }
}
