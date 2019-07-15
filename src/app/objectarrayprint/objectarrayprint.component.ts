/**
 * Print an array of objects in spreadsheet-like format.
 * 
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { YearresidualimpactorComponent } from '../yearresidualimpactor/yearresidualimpactor.component';

const compMap = {
  Yearresidualimpactors: YearresidualimpactorComponent
};

@Component({
  selector: 'app-objectarrayprint',
  templateUrl: './objectarrayprint.component.html',
  styleUrls: ['./objectarrayprint.component.scss']
})

export class ObjectarrayprintComponent implements OnInit {
  @Input() object: any;
  @Input() objectName: any;
  @Input() displayEdit: boolean;  // whether to display edit symbol
  @Input() formatMap: any;        // pass keypair how to format a number (optional)

  constructor(public dialog: MatDialog) { }

  arrName: string[][];
  keys: string[] = [];
  values: string[] = [];

  ngOnInit() {
    this.keys = Object.keys(this.object[0]);
  }

  getObjectValues(o: any) {
    const r = Object.values(o);
    return r;
  }

  isObject(o: any): boolean {
    if (o) {
      if (typeof o === 'object') {
        return true;
      } else { return false; }
    } else {
      return false;
    }
  }

  /**
   * This component wants to iterate an array so in the case of a nested object in an array element,
   * convert that object to an array.
   * @param o 
   */
  objectToArray(o: any) {
    if (o) {
      const arr = [o];
      return arr;
    } else {
      return null;
    }
  }

  edit(item: any) {
    // let i = item;
    if (this.objectName in compMap) {

      const dialogRef = this.dialog.open(compMap[this.objectName], {
        height: '650px',
        width: '700px',
        data: {
          rec: item
        }
      });
    } else {
      // throw new Error(`Unknown ${this.de} component`);
    }
  }

  isNumber(value: any) {
    return !isNaN(Number(value));
  }

  /**
   * Used by the template to see if a pipe number format was provided
   * @param fieldName
   */
  getFormat(fieldName: string) {
    if (this.formatMap) {
      if (this.formatMap[fieldName]) {
        // console.log(this.formatMap[fieldName]);
        return this.formatMap[fieldName];
      }
    }
    return null;
  }
}
