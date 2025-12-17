import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>{{ title }}</h1>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; 2024 AlphaCode Frontend</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend Angular - AlphaCode';
}