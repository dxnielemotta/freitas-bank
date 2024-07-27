import { TipoConta } from 'src/enums/tipo-conta.enum';
import { Conta } from './conta.model';
import { ContaCorrente } from './conta-corrente.model';
import { ContaPoupanca } from './conta-poupanca.model';

export class ContaFactory {
  static criarConta(tipo: TipoConta, clienteID: string): Conta {
    const tiposConta = {
      [TipoConta.CORRENTE]: new ContaCorrente(0, clienteID),
      [TipoConta.POUPANCA]: new ContaPoupanca(0, clienteID),
    };

    const conta = tiposConta[tipo];
    if (!conta) {
      throw new Error('Tipo de conta inválido');
    }

    return conta;
  }
}
