import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef;
  isRoot!: boolean;
  modal!: MaterialInstance

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {//Updating listening
      if(event instanceof NavigationEnd){
        this.isRoot = this.router.url === '/order';
      }
    })
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(){
    this.modal.destroy();
  }

  open(){
    this.modal.open();
  }

  cancel(){
    this.modal.close();
  }

  submit(){
    this.modal.close();
  }

}
