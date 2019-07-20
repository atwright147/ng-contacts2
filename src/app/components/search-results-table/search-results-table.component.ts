import { Component, OnInit, Input } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { IContact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-search-results-table',
  templateUrl: './search-results-table.component.html',
  styleUrls: ['./search-results-table.component.scss']
})
export class SearchResultsTableComponent implements OnInit {
  searchResults: IContact[];

  constructor(
    private readonly contactsService: ContactService,
  ) { }

  ngOnInit() {
    this.contactsService.searchResults.subscribe(
      (data: IContact[]) => this.searchResults = data,
      (err: any) => console.debug(err),
    );
  }

  get hasSearchResults() {
    return this.searchResults.length;
  }
}
