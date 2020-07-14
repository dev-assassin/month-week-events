import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Activity} from "../interfaces/activity.interface";

@Component({
  templateUrl: 'activity-info.dialog.html',
  styleUrls: ['activity-info.dialog.scss']
})
export class ActivityInfoDialog {
  activity: Activity;

  constructor(public dialogRef: MatDialogRef<ActivityInfoDialog>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.activity = data;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
