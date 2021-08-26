import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import { AreAllFieldsValid, AreAllTheLoginFieldsValid, User, UserLogin } from 'src/utilities/userValidations';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'platform'
})
export class AuthService {
  public async registerUser(user: User): Promise<any> {
    /* The fields have t be validated beforehand, so the above line of code
     * should never be reached. However, it is here to avoid any errors.
     */
    if (!AreAllFieldsValid(user)) return;
    console.log('The user fields are correct, starting registration process...');

     // Make the request to the Auth API
     const response: AxiosResponse = await axios.post(environment.AUTH_API_URL + "/register", user)
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async loginUser(user: UserLogin): Promise<any> {
    /* The fields have to be validated beforehand, so the above line of code
     * should never be reached. However, it is here to avoid any errors.
     */
    if (!AreAllTheLoginFieldsValid(user)) return;
    console.log('The user fields are correct, starting login process...');

     // Make the request to the Auth API
     const response: AxiosResponse = await axios.post(environment.AUTH_API_URL + "/login", user)
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async verifyRefreshToken(refreshToken: string): Promise<any> {
    /* The fields have to be validated beforehand, so the above line of code
     * should never be reached. However, it is here to avoid any errors.
     */

     // Make the request to the Auth API
     const response: AxiosResponse = await axios.post((environment.AUTH_API_URL + "/isRefreshTokenValid"), {refreshToken})
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async getAccesToken(refreshToken: string): Promise<any> {

     // Make the request to the Auth API
     const response: AxiosResponse = await axios.post((environment.AUTH_API_URL + "/token"), {refreshToken})
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async getUserInfo(accessToken: string): Promise<any> {
     // Make the request to the Auth API
     const response: AxiosResponse = await axios.post((environment.AUTH_API_URL + "/decode"), {accessToken})
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async logoutUser(refreshToken: string): Promise<any> {
     // Make the request to the Auth API
     const response: AxiosResponse = await axios.delete((environment.AUTH_API_URL + "/logout"), {data: {refreshToken}})
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async logoutAllUser(email: string, password: string): Promise<any> {
     // Make the request to the Auth API
     const response: AxiosResponse = await axios.delete((environment.AUTH_API_URL + "/logoutAll"), {data: {email, password}})
     .catch(err => {
       return err.response;
     });

     console.log('A response was gotten with the status code ' + response.status);
     console.log(response);
     // Check if the request was successful (codes: 200, 201)
     if (response.status === 200 || response.status === 201) return { response, error: false };
     return { response, error: true };
  }

  public async editUserData( name: string, lastName: string, refreshToken: string): Promise<any> {
    // Make the request to the Auth API
    const response: AxiosResponse = await axios.put((environment.AUTH_API_URL + "/update"), {name, lastName, refreshToken})
    .catch(err => {
      return err.response;
    });

    console.log('A response was gotten with the status code ' + response.status);
    console.log(response);
    // Check if the request was successful (codes: 200, 201)
    if (response.status === 200 || response.status === 201) return { response, error: false };
    return { response, error: true };
  }

  public async editUserPassword(email: string, password: string, newPassword: string): Promise<any> {
    // Make the request to the Auth API
    const response: AxiosResponse = await axios.put((environment.AUTH_API_URL + "/changePassword"), {email, password, newPassword})
    .catch(err => {
      return err.response;
    });

    console.log('A response was gotten with the status code ' + response.status);
    console.log(response);
    // Check if the request was successful (codes: 200, 201)
    if (response.status === 200 || response.status === 201) return { response, error: false };
    return { response, error: true };
  }

  public async deleteAccount(email: string, password: string): Promise<any> {
    // Make the request to the Auth API
    const response: AxiosResponse = await axios.delete((environment.AUTH_API_URL + "/delete"), {data: {email, password}})
    .catch(err => {
      return err.response;
    });

    console.log('A response was gotten with the status code ' + response.status);
    console.log(response);
    // Check if the request was successful (codes: 200, 201)
    if (response.status === 200 || response.status === 201) return { response, error: false };
    return { response, error: true };
  }
}
