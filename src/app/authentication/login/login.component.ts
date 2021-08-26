import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AreTheLoginFieldsValid, UserLogin, UserLoginValidation } from 'src/utilities/userValidations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
    ) {
      this.redirectToAppIfAlreadyLoggedIn();
    }
    rememberMe: boolean = true;

    public loginInProgress = false;

    public userToLogin: UserLogin = {
      email: "",
      password: ""
    }

    public userLoginValidness: UserLoginValidation = {
      email: true,
      password: true,
      valid: true
    }

    public addAMessage:any = (message: any) => {
      this.messageService.add(message);
    }

    public diagnoseAndShowError(error: string) {
      let explanation: string = "Ha ocurrido un error desconocido, intentalo en unos minutos";
      if (error.indexOf('is not registred') !== -1 ) explanation = 'El correo no está registrado, registrate para poder iniciar sesión.';
      if (error === "The password is not correct" ) explanation = 'La contraseña no es correcta.';
      this.addAMessage({ severity: 'error', summary: 'Error!', detail: explanation });
    }
    
    private hasTheUserLoggedIn() {
      const userLoginToken = localStorage.getItem('RefreshToken') || sessionStorage.getItem('RefreshToken');
      if (userLoginToken !== null) return true;
      return false; 
    }

    private saveRefreshToken(refreshToken: string, shouldRemember: boolean) {
      // if the user should be remembered, save the refresh token in the local storage
      if (shouldRemember) return localStorage.setItem('RefreshToken', refreshToken);

      // if the user should not be remembered, save the refresh token in the session storage
      sessionStorage.setItem('RefreshToken', refreshToken);
    }
    private deleteRefreshToken() {
      localStorage.removeItem('RefreshToken');
      console.log("Item deleted from localstr");
      console.log(localStorage.getItem('RefreshToken'));
      
      sessionStorage.removeItem('RefreshToken');
      console.log("Item deleted from sessionstr");
      console.log(sessionStorage.getItem('RefreshToken'));
    }

    private async isLoginTokenValid() {
      if (!(this.hasTheUserLoggedIn())) return false;
      // TODO: Check if token is valid with the new route useing the service
      const refreshToken: string | any = localStorage.getItem('RefreshToken') || sessionStorage.getItem('RefreshToken');
      const isTokenValid = await this.authService.verifyRefreshToken(refreshToken);
      console.log(isTokenValid);
      
      if (isTokenValid.error === true) return false;
      if (isTokenValid.response.data) return true;
      return false;
    }

    private async redirectToAppIfAlreadyLoggedIn() {
      // if there is no refresh token don't redirect
      if (!(this.hasTheUserLoggedIn())) return;

      // if there is a refresh token check if the token is valid, if it is not, delete it from the local and session storage
      //if (!( await this.isLoginTokenValid())) return this.deleteRefreshToken();

      // if the token is valid, redirect to the app
      this.router.navigate(['/app']);
    }

    private updateUserLoginValidness() {
      this.userLoginValidness = AreTheLoginFieldsValid(this.userToLogin);
      console.log(this.userLoginValidness);
    }

    private checkIfUserLoginFieldsAreValid() {
      // Update the user validness information
      this.updateUserLoginValidness();
  
      // Check if the user is valid
      return this.userLoginValidness.valid;
    }

    private canTheUserBeLoggedIn() {
      // Check if a login is already in progress
      if (this.loginInProgress) return false;
  
      // Check if the user fields are valid
      const areFieldsValid: boolean = this.checkIfUserLoginFieldsAreValid();
      // Check if the user is alredy logged in
      if ( this.hasTheUserLoggedIn() ) return false
      return areFieldsValid;
    }

    public async loginUser(): Promise<any> {
      // Check if the user can be registred
      if (!this.canTheUserBeLoggedIn()) return this.addAMessage({ severity: 'error', summary: 'Campos Inválidos!',
                                                                    detail: 'El email y/o la contraseña son inválido.' });
  
      // Login the user
      this.loginInProgress = true;
      const request = await this.authService.loginUser(this.userToLogin);
      
      // Feedback the user
      if (request.error === true) this.diagnoseAndShowError(request.response.data);
      else {
      // Save the refresh token
      this.saveRefreshToken(request.response.data.refreshToken, this.rememberMe);
      
      // Redirect to the app
      this.router.navigate(['/app']);
      }
  
      // Marck that a user registration is not in progress
      this.loginInProgress = false;
    }

    ngOnInit() {
      // Allow the Ripple effect
        this.primengConfig.ripple = true;
    }

}
