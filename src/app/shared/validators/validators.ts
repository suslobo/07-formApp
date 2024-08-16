  import { FormControl } from "@angular/forms";


export const cantBeStrider = ( control: FormControl ) => {
  // trim() limpia la posicion delante y detrás
  // toLowerCase() para hacerlo en minúscula
  //esta validacion solo asegura que no sea strider
  const value: string = control.value.trim().toLowerCase();

  //si el value es igual que strider en minuscula refresa el error
  if ( value === 'strider' ) {
    return {
      noStrider: true,
    }
  }
  //en caso contrario regresa null (si no es strider)
  return null;

}
