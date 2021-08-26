import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AreTheFieldsValid, User, UserValidation } from 'src/utilities/userValidations';
import { AuthService } from '../services/auth.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private primengConfig: PrimeNGConfig,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {}

    ngOnInit() {
      // Allow the Ripple effect
        this.primengConfig.ripple = true;
    }
  public registrationInProgress = false;
  public diagnoseAndShowError(error: string) {
    let explanation: string = "Ha ocurrido un error desconocido, intentalo en unos minutos";
    if (error === 'The email is already registred') explanation = 'Un usuario con ese email ya ha sido registrado, si eres tu, inicia sesión.';
    this.addAMessage({ severity: 'error', summary: 'Error!', detail: explanation });
  }
  public addAMessage:any = (message: any) => {
    this.messageService.add(message);
  }
  public userToRegister: User = {
    name: "",
    lastName: "",
    password: "",
    email: ""
  }

  public userValidness: UserValidation = {
    name: true,
    lastName: true,
    email: true,
    password: true,
    valid: true
  }

  private updateUserValidness() {
    this.userValidness = AreTheFieldsValid(this.userToRegister);
    console.log(this.userValidness);
  }

  private checkIfUserFieldsAreValid() {
    // Update the user validness information
    this.updateUserValidness();

    // Check if the user is valid
    return this.userValidness.valid;
  }

  private canTheUserBeRegistred() {
    // Check if a registration is already in progress
    if (this.registrationInProgress) return false;

    // Check if the user fields are valid
    const areFieldsValid: boolean = this.checkIfUserFieldsAreValid();
    return areFieldsValid;
  }

  public async registerUser(): Promise<any> {
    // Check if the user can be registred
    if (!this.canTheUserBeRegistred()) return this.addAMessage({ severity: 'error', summary: 'Campos Inválidos!',
                                                                  detail: '1 o más campos son inválidos, por favor, corrobóralos.' });

    // Register the user
    this.registrationInProgress = true;
    const request = await this.authService.registerUser(this.userToRegister);
    
    // Feedback the user
    if (request.error === true) this.diagnoseAndShowError(request.response.data);

    //else this.router.navigate(['/login']);
    else {
      this.addAMessage({ severity: 'success', summary: 'Registro Exitoso!', detail: 'Gracias por registrarte!', life: 5000 });
      this.addAMessage({ severity: 'info', summary: '¡Bienvenido!', detail: 'Por favor, inicie sesión para comenzar a usar la aplicación.', life: 6000 });
    };


    // Marck that a user registration is not in progress
    this.registrationInProgress = false;
  }

}
