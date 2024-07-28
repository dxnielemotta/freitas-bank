import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Gerente } from './gerente.entity';
import { ClienteService } from '../cliente/cliente.service';
import { TipoConta } from '../enums/tipo-conta.enum';
import { ContaService } from 'src/conta/conta.service';
import { Cliente } from 'src/cliente/cliente.entity';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];
  private clientes: Cliente[] = [];

  constructor(
    @Inject(forwardRef(() => ClienteService))
    @Inject(forwardRef(() => ContaService))
    private contaService: ContaService,
  ) {}

  criarGerente(nomeCompleto: string): Gerente {
    const gerente = new Gerente(nomeCompleto);
    this.gerentes.push(gerente);
    return gerente;
  }

  obterGerente(gerenteID: string): Gerente {
    const gerente = this.gerentes.find((gerente) => gerente.id === gerenteID);
    if (!gerente) {
      throw new Error('Gerente não encontrado');
    }
    return gerente;
  }

  listarGerentes(): Gerente[] {
    return this.gerentes;
  }

  abrirConta(tipo: TipoConta, clienteID: string) {
    const cliente = this.clientes.find((cli) => cli.id === clienteID);

    if (tipo === TipoConta.CORRENTE && cliente.rendaSalarial < 500) {
      throw new Error(
        'Cliente não possui os requisitos para abrir uma conta-corrente',
      );
    }

    const conta = this.contaService.abrirConta(tipo, clienteID);
    return cliente.contas.push(conta);
  }

  mudarTipoConta(contaID: string, novoTipo: TipoConta) {
    this.contaService.mudarTipoConta(contaID, novoTipo);
  }

  fecharConta(contaID: string) {
    this.contaService.fecharConta(contaID);
  }
}
