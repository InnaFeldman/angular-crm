import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { PositionsService } from 'src/app/services/positions.service';
import {Position} from '../../../interfaces/interfaces'

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$!: Observable<Position[]>

  constructor(private route: ActivatedRoute, private positionsService: PositionsService) { }

  ngOnInit(): void {
   this.positions$ = this.route.params
   .pipe(
     switchMap((params: Params) => {
      return this.positionsService.fetch(params['id']);
     })
   )
  }

  addToOrder(position: Position){
    console.log(position)
  }

}
