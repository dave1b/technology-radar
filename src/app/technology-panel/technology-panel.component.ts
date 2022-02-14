import { Component, OnInit, Input } from '@angular/core';
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
  assessArray?: Array<Technology>;
  trialArray?: Array<Technology>;
  adoptArray?: Array<Technology>;
  holdArray?: Array<Technology>;
  

  constructor(private techDataService: TechDataService) { 

  }
  
  
  ngOnInit(): void {
    console.log("init")
    this.techDataService.getAllByCategory(this.category).subscribe( data => {
      this.arrayOfTechnology = data;
      console.log(data);
      console.log("hello " +this.arrayOfTechnology);
    
    });
  }

  getAllTechnologyByStatus(status: string) :Array<Technology>{
    if(!typeof(this.arrayOfTechnology)) {
      var techArray: Array<Technology> = [];
      for(var technology of this.arrayOfTechnology!){
        if(technology.status == status){
          techArray.push(technology);
        }
      }
      return techArray;
    } else {
      return [{  name: "empty"}];
    }
  }


}
