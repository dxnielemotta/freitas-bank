import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from 'src/domain/entities/pagamento.entity';

@Injectable()
export class PagamentoRepository {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,
  ) {}

  async cadastrarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.save(pagamento);
  }

  async listarPagamentos(): Promise<Pagamento[]> {
    return await this.pagamentoRepository.find({ relations: ['conta'] });
  }
}
