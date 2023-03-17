import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:any
  pswd:any

  loginForm:any= this.fb.group({
    uname:['', [Validators.required, Validators.email]],
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })
  
  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid) {

      this.router.navigateByUrl('home')
      alert('Login Succesful')
    }else{
      alert('Invalid Form!')
    }
  }

}
