import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-notes-app-profile',
  templateUrl: './notes-app-profile.component.html',
  styleUrls: ['./notes-app-profile.component.css']
})
export class NotesAppProfileComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { 
    this.canTheUserProceed();
  }
  public isSomethingInProgress = () => this.isUserDeletionInProgress ||
  this.isUserPasswordEditingInProgress ||
  this.isUserEditingInProgress ||
  this.isLogoutAllInProgress ||
  this.isLogoutInProgress ||
  this.isTokenValidationInProgress;
  
  public name:string = "";
  public lastName: string = "";
  public newPassword: string = "";
  public password: string = '';
  public isUserDeletionInProgress: boolean = false;
  public isUserPasswordEditingInProgress = false;
  public isUserEditingInProgress = false;
  public isLogoutAllInProgress = false;
  public isLogoutInProgress = false;
  public isTokenValidationInProgress: boolean = false;
  public user  = {
    name: '',
    email: '',
    lastName: ''
  };

  public displayEditData = false;
  public displayChangePassword = false;
  public displayDeleteAccount: boolean = false;

  public addAnError(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ha ocurrido un error',
      detail: error,
    });
    return false;
  }

  public getToken(): string {
    return (
      sessionStorage.getItem('RefreshToken') ||
      localStorage.getItem('RefreshToken') ||
      ''
    );
  }

  public async isTokenValid(token: string): Promise<boolean> {
    if (token == undefined) return false;
    const isTokenValid = await this.authService.verifyRefreshToken(token);
    if (isTokenValid.response.data === true) return true;
    return false;
  }

  public isUserLoggedIn(): boolean {
    const token: string =
      sessionStorage.getItem('RefreshToken') ||
      localStorage.getItem('RefreshToken') ||
      '';
    return token != undefined;
  }

  public deleteTokens(): void{
    if (localStorage.getItem('RefreshToken')) localStorage.removeItem('RefreshToken');
    if (sessionStorage.getItem('RefreshToken')) sessionStorage.removeItem('RefreshToken');
  }

  public async canTheUserProceed() {
    this.isTokenValidationInProgress = true;
    if (!this.isUserLoggedIn()) this.router.navigate(['/login']);

    const token: string = this.getToken();
    const isTokenValid: boolean = await this.isTokenValid(token);
    if ( !isTokenValid ) {
      this.deleteTokens();
      this.router.navigate(['/login']);
    }
    const accessTokenResponse: any = await this.authService.getAccesToken(token);
    if (accessTokenResponse.error) this.addAnError("Algo ha salido mal, comprueba la conexción a internet");

    const accesToken = accessTokenResponse.response.data.accessToken;
    const userDataResponse: any = await this.authService.getUserInfo(accesToken);
    if (userDataResponse.error) this.addAnError("Algo ha salido mal, comprueba la conexión a internet");
    const userData = userDataResponse.response.data;
    this.user = userData;
    console.log(userData);
    
    this.isTokenValidationInProgress = false;
  }

  public async logout() {
    this.isLogoutInProgress = true;
    const refreshToken: string = this.getToken();
    await this.authService.logoutUser(refreshToken);
    this.deleteTokens();
    this.canTheUserProceed();
    this.isLogoutInProgress = false;
  }

  public displayLogoutAll: boolean = false;
  public displayEditPassword: boolean = false;

  public async logoutAll() {
    this.isLogoutAllInProgress = true;
    const response = await this.authService.logoutAllUser(this.user.email, this.password);
    console.log(response);
    
    if (response.error) {
      this.addAnError("Algo ha salido mal, comprueba la conexión a internet y la contraseña");
      this.isLogoutAllInProgress = false;
      return;
    }
    this.deleteTokens();
    this.canTheUserProceed();
    return
  }

  public async editUserData() {
    this.isUserPasswordEditingInProgress = true;
    const response = await this.authService.editUserData(this.name, this.lastName, this.getToken());
    if (response.error) {
      this.addAnError("Algo ha salido mal, comprueba la conexión a internet");
      this.isUserPasswordEditingInProgress = false;
      return;
    }
    this.displayEditData = false;
    this.isUserPasswordEditingInProgress = false;
    this.canTheUserProceed();
  }

  public async changeUserPassword() {
    this.isUserPasswordEditingInProgress = true;
    const response = await this.authService.editUserPassword(this.user.email, this.password, this.newPassword);
    if (response.error) {
      this.addAnError("Algo ha salido mal, comprueba la conexión a internet y tu contraseña");
      this.isUserPasswordEditingInProgress = false;
      return;
    }
    this.displayChangePassword = false;
    this.isUserPasswordEditingInProgress = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Contraseña cambiada',
      detail: 'La contraseña se ha cambiado correctamente',
    });
  }

  public async deleteAcount() {
    this.isUserDeletionInProgress = true;
    const response = await this.authService.deleteAccount(this.user.email, this.password);
    if (response.error) {
      this.addAnError("Algo ha salido mal, comprueba la conexión a internet y tu contraseña");
      this.isUserDeletionInProgress = false;
      return;
    }
    this.deleteTokens();
    this.canTheUserProceed();
  }
  ngOnInit(): void {
  }

}
