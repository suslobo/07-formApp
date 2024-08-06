import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = { //este es nuestro producto
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

/*   public myForm: FormGroup = new FormGroup({
    name: new FormControl('', []),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }) */
 //ahora con FormBuilder
public myForm: FormGroup = this.fb.group({
  name: ['', [ Validators.required, Validators.minLength(3) ] ],
  price: [0, [ Validators.required, Validators.min(0)] ],
  inStorage:  [0, [ Validators.required, Validators.min(0)] ],
})

 constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    //aquí inicializamos el formulario y nos creamos una constante rtx5090
    // this.myForm.reset( rtx5090 );
  }

  //validamos con un método
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string): string | null {

    if ( !this.myForm.controls[field]  ) return null; //si no tenemos ese campo no regresa nada

    const errors = this.myForm.controls[field].errors || {}; //si es nulo regresa un objeto vacío

    for (const key of Object.keys(errors)) {
      switch( key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength} caracters.`;

      }
    }

    return null;
  }


 onSave():void {

  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched(); //marca todos los campos como si hubieran sido tocados
    return;
  }

  console.log(this.myForm.value);
  //restablecer el formulario
  this.myForm.reset({ price: 0, inStorage: 0 });
 }

}
