
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider' ) {
      return {
        noStrider: true,
      }
    }

    return null;

  }

  //creamos otro método
  public isValidField( form: FormGroup, field: string ) {
      return form.controls[field].errors && form.controls[field].touched;
    }
  //función que regresa una función
  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      //si son diferentes
      //si cualquier imput tiene un error todo el formulario va a marcarse como un error
      if ( fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true } //este es el error del formulario
      }
      //si son iguales
      formGroup.get(field2)?.setErrors(null);
      return null;

    }

    }
  }
