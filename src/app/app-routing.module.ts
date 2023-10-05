import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { AdmComponent } from './adm/adm.component';




const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'painel', component: PainelControleComponent},
  {path: 'adm', component: AdmComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

