import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoriesService } from 'src/app/services/categories.service';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef!: ElementRef ;

  isNew = true;
  form!: FormGroup;
  image!: File;
  imagePreview;
  category!: Category;

  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    })

    this.form.disable();

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']){
              this.isNew = false;
              return this.categoriesService.getById(params['id'])
            }
            return of(null);
          }
        )
      ).subscribe(
        (category) =>{

          if(category){
            this.category = category;

            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc; //to save uploaded img
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  get getControl(){
    return this.form.controls;
  }

  triggerClick(){
    this.inputRef.nativeElement.click();
  }

  deletCategory(){
    const decision = window.confirm(`Are you sure you want to remove category ${this.category.name}?`)
    if(decision){
      this.categoriesService.delete(this.category._id)
      .subscribe(
        respons => MaterialService.toast(respons.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }

  onFileUpload(event: any){
    //To get approach to uploaded file
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }


  onSubmit(){
    let obs$;
    this.form.disable(); //Turn off our form

    if(this.isNew) {
      //create method
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      //update method
      console.log(this.image)
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('The changes are saved');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }

}
