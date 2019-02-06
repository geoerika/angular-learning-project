import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.formData).subscribe(
       () => {
         this.router.navigate(['login', {registered: 'success'}]);  //registered:success appears in the browser navigation line
       },
       (errorResponse) => {
          this.errors = errorResponse.error.errors; //error.errors seen with the debugger
          // debugger;
          // console.log(errorResponse);
       }
      )
    // console.log(this.formData);
  }
}
