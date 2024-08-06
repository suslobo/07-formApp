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
    this.myForm.reset( rtx5090 );

  }

 onSave():void {
  console.log(this.myForm.value);

  //restablecer el formulario
  this.myForm.reset({ price: 0, inStorage: 0 });
 }

}
