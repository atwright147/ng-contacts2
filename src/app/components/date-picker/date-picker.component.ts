import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  firstDayOfMonth: number;
  daysInMonth: number;
  numDaysInWeek = 7;
  numWeeksInMonth = 4;
  daysInWeek: undefined[] = [];
  weeksInMonth: undefined[] = [];
  numCellsToRender: undefined[] = [];
  numCells = 0;

  constructor() { }

  ngOnInit() {
    this.genFirstDayOfMonth(2019, 7);
    this.genDaysInMonth(2019, 7);
    this.numCells = this.genNumCells();
    this.daysInWeek.length = this.numDaysInWeek;
    this.weeksInMonth.length = this.numWeeksInMonth;
    this.numCellsToRender.length = this.numCells;
  }

  genFirstDayOfMonth(year: number, month: number) {
    this.firstDayOfMonth = (new Date(year, month)).getDay();
  }

  genDaysInMonth(year: number, month: number) {
    this.daysInMonth = 32 - new Date(year, month, 32).getDate();
  }

  genNumCells() {
    let numCells = 0;
    numCells += this.firstDayOfMonth;
    numCells += this.daysInMonth;
    if (numCells % 7 !== 0) {
      while (numCells % 7 !== 0) {
        numCells += 1;
      }
    }
    return numCells;
  }
}
