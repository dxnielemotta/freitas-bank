import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../domain/entities/conta.entity';
import { TipoConta } from 'src/domain/enums/tipo-conta.enum';
import { ContaFactory } from '../../domain/factories/conta.factory';
import { IContaRepository } from 'src/domain/interfaces/conta.repository.interface';
import { Cliente } from 'src/domain/entities/cliente.entity';

@Injectable()
export class ContaRepository implements IContaRepository {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async listarContas(): Promise<Conta[]> {
    // SELECT * FROM contas
    return await this.contaRepository.find({
      relations: ['cliente', 'pagamentos'],
    });
  }

  async buscarPorId(id: string): Promise<Conta | null> {
    // SELECT * FROM contas WHERE id = ?;
    return await this.contaRepository.findOne({
      where: { id },
      relations: ['cliente', 'pagamentos'],
    });
  }

  async cadastrarConta(tipo: TipoConta, cliente: Cliente): Promise<Conta> {
    // INSERT INTO conta
    const conta = ContaFactory.criarConta(tipo, cliente);
    return await this.contaRepository.save(conta);
  }

  async excluirConta(contaId: string): Promise<boolean> {
    const result = await this.contaRepository.delete(contaId);
    return result.affected > 0;
  }

  async atualizarConta(conta: Conta): Promise<Conta> {
    return await this.contaRepository.save(conta);
  }
}
