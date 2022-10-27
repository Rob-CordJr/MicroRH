import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { NotasAdesivasComponent } from './notas-adesivas/notas-adesivas.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TreinamentoComponent } from './treinamento/treinamento.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'painel', component: PainelControleComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'notas', component: NotasAdesivasComponent},
  {path: 'timesheet', component: TimesheetComponent},
  {path: 'treinamento', component: TreinamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
