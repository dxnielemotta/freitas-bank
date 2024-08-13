import { Pagamento } from '../entities/pagamento.entity';

export interface IPagamentoRepository {
  cadastrarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  listarPagamentos(): Promise<Pagamento[]>;
}
