import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-objectprint',
  templateUrl: './objectprint.component.html',
  styleUrls: ['./objectprint.component.scss']
})
export class ObjectprintComponent implements OnInit {
  @Input() object: any;
  constructor() { }

  keys: string[] = [];
  values: string[] = [];

  ngOnInit() {
    this.keys = Object.keys(this.object);
    this.values = Object.values(this.object);
  }
  isNumber(value: any) {
    return !isNaN(Number(value));
  }
}
