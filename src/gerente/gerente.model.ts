import { Cliente } from '../cliente/cliente.model';
import { v4 as uuidv4 } from 'uuid';
export class Gerente {
  id: string;
  clientes: Cliente[] = [];

  constructor(public nomeCompleto: string) {
    this.id = uuidv4();
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente): void {
    this.clientes = this.clientes.filter((item) => item.id !== cliente.id);
  }
}
