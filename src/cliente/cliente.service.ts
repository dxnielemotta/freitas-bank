import { Injectable } from '@nestjs/common';
import { Cliente } from './cliente.model';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  cadastrarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }

  encontrarClientePorId(id: string): Cliente {
    return this.clientes.find((cliente) => cliente.id === id);
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }
}
