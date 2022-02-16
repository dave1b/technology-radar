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


  constructor(private formBuilder: FormBuilder, private techDataService: TechDataService, private router: Router) { }

  ngOnInit(): void {
    this.adTechForm = this.formBuilder.group({
      
      name: ['', Validators.required, Validators.minLength(6)],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      statusDescription: ['',],
      author: ['', Validators.required],
      created: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    console.log('Valid?', this.adTechForm.valid); // true or false
    if (this.adTechForm!.invalid) {
        return;
    }
    /*
    console.log('Name', form.value.name);
    console.log('Category', form.value.category);
    console.log('Status', form.value.status);
    console.log('description', form.value.description); 
    console.log('statusDescription', form.value.statusDescription); 
    console.log('author', form.value.author); 
    console.log('created', form.value.created); 
    */
    var date =  new Date();
    var dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var newObject: Technology = {
    name: this.adTechForm.value.name,
    category: this.adTechForm.value.category,
    status: this.adTechForm.value.status,
    description: this.adTechForm.value.description,
    statusDescription: this.adTechForm.value.statusDescription,
    author: this.adTechForm.value.author,
    created: dateTimeStamp,
    }
    //console.log(newObject);
    this.techDataService.addNewTechnology(newObject);
    this.router.navigate(['']);
}

get getControl() {
  return this.adTechForm.controls;
}

}
