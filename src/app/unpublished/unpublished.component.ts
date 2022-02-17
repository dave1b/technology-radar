import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';

@Component({
  selector: 'app-unpublished',
  templateUrl: './unpublished.component.html',
  styleUrls: ['./unpublished.component.scss']
})
export class UnpublishedComponent implements OnInit {

  unpublished!: Technology[];

  constructor(private techDataService: TechDataService, private router: Router) { }



  ngOnInit(): void {
    this.techDataService.getAllUnpublished().subscribe(
      res => this.unpublished = res,
      err => {
        if(err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }




}
