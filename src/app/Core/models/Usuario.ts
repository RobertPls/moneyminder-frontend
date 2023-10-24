
export interface UsuarioToken {
  id: string;
  name: string;
  isStaf: boolean;
}

export interface Usuario {
  id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
}