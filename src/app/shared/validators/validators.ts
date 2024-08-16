import { FormControl, ValidationErrors } from "@angular/forms";

//para la validación del email
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const cantBeStrider = ( control: FormControl ): ValidationErrors | null => {
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
