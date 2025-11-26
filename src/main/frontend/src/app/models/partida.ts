import { Usuario } from "./usuario";
import { Palabra } from "./palabra";

export interface Partida {
    idPartida?: number;
    palabra: Palabra;
    usuario: Usuario;
    intentos: number;
    resultado: 'ganada' | 'perdida' | 'en curso';
    fecha: Date;
    puntuacion: number;
}