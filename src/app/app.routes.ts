import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AiInsightsComponent } from './pages/ai-insights/ai-insights.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tarefas', component: TarefasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ai-insights', component: AiInsightsComponent },
  { path: '**', redirectTo: '' }
];
