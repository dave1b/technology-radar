import { Component, OnInit, Input } from '@angular/core';
import { Router } from 'express';
import { empty, isEmpty } from 'rxjs';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';


@Component({
  selector: 'app-technology-panel',
  templateUrl: './technology-panel.component.html',
  styleUrls: ['./technology-panel.component.scss']
})
export class TechnologyPanelComponent implements OnInit {

  @Input() category: string = "";
  arrayOfTechnology?: Array<Technology>;
 


  constructor(private techDataService: TechDataService) {

  }

  ngOnInit(): void {
    this.techDataService.getAllByCategory(this.category).subscribe(data => {
      this.arrayOfTechnology = data;
    });
  }

  getAllTechnologyByStatus(status: string): Array<Technology> {
    var techArray: Array<Technology> = [];
    if(!(typeof(this.arrayOfTechnology) == "undefined")){

      for (var technology of this.arrayOfTechnology!) {
        if (technology.status == status) {
          techArray.push(technology);
        }
      }
    }
    return techArray;
  }
}