import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PalabraService } from '../../services/palabra.service';
import { Partida as PartidaModel } from '../../models/partida';
import { Palabra } from '../../models/palabra';
import { PartidaService } from '../../services/partida.service';
import { UsuarioLogroService } from '../../services/usuario-logro.service';

@Component({
  selector: 'app-partida',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './partida.html',
  styleUrl: './partida.css',
})

export class Partida implements OnInit {
  private auth = inject(AuthService);
  user = toSignal(this.auth.user$, { initialValue: null });
  errorMsg: string | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  private palabraService = inject(PalabraService);
  private partidaService = inject(PartidaService);
  private usuarioLogroService = inject(UsuarioLogroService);

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

    setTimeout(() => {
      const el = document.getElementById(this.getCellId(r, c)) as HTMLInputElement | null;
      el?.focus();
      el?.select();
    }, 10);
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
      resultado: 'perdida',
      fecha: new Date(),
      puntuacion: 0,
    };

    this.partidaService.createPartida(payload).subscribe({
      next: (p) => {
        this.partidaActual = p;
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
    return this.resultados[r]?.[c] ?? '';
  }

  animacionesFila: string[][] = Array.from({ length: this.rowsCount }, () => Array(this.colsCount).fill(''));
  intentoInexistente = 0;

  validarFila(r: number) {
    if (!this.partidaActual || this.juegoTerminado) return;

    const intento = this.board[r];
    const palabraIntento = intento.join('');

    if (intento.some(letra => letra === '')) {
      this.errorMsg = 'Fila incompleta.';
      return;
    }

    this.palabraService.palabraExists(palabraIntento).subscribe({
      next: (exists: boolean) => {
        if (!exists) {
          this.errorMsg = 'La palabra no existe.';
          this.intentoInexistente++;

          if (this.intentoInexistente >= 5) {
            this.darLogro(12);
          }

          this.focusCell(this.currentRow, this.currentCol);
          this.cdr.detectChanges();
          return;
        }

        this.errorMsg = null;

        this.partidaActual!.intentos++;
        this.partidaService.updateIntentos(
          this.partidaActual!.idPartida!,
          this.partidaActual!.intentos
        ).subscribe();

        const resultado = this.checkWord(intento, this.palabraObjetivo);
        this.resultados[r] = resultado;

        for (let c = 0; c < this.colsCount; c++) {
          this.animacionesFila[r][c] = 'bounce';
          setTimeout(() => {
            this.animacionesFila[r][c] = '';
            this.cdr.detectChanges();
          }, 400);
        }

        this.cdr.detectChanges();


        this.actualizarEstadoTeclado();
        this.cdr.detectChanges();

        this.filasBloqueadas[r] = true;

        if (r < this.rowsCount - 1) {
          this.filasBloqueadas[r + 1] = false;
          this.currentRow = r + 1;
          this.currentCol = 0;
          this.focusCell(this.currentRow, this.currentCol);
        }

        this.cdr.detectChanges();

        if (resultado.every(c => c === 'blue')) {
          this.ganarPartida();
          return;
        }

        if (r === this.rowsCount - 1) {
          this.perderPartida();
          return;
        }
      },

      error: (err) => {
        console.error('Error comprobando existencia de palabra:', err);
        this.errorMsg = 'Error al validar la palabra.';
      }
    });
  }

  mensajeVictoria: string | null = null;
  juegoTerminado: boolean = false;

  rachaVictorias = 0;
  rachaDerrotas = 0;
  partidasTotales = this.user()?.listaPartidas?.length ?? 0;
  palabrasCompletadas = 0;

  ganarPartida() {
    this.mensajeVictoria = `¡Felicidades! Has adivinado la palabra.\n ${this.palabraObjetivo}`;
    this.juegoTerminado = true;

    if (this.partidaActual) {

      const intentosTotales = this.partidaActual.intentos;
      const intentosFallidos = Math.max(0, intentosTotales - 1);

      const puntuacionFinal = Math.max(20, 100 - (intentosFallidos * -1) * 15);

      this.partidaActual.resultado = 'ganada';
      this.partidaActual.puntuacion = puntuacionFinal;
      this.rachaVictorias++;
      this.rachaDerrotas = 0;
      this.palabrasCompletadas++;

      this.partidaService.updatePartida(this.partidaActual.idPartida!, this.partidaActual)
        .subscribe({
          next: () => {
            this.comprobarLogros();
          },

          error: (err) => {
            console.error('Error actualizando partida:', err);
          }
        });
    }
  }

  perderPartida() {
    this.mensajeVictoria = `¡Has perdido! La palabra era:\n ${this.palabraObjetivo}`;
    this.juegoTerminado = true;

    if (this.partidaActual) {

      this.partidaActual.resultado = 'perdida';
      this.partidaActual.puntuacion = 0;
      this.rachaDerrotas++;
      this.rachaVictorias = 0;

      this.partidaService.updatePartida(this.partidaActual.idPartida!, this.partidaActual)
        .subscribe({
          next: () => {
            this.comprobarLogros();
          },

          error: (err) => {
            console.error('Error actualizando partida:', err);
          }
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

    this.filasBloqueadas = this.filasBloqueadas.map((_, index) => index !== 0);

  }


  logrosObtenidos: number[] = [];
  mostrarPopupLogros: boolean = false;
  mensajePopupLogros: string = '';

  private darLogro(idLogro: number) {
    const userId = this.user()?.idUsuario;
    if (!userId) return;

    this.usuarioLogroService.tieneLogro(userId, idLogro)
      .subscribe({
        next: (tiene) => {
          if (!tiene) {
            this.usuarioLogroService.asignarLogroAUsuario(userId, idLogro)
              .subscribe({
                next: () => {
                  this.logrosObtenidos.push(idLogro);
                  this.cdr.detectChanges();
                },
                error: (err) => console.error('Error asignando logro:', err),
              });
          }
        }
      });
  }

  private mostrarLogrosPopup() {
    const count = this.logrosObtenidos.length;
    if (count === 0) return;

    this.mensajePopupLogros = count === 1 ?
      '¡1 logro obtenido!' : `¡${count} logros obtenidos!`;
    this.mostrarPopupLogros = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.mostrarPopupLogros = false;
      this.cdr.detectChanges();
    }, 2000);

    this.logrosObtenidos = [];
  }

  comprobarLogros() {
    if (!this.partidaActual || !this.user()?.idUsuario) return;

    const idUser = this.user()!.idUsuario;
    const intentos = this.partidaActual.intentos;
    const ganada = this.partidaActual.resultado === 'ganada';
    const perdida = this.partidaActual.resultado === 'perdida';
    const palabra = this.palabraObjetivo;

    if (ganada || perdida) {
      this.darLogro(1); //Completar la primera partida

      if (this.user()?.listaPartidas?.length === 5) {
        this.darLogro(2); //Completar 5 partidas
      }

      setTimeout(() => {
        this.mostrarLogrosPopup();
      }, 300);
    }


    if (ganada) {
      if (intentos === 1) {
        this.darLogro(3); //Acertar a la primera
      }

      if (intentos <= 3) {
        this.darLogro(4); //Acertar en 3 intentos o menos
      }

      if (intentos === 6) {
        this.darLogro(5); //Acertar en el último intento
      }

      const fila = this.resultados[intentos - 1];
      if (fila && fila.every(color => color !== 'yellow')) {
        this.darLogro(7); //Sin letras amarillas
      }

      const vocales = palabra.match(/[AEIOUÁÉÍÓÚÜ]/g) || [];
      const repetidas = new Set(vocales.filter((v, i, arr) => arr.indexOf(v) !== i));
      if (repetidas.size > 0) {
        this.darLogro(9); //Palabra con vocales repetidas
      }

      const AllDifferent = new Set(palabra).size === palabra.length;
      if (AllDifferent) {
        this.darLogro(11); //Palabra con todas las letras diferentes
      }

      if (this.rachaVictorias === 20) {
        this.darLogro(8); //20 victorias seguidas
      }

      const letrasIncorrectasUsadas = new Set<string>();
      let repetidasMal = false;

      for (let fila = 0; fila < intentos - 1; fila++) {
        for (let c = 0; c < 5; c++) {
          if (this.resultados[fila][c] === 'gray') {
            letrasIncorrectasUsadas.add(this.board[fila][c]);
          }
        }
      }

      for (let fila = 1; fila < intentos; fila++) {
        for (let c = 0; c < 5; c++) {
          const letra = this.board[fila][c];
          if (letrasIncorrectasUsadas.has(letra)) {
            repetidasMal = true;
          }
        }
      }

      if (!repetidasMal) {
        this.darLogro(10); //Acierta sin repetir letras incorrectas
      }

      setTimeout(() => {
        this.mostrarLogrosPopup();
      }, 300);
    }

    if (perdida) {
      if (this.rachaDerrotas >= 5) {
        this.darLogro(6); //5 derrotas seguidas
      }

      if (this.partidasTotales >= 50) {
        this.darLogro(13); //50 partidas jugadas
      }

      if (this.palabrasCompletadas >= 100) {
        this.darLogro(14); //100 palabras completadas
      }

      setTimeout(() => {
        this.mostrarLogrosPopup();
      }, 300);
    }

  }

  newGame() {
    this.mensajeVictoria = null;
    this.juegoTerminado = false;
    this.errorMsg = null;

    this.board = Array.from({ length: this.rowsCount }, () => Array(this.colsCount).fill(''));
    this.resultados = [];
    this.animacionesFila = Array.from({ length: this.rowsCount }, () => Array(this.colsCount).fill(''));
    this.estadoTecla = {};
    this.filasBloqueadas = Array(this.rowsCount).fill(false);
    this.currentRow = 0;
    this.currentCol = 0;

    this.randomPalabra();

    this.filasBloqueadas = this.filasBloqueadas.map((_, index) => index !== 0);
    this.focusCell(0, 0);
    this.cdr.detectChanges();
  }
}