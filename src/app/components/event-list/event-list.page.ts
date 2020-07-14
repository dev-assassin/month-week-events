import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MockService } from '../../services/mock.service';
import { Activity } from '../../interfaces/activity.interface';

@Component({
  selector: 'event-lists',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss']
})
export class EventListPage implements OnInit {
  events$: Observable<Activity[]> = of([]);
  interval: number = 12;
  calendarType: string = "MONTHLY";

  constructor(private mockService: MockService) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.events$ = this.mockService.getMockData().pipe(
      tap(it => {
        this.calendarType = it.interval_type;
        this.interval = it.interval;
      }),
      map((it => it.care_pathway_activities))
    );
  }
}
