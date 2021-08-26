import { NgModule } from '@angular/core';

// Prime Ng
// Ripple effect
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import {SkeletonModule} from 'primeng/skeleton';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

@NgModule({
  declarations: [],
  exports: [
    RippleModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputSwitchModule,
    SidebarModule,
    ToolbarModule,
    AutoCompleteModule,
    OverlayPanelModule,
    InputTextareaModule,
    CheckboxModule,
    SkeletonModule,
    ProgressBarModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule
  ],
  imports: [],
  providers: [MessageService]
})
export class PrimengModule { }
