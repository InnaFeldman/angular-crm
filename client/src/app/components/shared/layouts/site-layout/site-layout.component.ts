import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floating') floatingRef!: ElementRef

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Range'}
  ]

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){//When DOM is ready, when everything is loaded
    MaterialService.initializeFloatingBtn(this.floatingRef)
  }

  logout(event: Event){
    event.preventDefault();
    //Clear session from token
    this.auth.logout();

    //Redirect to login page
    this.router.navigate(['/login']);
  }

}
