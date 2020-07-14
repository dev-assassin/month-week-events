import { Component, Input, OnInit } from '@angular/core';
import { monthsMap } from '../../constants/months.constant';
import { Activity } from '../../interfaces/activity.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivityInfoDialog } from '../../dialogs/activity-info.dialog';
import { OPERATION } from '../../constants/activity-types.constant';
import { compareDate } from '../../constants/functions.constants';

@Component({
  selector: 'monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent implements OnInit {
  months = [];
  dateNow = new Date();
  currentYear = this.dateNow.getFullYear();
  tmpMap: Map<string, Activity[]>;

  @Input() set events(events: Activity[]) {
    this.tmpMap = new Map();
    events?.forEach(it => {
      const date = new Date(it.date);
      const key = date.getFullYear() + ' ' + date.getMonth();
      if (this.tmpMap.has(key)) {
        const existingValues: Activity[] = this.tmpMap.get(key);
        existingValues.push(it);
        this.tmpMap.set(date.getFullYear() + ` ` + date.getMonth(), existingValues);
      } else {
        this.tmpMap.set(key, [it]);
      }
    });
  }

  constructor(private _dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    for (const key of monthsMap.keys()) {
      this.months.push(key);
    }
  }

  yearBack() {
    this.currentYear -= 1;
  }

  yearForward() {
    this.currentYear += 1;
  }

  getEventsForMonth(month: string): Activity[] {
    const monthNumber = monthsMap.get(month);
    const key: string = this.currentYear + ' ' + (monthNumber - 1).toString();
    if (this.tmpMap.has(key)) {
      return this.tmpMap.get(key).sort((a, b) => compareDate(new Date(a.date), new Date(b.date)));
    } else {
      return [];
    }
  }

  getMatIconForEvent(event: Activity): string {
    if (event.type == 'Operation') {
      return 'medical_services';
    } else {
      return 'leaderboard';
    }
  }

  getColorClass(event: Activity) {
    if (event.type == OPERATION) {
      return 'color-pink';
    } else {
      return 'color-purple';
    }
  }

  showInfo(event: Activity) {
    this._dialogRef.open(ActivityInfoDialog, {
      width: '400px',
      height: '250px',
      data: event
    });
  }
}
