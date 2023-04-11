import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { ListUserResolver } from './guards/ListUserGuard';
import { LoginComponent } from './login/login.component';
import { NotasAdesivasComponent } from './notas-adesivas/notas-adesivas.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'painel', component: PainelControleComponent},
  {path: 'painel/contact', component: ContactComponent},
  {path: 'painel/notas', component: NotasAdesivasComponent},
  {path: 'painel/calendar', component: CalendarComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

