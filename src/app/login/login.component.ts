import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      pwd: ['', Validators.required],
  
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onSubmit() {

    // stop here if form is invalid
    //console.log('Valid?', this.loginForm.valid); // true or false
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    var email = this.loginForm.value.email;
    var pwd = this.loginForm.value.pwd;
    this.authService.loginUser({email: email, pwd: pwd}).subscribe(
      res => {
        localStorage.setItem('token',res.token)
        console.log(res)
      },
      err => {
        console.log(err)
      }
      
    )
    /*
    console.log('Name', this.adTechForm.value.name);
    console.log('Category', this.adTechForm.value.category);
    console.log('Status', this.adTechForm.value.status);
    console.log('description', fothis.adTechFormrm.value.description); 
    console.log('statusDescription', this.adTechForm.value.statusDescription); 
    console.log('author', this.adTechForm.value.author); 
    console.log('created', this.adTechForm.value.created); 
    */
    //this.techDataService.addNewTechnology(newObject);
    //this.router.navigate(['']);
  }

  get getControl() {
    return this.loginForm!.controls;
  }

}
