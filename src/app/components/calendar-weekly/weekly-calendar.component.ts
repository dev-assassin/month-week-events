import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../interfaces/activity.interface';
import {MatDialog} from '@angular/material/dialog';
import {ActivityInfoDialog} from '../../dialogs/activity-info.dialog';
import {OPERATION} from '../../constants/activity-types.constant';
import {WEEK_TYPES} from '../../constants/weeks.constant';

@Component({
  selector: 'weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})
export class WeeklyCalendarComponent implements OnInit {
  dateNow = new Date();
  activities: Activity[] = [];
  typesMap: Map<string, string> = WEEK_TYPES;
  // tslint:disable-next-line:max-line-length
  types = ['Clinic', 'Labs', 'Radiology', 'Pathology', 'Endoscopy', 'eCare', 'My Coach', 'Surgery', 'Post Sugnery Self Assessment', 'My Menu'];
  weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  interval: number = 12;

  readonly defaultIconPath = '../assets/icons/';

  @Input() set setInterval(interval: number) {
    this.interval = interval;
    this.weeks = [];
    for (let i = 1; i <= interval; i++) {
      this.weeks.push(i);
    }
  };

  @Input() set events(events: Activity[]) {
    this.activities = events;
  }

  constructor(private _dialogRef: MatDialog) {
  }

  ngOnInit(): void {
  }

  getImageForEvent(event: Activity) {
    if (event.type == OPERATION) {
      return this.typesMap.get('Clinic');
    } else {
      return this.typesMap.get('Labs');
    }
  }

  showInfo(event: Activity) {
    this._dialogRef.open(ActivityInfoDialog, {
      width: '400px',
      height: '250px',
      data: event
    });
  }

  getEventsForWeek(week: number): Activity[] {
    if (this.activities) {
      const lessThanDate = new Date();
      const biggerThanDate = new Date();
      console.log('less,bigger', lessThanDate, biggerThanDate, week);
      biggerThanDate.setDate(this.dateNow.getDate() + ((week + 1) * 7));
      lessThanDate.setDate(this.dateNow.getDate() + (week * 7));
      return this.activities?.filter(activity => new Date(activity.date) < biggerThanDate && new Date(activity.date) >= lessThanDate);
    } else {
      return [];
    }
  }
}
