import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-objectarrayprint',
  templateUrl: './objectarrayprint.component.html',
  styleUrls: ['./objectarrayprint.component.sass']
})
export class ObjectarrayprintComponent implements OnInit {
  @Input() object: any[];
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
