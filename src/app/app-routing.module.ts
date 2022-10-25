import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'painel', component: PainelControleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
