import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { TechDataService } from '../tech-data.service';
import { Technology } from '../technology';


@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private techDataService: TechDataService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      statusDescription: ['',],
      author: ['', Validators.required],
      created: [''],
    });
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;

    // stop here if form is invalid
    console.log('Valid?', form.valid); // true or false
    if (this.myForm!.invalid) {
        return;
    }
    console.log('Name', form.value.name);
    console.log('Category', form.value.category);
    console.log('Status', form.value.status);
    console.log('description', form.value.description); 
    console.log('statusDescription', form.value.statusDescription); 
    console.log('author', form.value.author); 
    console.log('created', form.value.created); 
    var newObject: Technology = {
    name: form.value.name,
    category: form.value.category,
    status: form.value.status,
    description: form.value.description,
    statusDescription: form.value.statusDescription,
    author: form.value.author,
    created: (new Date()).toString(),
    }
    this.techDataService.addNewTechnology(newObject);
}

}
