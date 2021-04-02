import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription //to prevent memory leak

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {///for 2 message options
      if(params['registered']){
        //Now you can login
      }else if (params['accessDenied']){
        //You need to be authorized
      }
    })
  }

  get getControl(){
    return this.form.controls;
  }

  ngOnDestroy(){//when we go to another page
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit(){
    this.form.disable();

    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.aSub = this.auth.signIn(user).subscribe(
      //If user loged in
      () => this.router.navigate(['/sign-up']),
      (error) => {
        console.warn(error);
        this.form.enable();
      }
    );
  }

}
