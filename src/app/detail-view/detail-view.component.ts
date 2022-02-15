import { Component, OnInit, Input } from '@angular/core';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  name: string = "";
  tech: Technology = {};
  constructor(private techDataService: TechDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(
    (params: Params) => {
      this.name = params['name'];
      console.log(this.name);
      this.getTechnologyByName(this.name);
    }
    );
  }

  getTechnologyByName(name: string) :void {   
    this.techDataService.getByName(this.name).subscribe(data => {
     this.tech = data;
    });
  }

  

}
