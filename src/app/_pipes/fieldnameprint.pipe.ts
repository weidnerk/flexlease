import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldnameprint'
})
export class FieldnameprintPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.convert(value);
  }

/**
 * Transform camel-cased variable name to printable name
 * @param fieldname
 */
  convert(fieldname: string): string {
    let newFieldName = '';
    for (const l of fieldname) {
      if (l === l.toUpperCase()) {
        newFieldName = newFieldName.concat(' ' + l.toUpperCase());
       } else {
        newFieldName = newFieldName.concat(l);
       }
    }
    newFieldName = newFieldName.substring(0, 1).toUpperCase() + newFieldName.substring(1, newFieldName.length);
    return newFieldName;
  }
}
