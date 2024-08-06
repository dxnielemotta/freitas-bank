import { TipoConta } from '../enums/tipo-conta.enum';
import { Conta } from '../entities/conta.entity';
import { ContaCorrente } from '../models/conta-corrente.model';
import { ContaPoupanca } from '../models/conta-poupanca.model';
import { Cliente } from '../entities/cliente.entity';

export class ContaFactory {
  static criarConta(tipo: TipoConta, cliente: Cliente): Conta {
    const tiposConta = {
      [TipoConta.CORRENTE]: new ContaCorrente(0, cliente),
      [TipoConta.POUPANCA]: new ContaPoupanca(0, cliente),
    };

    const conta = tiposConta[tipo];
    if (!conta) {
      throw new Error('Tipo de conta inválido');
    }

    return conta;
  }
}
