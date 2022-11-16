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
  ],
  exports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
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
  ],
  providers: [MessageService, ConfirmationService],

})


export class AppPrimengModule { }
