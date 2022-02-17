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
        console.log(this.name);
        this.getTechnologyByName(this.name);
        console.log(this.name);
      }
    );

    this.editTechForm = this.formBuilder.group({
      name: [, [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      statusDescription: ['',],
      author: ['', [Validators.required, Validators.minLength(3)]],
      created: [''],
      published: [''],
    });
  }

  getCurrentPage(){
    console.log(this.name);
  }

  getTechnologyByName(name: string): void {
    this.techDataService.getByName(this.name).subscribe(data => {
      this.tech = data;
      this.editTechForm.get('name')?.setValue(this.tech.name);
      this.editTechForm.get('category')?.setValue(this.tech.category);
      this.editTechForm.get('status')?.setValue(this.tech.status);
      this.editTechForm.get('description')?.setValue(this.tech.description);
      this.editTechForm.get('statusDescription')?.setValue(this.tech.statusDescription);
      this.editTechForm.get('author')?.setValue(this.tech.author);
      this.editTechForm.get('published')?.setValue(this.tech.published);
    });
  }

  onSubmit() {

    console.log('Valid?', this.editTechForm.valid);
    if (this.editTechForm!.invalid) {
      return;
    }

    this.submitted = true;
    var published = this.editTechForm.value.published === true ? true : false;
    console.log('Published', published);
    var date = new Date();
    var dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var newHistory: Change[] = [];

    if (!(typeof this.tech.history == 'undefined')) {
      console.log("is not undefined")
      console.log(this.tech.history)
      newHistory = this.tech.history!;
      newHistory.push({
        author: this.tech.author!,
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

    console.log(newObject);
    this.techDataService.editTechnology(newObject)
    this.router.navigate(['']);
  }
  get getControl() {
    return this.editTechForm.controls;
  }

}
