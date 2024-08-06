import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {


  //formulario dinámico
  //vamos a enlazarlo con el html
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Strand', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  //nuevo método
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
   //nuevo método
   isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }
  //nuevo método
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

  //insertar elemmentos en el array, hemos creado newFavorite linea 20
  onAddToFavorites():void {

    if ( this.newFavorite.invalid ) return;
    //hacemos una constante para que sea más legible
    const newGame = this.newFavorite.value;

    //y ahora lo insertamos
    //esto lo haríamos si no estuviéramos trabajando con el formBuilder
    // this.favoriteGames.push(  new FormControl( newGame, Validators.required ) );

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset(); //resetea el campo
  }


  //eliminar elementos del array. nuestro array es favoriteGames
  onDeleteFavorite( index: number ):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }

}
