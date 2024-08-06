import { TipoPagamento } from '../enums/tipo-pagamento.enum';
import { PagamentoBoleto } from '../models/pagamento-boleto.model';
import { PagamentoPIX } from '../models/pagamento-pix.model';
import { PagamentoInterface } from '../interfaces/pagamento.interface';

export class PagamentoFactory {
  static criarPagamento(tipo: TipoPagamento): PagamentoInterface {
    const tiposPagamento = {
      [TipoPagamento.PIX]: new PagamentoPIX(),
      [TipoPagamento.BOLETO]: new PagamentoBoleto(),
    };
    const pagamento = tiposPagamento[tipo];

    if (!pagamento) {
      throw new Error('Tipo de pagamento inválido');
    }

    return pagamento;
  }
}
