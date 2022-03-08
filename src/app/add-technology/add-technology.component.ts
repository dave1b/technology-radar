import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {
  adTechForm!: FormGroup;
  submitted = false;
  categories: string[] = ['Techniques', 'Tools', 'Platforms', 'Languages & Frameworks'];
  statuses: string[] = ['Assess', 'Trial', 'Adopt', 'Hold'];
  
  constructor(private formBuilder: FormBuilder, private techDataService: TechDataService, private router: Router) { }

  ngOnInit(): void {
    this.techDataService.getAllUnpublished().subscribe(
      res => {},
      err => {
        if(err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
    this.adTechForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      statusDescription: ['',],
      author: ['', [Validators.required, Validators.minLength(3)]],
      created: [''],
      published: [''],
    });
  }

  onSubmit() {
    if (this.adTechForm!.invalid) {
      return;
    }

    this.submitted = true;
    var published = this.adTechForm.value.published === true ? true : false;
    var date = new Date();
    var dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var newObject: Technology = {
      name: this.adTechForm.value.name,
      category: this.adTechForm.value.category,
      status: this.adTechForm.value.status,
      description: this.adTechForm.value.description,
      statusDescription: this.adTechForm.value.statusDescription,
      author: this.adTechForm.value.author,
      created: dateTimeStamp,
      published: published
    }
    this.techDataService.addNewTechnology(newObject)
    this.router.navigate(['']);
  }
  get getControl() {
    return this.adTechForm.controls;
  }
}