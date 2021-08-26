import { Component, OnInit, ViewChild } from '@angular/core';

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild('header') header: any;
  public isHeaderCompacted(): boolean {
    //const normalHeight: number = 59; //px
    //if (this.header === undefined) return false; // Header not initialized, so we set false as the default value
    //const navBarheight: number = this.header.nativeElement.clientHeight; //px
    const widthAtWichTheHeaderIsCompacted: number = 867; //px
    const navBarWidth: number = window.innerWidth; //px
    return navBarWidth > widthAtWichTheHeaderIsCompacted;
  }
  public toogleMenu(): void {
    this.shouldShowMenu = !this.shouldShowMenu;
  }
  public shouldShowMenu: boolean = false;
  public headerCompacted: boolean = this.isHeaderCompacted();
  public showHeader: boolean = true;

  public lastScrollY: number = getCurrentScrollY();
  public currentScrollY: number = getCurrentScrollY();
  public isUserAtTop(): boolean {
    if (this.shouldShowMenu) return true;
    return getCurrentScrollY() < 48.6;
  }
  public updateScrolls: (currentScroll: number) => void = (currentScroll: number) => {
    this.lastScrollY = this.currentScrollY;
    this.currentScrollY = currentScroll;
  }
  public toogleHeader: (shouldShow: boolean | null) => void = (shouldShow: boolean | null) => {
    if ( shouldShow === null ) return;
    this.showHeader = shouldShow;
  }


  constructor() {
    document.addEventListener( 'scroll', () => {
      this.updateScrolls( getCurrentScrollY() );
      const scrolledUp = hasUserScrolledTop( this.lastScrollY, this.currentScrollY );
      if (this.shouldShowMenu) return this.toogleHeader( true );
      this.toogleHeader( scrolledUp );
    } );
    
    this.headerCompacted = this.isHeaderCompacted();
    this.shouldShowMenu = false;
    window.addEventListener( 'resize', () => {
      console.log( 'resize' );
      
      this.headerCompacted = this.isHeaderCompacted();
      console.log(this.headerCompacted);
      if ( this.headerCompacted ) this.shouldShowMenu = false;
      
    });
  }

  ngOnInit(): void {
  }
}
