import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { AdmComponent } from './adm/adm.component';
import { NotasAdesivasComponent } from './notas-adesivas/notas-adesivas.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'painel', component: PainelControleComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'notas', component: NotasAdesivasComponent},
  {path: 'adm', component: AdmComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

