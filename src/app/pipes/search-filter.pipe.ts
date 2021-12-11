import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../services/classes-service/classes.service';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Department[], filter: string): any {
    if (!items || !filter)
      return items;

    return items.filter((item) => item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  }

}
