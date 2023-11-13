import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username.validator';
import { passwordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  errorMsg=""; 
  submitted = false;

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService){

  }

  registrationForm: FormGroup = new FormGroup({

  });

  get userName(){
    return this.registrationForm.get('userName');

  }
  get email(){
    return this.registrationForm.get('email');

  }

  get altEmails(){
    return this.registrationForm.get('altEmails') as FormArray;
  }


 

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['',[ Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state:  [''],
        postalcode: ['']
      }),
      altEmails: this.fb.array([])
    }, {validator: passwordValidator});

    this.registrationForm.get('subscribe')?.valueChanges.
          subscribe(checkedValue =>{
            const email = this.registrationForm.get('email');
            if(checkedValue){
              email?.setValidators(Validators.required);
            }else{
              email?.clearValidators();
            }
            email?.updateValueAndValidity();
          })

  }


  loadapidata(){
    //                or .setValue
    this.registrationForm.patchValue({
      userName: "jhon",
      password: "test",
      confirmPassword: 'test',
      // address: {
      //   city: 'city',
      //   state: 'state',
      //   postalcode: '123456'
      // }
    })
  }

  addAltEmail(){
    this.altEmails.push(this.fb.control(''));
  }

  onSubmit(){
    this.submitted=true;
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => this.errorMsg=error.statusText
        );
  }



  // registrationForm = new FormGroup({
  //   userName: new FormControl('Reina'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalcode: new FormControl('')
  //   })
  // });



  
}
