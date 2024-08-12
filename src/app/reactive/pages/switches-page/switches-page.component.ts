import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesModule } from '../../../../../../04-countryApp/src/app/countries/countries.module';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ], //tiene que tener un valor selecionado
    termsAndConditions: [ false, Validators.requiredTrue ] //tiene que tener un valor verdadero
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  //ngSubmit esto va en el html linea 4
  onSave() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
