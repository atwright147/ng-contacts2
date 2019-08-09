import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  private _month: number;
  private _year: number;

  constructor() { }

  get month() {
    return this._month;
  }

  set month(month: number) {
    this._month = month;
  }

  get year() {
    return this._year;
  }

  set year(year: number) {
    this._year = year;
  }

  get firstDayOfMonth() {
    return (new Date(this.year, this.month)).getDay();
  }

  get numDaysInSelectedMonth() {
    return 32 - new Date(this.year, this.month, 32).getDate();
  }

  get numCellsToRender() {
    let numCells = 0;
    numCells += this.firstDayOfMonth;
    numCells += this.numDaysInSelectedMonth;
    if (numCells % 7 !== 0) {
      while (numCells % 7 !== 0) {
        numCells += 1;
      }
    }
    return numCells;
  }

  getLastDaysOfPreviousMonth(firstDayOfSelectedMonth = 0) {
    const lastDaysOfPreviousMonth = [];

  }
}
