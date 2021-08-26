import { Component, Input, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

const getCurrentScrollY: () => number = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

function hasUserScrolledTop( previousScrollY: number, currentScrollY: number ): boolean | null {
  /*
   * This function recives two numbers, previousScrollY and currentScrollY.
   * It compares them and returns the direction of the scroll.
   * If the previousScrollY is greater than the currentScrollY (the user scrolled to the top), it returns true.
   * if the previousScrollY is less than the currentScrollY (the user scrolled to the bottom), it returns false.
   * if the previousScrollY is equal to the currentScrollY, it returns false (because user hasn't scrolled up).
  */
  if ( previousScrollY > currentScrollY ) return true;
  if ( previousScrollY < currentScrollY ) return false;
  return null;
}

@Component({
  selector: 'app-notes-header',
  templateUrl: './notes-header.component.html',
  styleUrls: ['./notes-header.component.css']
})
export class NotesHeaderComponent implements OnInit {
  public showHeader: boolean = true;
  @Input() public headerTitle: string = '';
  public showSidebar: boolean = false;

  public lastScrollY: number = getCurrentScrollY();
  public currentScrollY: number = getCurrentScrollY();


  public toogleHeader: (shouldShow: boolean | null) => void = (shouldShow: boolean | null) => {
    if ( shouldShow === null ) return;
    this.showHeader = shouldShow;
  }

  public updateScrolls: (currentScroll: number) => void = (currentScroll: number) => {
    this.lastScrollY = this.currentScrollY;
    this.currentScrollY = currentScroll;
  }

  public isUserAtTop(): boolean {
    return getCurrentScrollY() < 48.6;
  }

  constructor(
    private primengConfig: PrimeNGConfig
  ) { 
    document.addEventListener( 'scroll', () => {
      this.updateScrolls( getCurrentScrollY() );
      const scrolledUp = hasUserScrolledTop( this.lastScrollY, this.currentScrollY );
      this.toogleHeader( scrolledUp );
    } );
   }

  ngOnInit() {
    // Allow the Ripple effect
      this.primengConfig.ripple = true;
  }

}
