import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-card.component.html',
  styleUrl: './graph-card.component.css'
})
export class GraphCardComponent {
  @Input() title: string = '';
  @Input() type: 'pie' | 'bar' = 'pie';
  @Input() dataType: 'percent' | 'absolute' = 'percent';
  @Input() values: number[] = [];
  @Input() labels: string[] = [];
  @Input() actionChartAreas: Array<() => void> = [];

  colors: string[] = [
    'var(--green-600)',
    'var(--brown-500)',
    'var(--green-300)',
    '#c7c1b3'
  ];

  // donut geometry
  radius = 60;
  thickness = 22;
  cx = 80;
  cy = 80;

  total(): number {
    const t = this.values.reduce((sum, v) => sum + (isFinite(v) ? v : 0), 0);
    return t <= 0 ? 1 : t;
  }

  percent(i: number): number {
    return Math.round(((this.values[i] || 0) / this.total()) * 100);
  }

  // Stroke-based donut segments for reliable rendering
  private circumference(): number {
    return 2 * Math.PI * this.radius;
  }
  segmentDashArray(index: number): string {
    const t = this.total();
    const segLen = this.circumference() * ((this.values[index] || 0) / t);
    const rest = Math.max(0, this.circumference() - segLen);
    return `${segLen} ${rest}`;
  }
  segmentDashOffset(index: number): number {
    const t = this.total();
    let prevSum = 0;
    for (let i = 0; i < index; i++) {
      prevSum += (this.values[i] || 0);
    }
    // start from top (-90deg) by rotating the circle; offset equals previous fraction length
    const offset = this.circumference() * (prevSum / t);
    // Use circumference - offset so segments draw in order around the circle
    return this.circumference() - offset;
  }

  onSegmentClick(i: number) {
    const fn = this.actionChartAreas?.[i];
    if (typeof fn === 'function') fn();
  }
  onLegendButtonClick(i: number) {
    const fn = this.actionChartAreas?.[i];
    if (typeof fn === 'function') fn();
  }
  trackItem = (index: number) => index;
}
