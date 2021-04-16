import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/components/shared/classes/material.service';
import { Position } from 'src/app/interfaces/interfaces';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId!: string;
  @ViewChild('modal') modalRef!: ElementRef;
  positions: Position[] = [];
  loading = false;
  modal!: MaterialInstance;
  form!: FormGroup;
  positionId: any = null;

  constructor(private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })
    this.loading = true;

    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions ///put positions that came from server
      this.loading = false;
    })
  }

  get getControl(){
    return this.form.controls;
  }

  ngOnDestroy(){
    this.modal.destroy();
  }

  ngAfterViewInit(){//when content is uploaded
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onAddPosition(){
    this.positionId = null;

    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onSelectPosition(position: Position){
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onDeletePosition(position: Position){
    const decision = window.confirm(`Are you sure yu want delete ${position.name} ?`);
    if(decision) {
      this.positionsService.delete(position).subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);
          MaterialService.toast(response.message);
        },)
        error => MaterialService.toast(error.error.message)
    }
  }

  onCancel(){
    this.modal.close();
  }

  onSubmit(){
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const complited = () => {
      this.modal.close();
      this.form.reset({name: '', cost: 1}); //clear form after saving
      this.form.enable();
    }

    if(this.positionId) {///If position exists -> update it
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(position => {
        const index = this.positions.findIndex(p => p._id === position._id );
        this.positions[index] = position;
        MaterialService.toast('Position has been updated');
      },
        error => MaterialService.toast(error.error.message),
        () => {
          complited();
        }
      )
    }else{// If position not exists -> create it
      this.positionsService.create(newPosition).subscribe(position => {
        MaterialService.toast('Position has been created');
        this.positions.push(position);
      },
        error => MaterialService.toast(error.error.message),
        () => {
          complited();
        }
      )
    }

  }


}
