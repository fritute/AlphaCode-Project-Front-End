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
        <img class="img_logo" src="./assets/logo_alphacode.png" alt="">
        <h1 class="titulo">{{ title }}</h1>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
           <footer class="page-footer">
        <div class="footer-content">
          <div class="footer-left">
            <span>Termos | Políticas</span>
          </div>
          <div class="footer-center">
            <span>© Copyright 2022 | Desenvolvido por</span>
            <img src="assets/logo_rodape_alphacode.png" alt="AlphaCode" class="footer-logo">
          </div>
          <div class="footer-right">
            <span>#Alphacode IT Solutions 2022</span>
          </div>
        </div>
      </footer>
    </div>
    
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cadastro de Contatos';
}