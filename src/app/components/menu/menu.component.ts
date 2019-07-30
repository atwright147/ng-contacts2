import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { MenuService } from '../../services/menu.service';
import { IContact } from '../../interfaces/contact.interface';
import { MoveType } from '../../enums/move-type';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() id: any;
  @Input() allItems: any;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private readonly contactService: ContactService,
    private readonly menuService: MenuService,
  ) { }

  ngOnInit() {}

  setOpen() {
    this.menuService.setOpen(event, this.id);  // tslint:disable-line:deprecation
  }

  setClosed() {
    this.menuService.setClosed();
  }

  get open() {
    return this.menuService.getOpen(this.id);
  }

  move(direction: MoveType) {
    this.menuService.setClosed();
    this.contactService.move(this.id, direction);
  }

  isFirst(contact: IContact) {
    return this.contactService.isFirst(contact);
  }

  isLast(contact: IContact) {
    return this.contactService.isLast(contact);
  }
}
