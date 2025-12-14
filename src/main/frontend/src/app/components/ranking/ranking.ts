import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaService } from '../../services/partida.service';
import { clear } from 'node:console';


@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})

export class Ranking {
  private partidaService = inject(PartidaService);
  ranking = signal<{ usuario: { nombre: string }, puntuacionTotal: number }[]>([]);
  email = 'enzosamuel0103@gmail.com';
  phone = '+34 631499950';

  emailPopup = signal(false);
  phonePopup = signal(false);
  private emailTimeout: any;
  private phoneTimeout: any;

  mailCopiado = signal(false);
  phoneCopiado = signal(false);
  private copiedMailTiemeout: any;
  private copiedPhoneTiemeout: any;

  constructor() {
    this.partidaService.getRanking().subscribe((data) => this.ranking.set(data));
  }

  private async copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error('No se pudo copiar al portapapeles:', e);
    }
  }

  openEmailPopup() {
    this.copyToClipboard(this.email);
    this.phonePopup.set(false);
    this.emailPopup.set(true);
    this.mailCopiado.set(true);

    clearTimeout(this.copiedMailTiemeout);
    this.copiedMailTiemeout = setTimeout(() => this.mailCopiado.set(false), 2500);

    clearTimeout(this.emailTimeout);
    this.emailTimeout = setTimeout(() => this.emailPopup.set(false), 2500);
  }

  openPhonePopup() {
    this.copyToClipboard(this.phone);
    this.emailPopup.set(false);
    this.phonePopup.set(true);
    this.phoneCopiado.set(true);

    clearTimeout(this.copiedPhoneTiemeout);
    this.copiedPhoneTiemeout = setTimeout(() => this.phoneCopiado.set(false), 2500);

    clearTimeout(this.phoneTimeout);
    this.phoneTimeout = setTimeout(() => this.phonePopup.set(false), 2500);
  }


}
