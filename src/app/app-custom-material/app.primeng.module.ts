import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
import {DockModule} from 'primeng/dock';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { CardModule } from 'primeng/card';
import { Chip, ChipModule } from 'primeng/chip';
import {DividerModule} from 'primeng/divider';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    AccordionModule,
    CardModule,
    CalendarModule,
    DockModule,
    ToolbarModule,
    ButtonModule,
    CheckboxModule,
    ImageModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    PasswordModule,
    RadioButtonModule,
    ChipModule,
    PanelModule,
  ],
  exports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    AccordionModule,
    CardModule,
    CalendarModule,
    DockModule,
    ButtonModule,
    CheckboxModule,
    ImageModule,
    DialogModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    PasswordModule,
    RadioButtonModule,
    ChipModule,
    DividerModule,
    PanelModule
  ],
  providers: [MessageService, ConfirmationService],

})


export class AppPrimengModule { }
