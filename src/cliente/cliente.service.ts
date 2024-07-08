import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cliente } from './cliente.model';
import { GerenteService } from 'src/gerente/gerente.service';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor(
    @Inject(forwardRef(() => GerenteService))
    private gerenteService: GerenteService,
  ) {}

  cadastrarCliente(
    nomeCompleto: string,
    endereco: string,
    telefone: string,
    rendaSalarial: number,
    gerenteID: string,
  ): Cliente {
    const gerente = this.gerenteService.obterGerente(gerenteID);
    const cliente = new Cliente(
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
      gerenteID,
    );
    this.clientes.push(cliente);
    gerente.adicionarCliente(cliente);
    return cliente;
  }

  obterCliente(id: string): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }
}
