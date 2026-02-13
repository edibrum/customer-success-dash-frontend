import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminSeedDataService } from '../../services/adminSeedData.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  adminSeedDataService: AdminSeedDataService;
  loading = false;
  toastVisible = false;
  toastMessage: string = '';

  constructor(private router: Router, adminSeedDataService: AdminSeedDataService) {
    this.adminSeedDataService = adminSeedDataService;
  }

  startClick() {
    this.loading = true;

    this.adminSeedDataService.postSeedDataRequest().subscribe({
      next: (msg: string) => {
        this.showToast(msg ?? 'Carga de dados processada!');
        // Redireciona assim que a resposta chegar com sucesso
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.showToast('Erro no processamento ou tempo de espera excedido.');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => { 
      this.toastVisible = false; 
    }, 15000);
  }
}
