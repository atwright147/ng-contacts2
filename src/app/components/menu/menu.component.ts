import { Component, OnInit, Input } from '@angular/core';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() id: any;

  constructor(
    private readonly menuService: MenuService,
  ) { }

  ngOnInit() {}

  setOpen() {
    this.menuService.setOpen(event, this.id);
  }

  setClosed() {
    this.menuService.setClosed();
  }

  get open() {
    return this.menuService.getOpen(this.id);
  }
}
