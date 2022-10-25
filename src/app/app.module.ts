import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon';
import { FooterModule } from '@coreui/angular';





@NgModule({
  declarations: [
    AppComponent,
    PainelControleComponent,
    LoginComponent,
    MainNavComponent,
  ],
  imports: [
    FooterModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    NgxLoadingButtonsModule,
    IconModule,
    SidebarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
