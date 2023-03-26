import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  myForm!:FormGroup;
  loading = false;
  submitted = false;
  sio = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  //  private accountService: AccountService,
  //  private alertService: AlertService
  ) {  }

  ngOnInit():void {

    this.myForm = this.creaFormulario();

  }

  private creaFormulario(): FormGroup{
    return this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }


  // convenience getter for easy access to form fields
  public get f() {
    return this.myForm.controls;
  }

  public onSubmit(){
    alert("Se envia el formulario");
    this.submitted = true;
    console.log(this.myForm);
    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }else{
      alert("Se guardara la información");
    }

    this.loading = true;
   /* this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });*/
  }

}
