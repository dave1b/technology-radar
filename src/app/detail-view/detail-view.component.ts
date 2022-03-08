import { Component, OnInit, Input } from '@angular/core';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  name: string = "";
  tech: Technology = {};
  constructor(private techDataService: TechDataService, private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.params.subscribe(
    (params: Params) => {
      this.name = params['name'];
      this.getTechnologyByName(this.name);
    }
    );
  }

  getTechnologyByName(name: string) :void {   
    this.techDataService.getByName(this.name).subscribe(data => {
     this.tech = data;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}