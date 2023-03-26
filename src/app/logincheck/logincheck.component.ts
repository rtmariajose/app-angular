import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';

//import PNotify from '@angular/PNo'
@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.css']
})
export class LogincheckComponent implements OnInit{
  myForm!:FormGroup;
  loading = false;
  submitted = false;
  sio = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient

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
    this.submitted = true;
    this.loading = true;
    if (this.myForm.invalid) {
      return;
    }else{
      const params = new HttpParams()
        .set('email', this.myForm.value.email)
        .set('password',this.myForm.value.password)

      this.http.get('http://localhost:3000/usuario_login', { params })
        .subscribe((response: any) => {
          console.log("hay que redirigir");
          this.loading = false;
          this.router.navigateByUrl('/inicio');
        });

    }

  }

}
