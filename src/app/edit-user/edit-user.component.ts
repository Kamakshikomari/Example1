import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  user: User;
  editForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,private router: Router, 
    private userService: UserService) { }
  
  ngOnInit() {
    if(localStorage.getItem("username")!=null){
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      score: ['', Validators.required]
    });

    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
    }
    else
        this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    if(this.editForm.invalid){
      alert('invalid editform');
      return;
    }
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert('error: '+error.url);
        });
  }

   // logOff user
   logOutUser():void{
    if(localStorage.getItem("studentId")!=null){
      localStorage.removeItem("studentId");
      this.router.navigate(['/login']);
    }
}

}
