import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infoCard.component.html',
  styleUrl: './infoCard.component.css'
})
export class InfoCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() description: string = '';
  @Input() iconClass: string = '';
  @Input() trend: string = '';
  @Input() isPositive: boolean = true; 
}
