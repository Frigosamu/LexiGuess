import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaService } from '../../services/partida.service';


@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css',
})

export class Ranking {
  private partidaService = inject(PartidaService);

  ranking = signal<{ usuario: { nombre: string }, puntuacionTotal: number }[]>([]);

  constructor() {
    this.partidaService.getRanking().subscribe((data) => this.ranking.set(data));
  }
}
