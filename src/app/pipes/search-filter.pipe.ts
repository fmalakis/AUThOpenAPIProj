import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../services/classes-service/classes.service';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Department[], filter: string): any {
    if (!items || !filter)
      return items;

    return items.filter((item) => 
    item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()
    .includes(filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()));
  }

  normalizeGreek(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

}
