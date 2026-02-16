import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { InfoCardComponent } from '../../shared/components/info-card/infoCard.component';
import { GerenteStore } from '../../services/gerente-store.service';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, InfoCardComponent],
  templateUrl: './ai-insights.component.html',
  styleUrl: './ai-insights.component.css'
})
export class AiInsightsComponent {
  sidebarOpen = signal<boolean>(true);
  constructor(public gerenteStore: GerenteStore) {
  }

  firstName: string = (this.gerenteStore.nome() || '').trim().split(/\s+/)[0];

  chatMessages = signal<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: `Olá, ${this.firstName} ! Tenho alguns "insights" novos para hoje! Vamos começar?` }
  ]);
  chatInput = signal<string>('');

  onCardAction(card: string) {
    console.log('Card action', card);
  }

  sendMessage() {
    const text = (this.chatInput() || '').trim();
    if (!text) return;
    const msgs = [...this.chatMessages()];
    msgs.push({ role: 'user', text });
    this.chatMessages.set(msgs);
    this.chatInput.set('');
    // resposta placeholder
    const reply = `Anotado: ${text}`;
    this.chatMessages.set([...this.chatMessages(), { role: 'ai', text: reply }]);
  }
}
