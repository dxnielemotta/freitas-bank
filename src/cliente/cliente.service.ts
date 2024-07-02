import { Injectable } from '@nestjs/common';
import { Cliente } from './cliente.model';
import { error } from 'console';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
  ): Cliente {
    const cliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
    this.clientes.push(cliente);
    return cliente;
  }

  obterCliente(id: string): Cliente {
    const cliente = this.clientes.find((cli) => cli.id === id);
    if (!cliente) {
      throw new error('Cliente não encontrado');
    }
    return cliente;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }
}
