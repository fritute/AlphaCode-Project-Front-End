import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.fullscreen]="fullscreen">
      <div class="spinner"></div>
      <p *ngIf="message" class="loading-message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
  @Input() fullscreen: boolean = false;
}