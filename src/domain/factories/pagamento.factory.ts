import { TipoPagamento } from '../enums/tipo-pagamento.enum';

import { Conta } from '../entities/conta.entity';
import { Pagamento } from '../entities/pagamento.entity';

export class PagamentoFactory {
  static criarPagamento(tipo: TipoPagamento, valor: number, conta: Conta) {
    const data = new Date();
    const pagamento = new Pagamento(tipo, valor, data, conta);
    return pagamento;
  }
}
