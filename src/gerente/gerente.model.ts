import { Cliente } from 'src/cliente/cliente.model';
import { v4 as uuidv4 } from 'uuid';
export class Gerente {
  id: string;
  clientes: Cliente[] = [];

  constructor(public nomeCompleto: string) {
    this.id = uuidv4();
  }

  adicionarCliente(cliente: Cliente) {
    return this.clientes.push(cliente);
  }

  removerCliente(cliente: Cliente) {
    const index = this.clientes.findIndex((item) => item.id === cliente.id);
    if (index < 0) {
      throw new Error('Cliente não encontrado');
    }

    return this.clientes.splice(index, 1);
  }
}
