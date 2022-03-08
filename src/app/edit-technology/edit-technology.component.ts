import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { TechDataService } from '../tech-data.service';
import { Technology, Change } from '../technology';

@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.scss']
})
export class EditTechnologyComponent implements OnInit {

  name: string = "";
  tech: Technology = {};

  editTechForm!: FormGroup;
  submitted = false;
  categories: string[] = ['Techniques', 'Tools', 'Platforms', 'Languages & Frameworks'];
  statuses: string[] = ['Assess', 'Trial', 'Adopt', 'Hold'];


  constructor(private techDataService: TechDataService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.name = params['name'];
        this.getTechnologyByName(this.name);
      }
    );

    this.editTechForm = this.formBuilder.group({
      name: [, [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      statusDescription: [],
      author: ['', [Validators.required, Validators.minLength(3)]],
      created: [''],
      published: [''],
    });
  }



  getTechnologyByName(name: string): void {
    this.techDataService.getByName(this.name).subscribe({
      next: (data) => {
        this.tech = data;
        this.editTechForm.get('name')?.setValue(this.tech.name);
        this.editTechForm.get('category')?.setValue(this.tech.category);
        this.editTechForm.get('status')?.setValue(this.tech.status);
        this.editTechForm.get('description')?.setValue(this.tech.description);
        this.editTechForm.get('statusDescription')?.setValue(this.tech.statusDescription);
        this.editTechForm.get('author')?.setValue(this.tech.author);
        this.editTechForm.get('published')?.setValue(this.tech.published);
      },
      error: (e) => {
        if (e instanceof HttpErrorResponse && e.status === 401) {
          this.router.navigate(['login']);
        }
      }

    });
  }

  onSubmit() {
    this.statusChangeCheck();
    if (this.editTechForm!.invalid) {
      return;
    }
    this.submitted = true;
    var published = this.editTechForm.value.published === true ? true : false;
    var date = new Date();
    var dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var newHistory: Change[] = [];

    if (!(typeof this.tech.history == 'undefined')) {
      newHistory = this.tech.history!;
      newHistory.push({
        author: this.editTechForm.value.author,
        created: dateTimeStamp,
      })
    } else {
      newHistory = [{
        author: this.tech.author!,
        created: dateTimeStamp,
      }];
    }

    var newObject: Technology = {
      name: this.editTechForm.value.name,
      category: this.editTechForm.value.category,
      status: this.editTechForm.value.status,
      description: this.editTechForm.value.description,
      statusDescription: this.editTechForm.value.statusDescription,
      author: this.editTechForm.value.author,
      created: this.tech.created,
      published: published,
      history: newHistory,
    }
    this.techDataService.editTechnology(newObject, this.tech.name!)
    this.router.navigate(['']);
  }
  get getControl() {
    return this.editTechForm.controls;
  }

  statusChangeCheck(): boolean {
    if (!(this.tech.status! == this.editTechForm.value.status)) {
      this.getControl["statusDescription"].setValidators(Validators.required);
      this.getControl['statusDescription'].updateValueAndValidity()
    }
    return (this.tech.status! == this.editTechForm.value.status);
  }
}
