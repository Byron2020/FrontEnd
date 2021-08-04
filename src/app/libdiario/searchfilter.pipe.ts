import { Pipe, PipeTransform } from '@angular/core';
import { LibDiario } from '../modelos/lib-diario';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Libros: LibDiario[],searchValue:string): LibDiario[] {
    if(!Libros || !searchValue){
      return Libros;
    }
    return Libros.filter(Libros=> 
      Libros.nume_libdiario.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      Libros.fechini_libdiario.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      Libros.fechfin_libdiario.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
  }

}
