import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() action = new EventEmitter<void>();
  @Input() actionTooltip: string = '';

  iconPath(): string {
    switch (this.iconClass) {
      case 'icon-wallet':
        return 'M4 7h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zm10 4h4a1 1 0 010 2h-4a1 1 0 110-2z';
      case 'icon-users':
        return 'M16 14c2.761 0 5 1.791 5 4v2H3v-2c0-2.209 2.239-4 5-4h8zm-8-2a4 4 0 110-8 4 4 0 010 8zm8 0a4 4 0 110-8 4 4 0 010 8z';
      case 'icon-target':
        return 'M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm0 18a8 8 0 118-8 8.009 8.009 0 01-8 8zm0-12a4 4 0 104 4 4.005 4.005 0 00-4-4zm0 2a2 2 0 11-2 2 2.003 2.003 0 012-2z';
      case 'icon-card':
        return 'M2 6h20v12H2z M4 10h12';
      case 'icon-check':
        return 'M20 6L9 17l-5-5';
      case 'icon-eye':
        return 'M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12zm10.5 3a3 3 0 110-6 3 3 0 010 6z';
      case 'icon-list':
        return 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01';
      case 'icon-plus-circle':
        return 'M12 3a9 9 0 109 9 9.01 9.01 0 00-9-9zm0 4v10m-5-5h10';
      case 'icon-expand':
        return 'M6 9l6 6 6-6';
      case 'icon-info':
        return 'M12 3a9 9 0 109 9 9.01 9.01 0 00-9-9zm0 7v6m0-9h.01';
      case 'icon-folder':
        return 'M3 7h6l2 2h10v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z';
      case 'icon-doc':
        return 'M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm8 1v4h4v-4h-4zm0 6h4v4h-4v-4z';
      default:
        return 'M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2z';
    }
  }

  onIconClick() {
    console.log('Card action', this.title);
    this.action.emit();
  }
}
