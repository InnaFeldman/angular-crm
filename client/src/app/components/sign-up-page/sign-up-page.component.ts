import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
 form!: FormGroup;
 aSub!: Subscription; //to prevent memory leak

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute)
    { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  get getControl(){
    return this.form.controls;
  }

  ngOnDestroy(){
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

    this.aSub = this.auth.signUp(user).subscribe(
      () => {
        //If signed up successfully, redirect to Login page
        this.router.navigate(['/login'], {queryParams: {registered: true}})
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }

}
