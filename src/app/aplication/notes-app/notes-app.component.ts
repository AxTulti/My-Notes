import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { Note } from 'src/utilities/notesValidations';

@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css'],
})
export class NotesAppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router,
    private notesService: NotesService,
    private messageService: MessageService
  ) {
    this.canTheUserProceed();
    //this.setTouchMode();
    this.refreshNotes();
  }
  public showCreateDialog: boolean = false;
  public showEditDialog: boolean = false;
  public showSearchDialog: boolean = false;
  public setTouchMode() {
    if (localStorage.getItem('touchMode')) return;
    if ("ontouchstart" in document.documentElement) return localStorage.setItem('touchMode', 'true');
    localStorage.setItem('touchMode', 'false');
  }

  public isTouchModeOn() {
    return localStorage.getItem('touchMode') === 'true';
  }
  public selectedNotesIds = [];

  public addAMessage:any = (message: any) => {
    this.messageService.add(message);
  }

  public addAnError(error: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ha ocurrido un error',
      detail: error,
    });
  }
  public newNote: Note = {
    title: '',
    subtitle: '',
    content: '',
    tags: []
  }
  public canDelete = () => this.selectedNotesIds.length >= 1;
  public canEdit = () => this.selectedNotesIds.length === 1;
  public canSearch = () => this.allNotes.length >= 1;
  public textToSearch: string = '';
  public allNotes: Note[] = [];
  public visibleNotes: Note[] = [];
  public getAllNotes(): Note[] {
    return this.allNotes;
  }
  public getFirstSelectedNote = () => {
    console.log(this.allNotes.filter(note => note._id === this.selectedNotesIds[0])[0]);
    
    return this.allNotes.filter(note => note._id === this.selectedNotesIds[0])[0];
  }

  public updateNote: Note = {
    title: this.getFirstSelectedNote()?.title || '',
    subtitle: this.getFirstSelectedNote()?.subtitle || '',
    content: this.getFirstSelectedNote()?.content || '',
    tags: this.getFirstSelectedNote()?.tags || []
  }

  updateUpdatedNote() {
    this.updateNote = {
      title: this.getFirstSelectedNote()?.title || '',
      subtitle: this.getFirstSelectedNote()?.subtitle || '',
      content: this.getFirstSelectedNote()?.content || '',
      tags: this.getFirstSelectedNote()?.tags || []
    }
    return true;
  }

  public noteToShow: Note = {
    title: '',
    subtitle: '',
    content: '',
    tags: []
  }
  public showDialog(number: number) {
    this.visibilityArray[number] = true;
  }

  public shouldShowDialog: boolean = false;
  public visibilityArray = Array(this.visibleNotes.length).map(() => false);


  public async deleteNotes(){
    const tokenRes: any = await this.authService.getAccesToken( this.getToken() );
    const token: string = tokenRes.response.data.accessToken;
    this.isDeletionInProgress = true;
    for ( const id of this.selectedNotesIds ) {
      await this.notesService.deleteNote(token, {id});
    }
    this.isDeletionInProgress = false;
    this.refreshNotes();
    this.selectedNotesIds = [];
  }
  public showError(message: string) {
    this.addAnError(message);
  }
  public searchNotes(textToSearch: string) {
    this.visibleNotes = this.allNotes.filter(note => note.title.toLowerCase().includes(textToSearch.toLowerCase()));
    this.visibilityArray = Array(this.visibleNotes.length).map(() => false);
  }
  public async refreshNotes() {
    this.visibleNotes = [];
    this.visibilityArray = Array(this.visibleNotes.length).map(() => false);
    this.isRefreshInProgress = true;
    this.falseNotes = Array(this.numberOfCols())
    const tokenRes: any = await this.authService.getAccesToken( this.getToken() );
    const token: string = tokenRes.response.data.accessToken;
    const response: any = await this.notesService.getNotes( token );
    if (response.error) this.showError("Algo salió mal, intentalo de nuevo más tarde o vuelve a iniciar sesión")
    else this.allNotes = response.response.data;
    this.isRefreshInProgress = false;

    if (this.textToSearch === '') this.visibleNotes = this.allNotes;
    else this.searchNotes(this.textToSearch);
    this.visibilityArray = Array(this.visibleNotes.length).map(() => false);
  }

  public async createNote() {
    if ( this.newNote.title == '' ) return this.addAnError('Debe ingresar un título');
    const tagToSend: string[] | any = this.newNote.tags!.length === 0 ? undefined : this.newNote.tags;
    this.isCreationInProgress = true;
    const refreshToken: string = this.getToken();
    const tokenRequest: any = await this.authService.getAccesToken(refreshToken);
    const token = tokenRequest.response.data.accessToken;
    console.log(token);
    
    const request: any = await this.notesService.createNote(token, {
      title: this.newNote.title,
      subtitle: this.newNote.subtitle || undefined,
      content: this.newNote.content || undefined,
      tags: tagToSend
    });
    console.log(tagToSend);
    

    if (request.error) {
      this.addAnError("Algo ha salido mal");
    }
    this.isCreationInProgress = false;
    this.refreshNotes();
  }

  public async updateNotes() {
    if (this.updateNote.title == '') return this.addAnError('Debe ingresar un título');
    const tagToSend: string[] | any = this.updateNote.tags!.length === 0 ? undefined : this.updateNote.tags;
    this.isEditionInProgress = true;
    const refreshToken: string = this.getToken();
    const tokenRequest: any = await this.authService.getAccesToken(refreshToken);
    const token: string = tokenRequest.response.data.accessToken;
    const request: any = await this.notesService.updateNote(token, {
      id: this.selectedNotesIds[0],
      title: this.updateNote.title,
      subtitle: this.updateNote.subtitle || undefined,
      content: this.updateNote.content || undefined,
      tags: tagToSend
    });
    if (request.error) this.addAnError("Algo ha salido mal");
    this.isEditionInProgress = false;
    this.refreshNotes();
  }
  public getWidth = () => window.innerWidth;
  public getTextAreaCols = () =>  {
    const width = this.getWidth();
    if (width > 1200) return 80;
    if (width > 1000) return 65;
    if (width > 850) return 60;
    if (width > 800) return 50;
    if (width > 700) return 45;
    if (width > 450) return 35;
    if (width > 330) return 30;
    if (width > 290) return 10;
    if (width > 280) return 5;
    return 5;
  }
  public isUpdateTitleValid = () => this.updateNote.title !== '';
  
  public allNotesTitles(): string[] {
    return this.allNotes.map(note => note.title);
  }
  public isTitleValid = () => {
    return this.newNote.title.length > 0;
  }
  public numberOfCols = () => {
    const width = this.getWidth();
    
    const columnsWidth = width * this.getPersentageOfColumns();
    return Math.floor(columnsWidth / 350);
  }
  
  public getPersentageOfColumns = () => {
    const width = this.getWidth();
    
    if (width <= 620) return .99;
    if (width <= 714) return .9;
    if (width > 714) return .8;
    return 0;
  }
  public falseNotes = Array(this.numberOfCols());
  public isCreationInProgress: boolean = false;
  public isRefreshInProgress: boolean = false;
  public isDeletionInProgress: boolean = false;
  public isEditionInProgress: boolean = false;
  public isSomethingInProgress = () => {
    return this.isCreationInProgress || this.isRefreshInProgress || this.isDeletionInProgress || this.isEditionInProgress;
  }
  public isTokenValidationInProgress = false;
  public search(event: any) {
    console.log('Searching for: ' + event.query);
    this.searchNotes(this.textToSearch);
  }
  public async testStartNotes(): Promise<void> {
    const token: string = this.getToken();
    const accestokenResponse = await this.authService.getAccesToken(token);
    const accesToken: string = accestokenResponse.response.data.accessToken;
    console.log(accesToken);
    
    const note = await this.notesService.createNote(accesToken, {
      title: 'Test Note',
      subtitle: 'Test Subtitle',
      content: 'This is a test note'
    });
    await this.notesService.getNotes(accesToken);
    console.table(note.response.data._id);
    
    await this.notesService.updateNote(accesToken, { title: 'Test Note Updated', content: 'This is a test note updated', id: note.response.data._id} );
    //await this.notesService.deleteNote(accesToken, {id: note.response.data._id});
    //await this.notesService.deleteAllNotes(accesToken);
  }

  public isUserLoggedIn(): boolean {
    const token: string =
      sessionStorage.getItem('RefreshToken') ||
      localStorage.getItem('RefreshToken') ||
      '';
    return token != undefined;
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
    this.isTokenValidationInProgress = false;
  }

  ngOnInit() {
    // Allow the Ripple effect
    this.primengConfig.ripple = true;
  }
}
