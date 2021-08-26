import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Note } from 'src/utilities/notesValidations';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private crudApi = environment.CRUD_API_URL;

  public async createNote(token: string, note: Note){
    const response = await axios.post(this.crudApi + '/create', { token, note})
    .catch(err => {
      return err.response;
    });
    console.log(response);
    console.log('A response was gotten with the status code ' + response.status);
    const status = response.status
    // check if the status is 200 or 201
    if(status === 200 || status === 201) {
      return { response, error: false }
    }
    return { response, error: true }
  }

  public async getNotes(token: string) {
    const response = await axios.post(this.crudApi + '/read', { token })
    
    .catch(err => {
      return err.response;
    });
    console.log(response);
    console.log('A response was gotten with the status code ' + response.status);
    const status = response.status
    // check if the status is 200 or 201
    if(status === 200 || status === 201) {
      return { response, error: false }
    }
    return { response, error: true }
  }

  public async deleteNote(token: string, note: any) {
    const response: any = await axios.delete(this.crudApi + '/delete', { data:{ token, note} })
    .catch(err => {
      return err.response;
    });
    console.log(response);
    console.log('A response was gotten with the status code ' + response.status);
    const status = response.status
    // check if the status is 200 or 201
    if(status === 200 || status === 201) {
      return { response, error: false }
    }
    return { response, error: true }
  }

  public async updateNote(token: string, note: any) {
    const response = await axios.put(this.crudApi + '/update', { token, note })
    .catch(err => {
      return err.response;
    });
    console.log(response);
    console.log('A response was gotten with the status code ' + response.status);
    const status = response.status
    // check if the status is 200 or 201
    if(status === 200 || status === 201) {
      return { response, error: false }
    }
    return { response, error: true }
  }

  public async deleteAllNotes(token: string) {
    const response = await axios.delete(this.crudApi + '/deleteAll', { data: {token} })
    .catch(err => {
      return err.response;
    });
    console.log(response);
    console.log('A response was gotten with the status code ' + response.status);
    const status = response.status
    // check if the status is 200 or 201
    if(status === 200 || status === 201) {
      return { response, error: false }
    }
    return { response, error: true }
  }
  constructor() {}
}
