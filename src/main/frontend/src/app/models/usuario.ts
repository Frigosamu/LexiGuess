import { Partida } from "./partida";

export interface Usuario {
    idUsuario: number;
    nombre: string;
    contrasenia: string;
    fechaRegistro: Date;
    email: string;
    rol: 'usuario' | 'admin';
    listaPartidas?: Partida[];
}
