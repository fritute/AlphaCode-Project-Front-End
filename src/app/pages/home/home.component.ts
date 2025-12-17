import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1>Bem-vindo ao Frontend Angular!</h1>
        <p>Esta é a estrutura base do seu projeto Angular.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <h3>🚀 Angular 17</h3>
          <p>Framework moderno com as últimas funcionalidades</p>
        </div>
        
        <div class="feature-card">
          <h3>📱 Responsivo</h3>
          <p>Design adaptável para todos os dispositivos</p>
        </div>
        
        <div class="feature-card">
          <h3>🎨 SCSS</h3>
          <p>Pré-processador CSS para estilos avançados</p>
        </div>
        
        <div class="feature-card">
          <h3>🧩 Componentes</h3>
          <p>Estrutura modular e reutilizável</p>
        </div>
      </div>

      <div class="getting-started">
        <h2>Próximos Passos</h2>
        <ul>
          <li>Instale as dependências: <code>npm install</code></li>
          <li>Inicie o servidor: <code>npm start</code></li>
          <li>Comece a desenvolver seus componentes</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}