import { Injectable } from '@nestjs/common';

import { Conta } from './conta.model';
import { ContaFactory } from './conta.factory';
import { TipoConta } from 'src/enums/tipo-conta.enum';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  abrirConta(tipo: TipoConta, clienteID: string) {
    return ContaFactory.criarConta(tipo, clienteID);
  }

  fecharConta(contaID: string) {
    return this.contas.filter((conta) => conta.id !== contaID);
  }

  mudarTipoConta(contaID: string, novoTipo: TipoConta) {
    const contaEncontrada = this.contas.find((conta) => conta.id == contaID);

    if (!contaEncontrada) {
      throw new Error('Conta não encontrada');
    }
    contaEncontrada.tipo = novoTipo;
  }
}
