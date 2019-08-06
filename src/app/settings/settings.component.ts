import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SettingsdialogComponent } from '../settingsdialog/settingsdialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router,
    ) {
    const dialogRef = this.dialog.open(SettingsdialogComponent, {
      height: '650px',
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {

  }
}

