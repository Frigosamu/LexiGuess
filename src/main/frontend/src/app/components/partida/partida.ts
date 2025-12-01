import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PalabraService } from '../../services/palabra.service';
import { Partida as PartidaModel } from '../../models/partida';
import { Palabra } from '../../models/palabra';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-partida',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './partida.html',
  styleUrl: './partida.css',
})

export class Partida implements OnInit {
  private auth = inject(AuthService);
  user = toSignal(this.auth.user$, { initialValue: null });
  private palabraService = inject(PalabraService);
  private partidaService = inject(PartidaService);

  palabraObjetivo: string = '';
  partidaActual: PartidaModel | null = null;
  selectedPalabra: Palabra | null = null;
  resultados: ('blue' | 'yellow' | 'gray')[][] = [];


  rowsCount = 6;
  colsCount = 5;

  rows = Array.from({ length: this.rowsCount });
  cols = Array.from({ length: this.colsCount });

  board: string[][] = Array.from({ length: this.rowsCount }, () => Array(this.colsCount).fill(''));

  filasBloqueadas: boolean[] = Array(this.rowsCount).fill(false);

  getCellId(r: number, c: number) {
    return `cell-${r}-${c}`;
  }

  private focusCell(r: number, c: number) {
    if (r < 0 || c < 0 || r >= this.rowsCount || c >= this.colsCount) return;

    this.currentRow = r;
    this.currentCol = c;

    queueMicrotask(() => {
      const el = document.getElementById(this.getCellId(r, c)) as HTMLInputElement | null;
      el?.focus();
      el?.select();
    });
  }

  onCellInput(event: Event, r: number, c: number) {
    if (this.filasBloqueadas[r]) {
      return;
    }

    const input = event.target as HTMLInputElement;
    let v = (input.value || '').toUpperCase().replace(/[^A-ZÑÁÉÍÓÚÜ]/g, '');
    v = v.slice(0, 1);
    this.board[r][c] = v;
    input.value = v;

    if (v.length === 1) {
      const nextC = c + 1;
      if (nextC < this.colsCount) this.focusCell(r, nextC);
    }
  }

  onCellKeydown(event: KeyboardEvent, r: number, c: number) {
    if (this.filasBloqueadas[r]) {
      return;
    }

    const key = event.key;

    if (key === 'Backspace') {
      if ((this.board[r][c] ?? '') === '') {
        // Ir a la celda anterior y limpiarla
        const prevC = c - 1;
        if (prevC >= 0) {
          this.board[r][prevC] = '';
          this.focusCell(r, prevC);
          event.preventDefault();
        }
      } else {
        // Limpiar la actual (dejar el foco)
        this.board[r][c] = '';
      }
      return;
    }

    if (key === 'ArrowLeft') {
      this.focusCell(r, c - 1);
      event.preventDefault();
      return;
    }
    if (key === 'ArrowRight') {
      this.focusCell(r, c + 1);
      event.preventDefault();
      return;
    }
    if (key === 'ArrowUp') {
      this.focusCell(r - 1, c);
      event.preventDefault();
      return;
    }
    if (key === 'ArrowDown') {
      this.focusCell(r + 1, c);
      event.preventDefault();
      return;
    }

    //Valdar
    if (key === 'Enter') {
      this.validarFila(r);
    }
  }

  randomPalabra() {
    this.palabraService.getPalabraAleatoria().subscribe({
      next: (resp: Palabra) => {
        this.selectedPalabra = resp;
        this.palabraObjetivo = (resp?.palabra ?? resp ?? '').toString().toUpperCase();

        console.log('Palabra aleatoria seleccionada:', this.palabraObjetivo);
        this.crearPartida();
      },
      error: (err) => {
        console.error('Error al obtener palabra aleatoria:', err);
      }
    })
  }

  crearPartida() {
    if (!this.user()?.idUsuario || !this.selectedPalabra) return;

    const payload: PartidaModel = {
      palabra: this.selectedPalabra,
      usuario: { idUsuario: this.user()?.idUsuario } as any,
      intentos: 0,
      resultado: 'en curso',
      fecha: new Date(),
      puntuacion: 0,
    };

    this.partidaService.createPartida(payload).subscribe({
      next: (p) => {
        this.partidaActual = p;
        console.log('Partida creada:', p);
      },
      error: (err) => console.error('Error creando partida:', err),
    });
  }


  checkWord(intento: string[], objetivo: string): ('blue' | 'yellow' | 'gray')[] {
    const resultado: ('blue' | 'yellow' | 'gray')[] = Array(intento.length).fill('gray');

    const objetivoArr = objetivo.split('');
    const intentoArr = [...intento];

    //CORRECTOS
    for (let i = 0; i < intentoArr.length; i++) {
      if (intentoArr[i] === objetivoArr[i]) {
        resultado[i] = 'blue';
        objetivoArr[i] = '*';
        intentoArr[i] = '-';
      }
    }

    //PRESENTES
    for (let i = 0; i < intentoArr.length; i++) {
      if (resultado[i] === 'gray') {
        const index = objetivoArr.indexOf(intentoArr[i]);
        if (index !== -1) {
          resultado[i] = 'yellow';
          objetivoArr[index] = '*';
        }
      }

    }

    return resultado;
  }

  getColor(r: number, c: number) {
    return this.resultados[r]?.[c];
  }

  flipCells: boolean[][] = Array.from({ length: this.rowsCount }, () =>
    Array(this.colsCount).fill(false)
  );

  validarFila(r: number) {
    if (!this.partidaActual || this.juegoTerminado) return;

    const intento = this.board[r];

    if (intento.some(letra => letra === '')) {
      console.log('Fila incompleta');
      return;
    }

    this.partidaActual.intentos++;

    this.partidaService.updateIntentos(
      this.partidaActual.idPartida!,
      this.partidaActual.intentos
    ).subscribe();


    const resultado = this.checkWord(intento, this.palabraObjetivo);
    this.resultados[r] = resultado;

    for (let c = 0; c < this.colsCount; c++) {
      setTimeout(() => {
        this.flipCells[r][c] = true;
        setTimeout(() => this.flipCells[r][c] = false, 600);
      }, c * 120);
    }

    this.actualizarEstadoTeclado();
    this.filasBloqueadas[r] = true;

    if (r < this.rowsCount - 1) {
      this.filasBloqueadas[r + 1] = false;
      this.currentRow = r + 1;
      this.currentCol = 0;
      this.focusCell(this.currentRow, this.currentCol);
    }

    if (resultado.every(color => color === 'blue')) {
      this.ganarPartida();
      return;
    }

    // Si ha llegado a la última fila y no ha acertado
    if (r === this.rowsCount - 1) {
      this.perderPartida();
      return;
    }
  }

  mensajeVictoria: string | null = null;
  juegoTerminado: boolean = false;

  ganarPartida() {
    this.mensajeVictoria = '¡Felicidades! Has adivinado la palabra.';
    this.juegoTerminado = true;

    if (this.partidaActual) {

      const intentosTotales = this.partidaActual.intentos;
      const intentosFallidos = Math.max(0, intentosTotales - 1);

      const puntuacionFinal = Math.max(0, 100 - intentosFallidos * 20);

      this.partidaActual.resultado = 'ganada';
      this.partidaActual.puntuacion = puntuacionFinal;

      this.partidaService.updatePartida(this.partidaActual.idPartida!, this.partidaActual).subscribe({
        next: () => console.log('Partida actualizada con victoria'),
        error: (err) => console.error('Error actualizando partida:', err),
      });
    }
  }


  perderPartida() {
    this.mensajeVictoria = `¡Has perdido! La palabra era: ${this.palabraObjetivo}`;
    this.juegoTerminado = true;

    if (this.partidaActual) {

      this.partidaActual.resultado = 'perdida';
      this.partidaActual.puntuacion = 0;

      this.partidaService.updatePartida(this.partidaActual.idPartida!, this.partidaActual).subscribe({
        next: () => console.log('Partida actualizada con derrota'),
        error: (err) => console.error('Error actualizando partida:', err),
      });
    }
  }

  fila1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  fila2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  fila3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  estadoTecla: { [key: string]: 'blue' | 'yellow' | 'gray' | undefined } = {};

  currentRow = 0;
  currentCol = 0;

  clickTecla(letra: string) {
    if (this.juegoTerminado) return;

    if (this.filasBloqueadas[this.currentRow]) return;

    this.board[this.currentRow][this.currentCol] = letra;

    const el = document.getElementById(this.getCellId(this.currentRow, this.currentCol)) as HTMLInputElement | null;

    if (el) {
      el.value = letra;
    }

    this.moverCursorAdelante();
  }

  clickBackspace() {
    if (this.juegoTerminado) return;
    
    if (this.filasBloqueadas[this.currentRow]) return;

    if (this.currentCol > 0) {
      if ((this.board[this.currentRow][this.currentCol] ?? '') === '') {
        this.currentCol--;
      }

      this.board[this.currentRow][this.currentCol] = '';
      this.focusCell(this.currentRow, this.currentCol);
    
    } else {
      this.board[this.currentRow][0] = '';
      this.focusCell(this.currentRow, 0);
    }
  }

  clickEnter() {
    if (this.juegoTerminado) return;

    const intento = this.board[this.currentRow];

    if (intento.some(letra => letra === '')) {
      console.log('Fila incompleta');
      return;
    }

    this.validarFila(this.currentRow);
  }

  moverCursorAdelante() {
    if (this.currentCol < this.colsCount - 1) {
      this.currentCol++;
      this.focusCell(this.currentRow, this.currentCol);
    } else {
      this.focusCell(this.currentRow, this.currentCol);
    }
  }

  moverCursorAtras() {
    if (this.currentCol > 0) {
      this.currentCol--;
    }
    this.focusCell(this.currentRow, this.currentCol);
  }

  actualizarEstadoTeclado() {
    for (let r = 0; r < this.resultados.length; r++) {
      const resFila = this.resultados[r];

      if (!resFila) continue;

      for (let c = 0; c < resFila.length; c++) {
        const letra = (this.board[r][c] ?? '').toUpperCase();
        const color = resFila[c];

        if (!letra) continue;

        const prev = this.estadoTecla[letra];

        if (color === 'blue') {
          this.estadoTecla[letra] = 'blue';
        
        } else if (color === 'yellow') {
          if (prev !== 'blue') {
            this.estadoTecla[letra] = 'yellow';
          }
        
        } else {
          if (!prev) {
            this.estadoTecla[letra] = 'gray';
          }
        }
      }
    }
  }


  ngOnInit() {
    this.randomPalabra();

      this.filasBloqueadas = this.filasBloqueadas.map((_, i) => i !== 0);

  }
}