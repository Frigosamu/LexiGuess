import { Usuario } from "../models/usuario";

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
