import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Login } from '../../dto/login';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: Login = new Login('', '', '', '');
  errorMessage: string = '';

  @Output() close = new EventEmitter<void>();

  constructor(private loginService: LoginService) {}

  userLogin(): void {
    this.loginService.loginUser(this.login).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert('Login Successful!');
        this.close.emit(); // Close modal on success
      },
      (error) => {
        this.errorMessage = 'Invalid credentials!';
        console.error('Login error:', error);
      }
    );
  }

  closeForm() {
    this.close.emit();
  }
}
