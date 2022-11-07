import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { NotasAdesivasComponent } from './notas-adesivas/notas-adesivas.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TreinamentoComponent } from './treinamento/treinamento.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LocalStorageService } from './services/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/AuthGuard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { AdmUsuarioComponent } from './adm-usuario/adm-usuario.component';
import { ListUserResolver } from './guards/ListUserGuard';
import { LOCALE_ID } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
registerLocaleData(localePT);





@NgModule({
  declarations: [
    AppComponent,
    PainelControleComponent,
    LoginComponent,
    MainNavComponent,
    CalendarComponent,
    NotasAdesivasComponent,
    TreinamentoComponent,
    TimesheetComponent,
    AdmUsuarioComponent,
  ],
  imports: [
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    BrowserModule,
    TableModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    NgxLoadingButtonsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule,

  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    AuthService,
    LocalStorageService,
    AuthGuard,
    ListUserResolver,
    MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
