import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      alert('Hi');
      return;
    }
    if(this.loginForm.controls.email.value =="bhoir.makarand@gmail.com" &&
        this.loginForm.controls.password.value=="4321"){
          // add email in the local storage 
          localStorage.setItem("username",this.loginForm.controls.email.value);
          // this will redirect you to another component
          this.router.navigate(['list-user']);
    }
    else{
      this.invalidLogin = true;
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['bhoir.makarand@gmail.com', Validators.required],
      password: ['4321', Validators.required]
    });
  }

}
