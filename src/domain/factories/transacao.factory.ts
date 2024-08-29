import { Conta } from '../entities/conta.entity';
import { Transacao } from '../entities/transacao.entity';
import { TipoTransacao } from '../enums/tipo-transacao.enum';

export class TransacaoFactory {
  static criarTransacao(tipo: TipoTransacao, valor: number, conta: Conta) {
    const transacao = new Transacao(tipo, valor, conta);
    return transacao;
  }
}
