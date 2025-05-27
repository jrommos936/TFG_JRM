import { Usuario } from "./usuario";

export interface Fotos {
  id: number;
  nombre: string;
  usuario: Usuario;
  titulo: string;
  descripcion: string;
  archivo: string;
  estado: string; // 'pendiente', 'aceptada', 'rechazada'
  votos?: number;
  yaVotada?: boolean;
}
