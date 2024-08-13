import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../domain/entities/gerente.entity';
import { IGerenteRepository } from 'src/domain/interfaces/gerente.repository.interface';

@Injectable()
export class GerenteRepository implements IGerenteRepository {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async listarGerentes(): Promise<Gerente[]> {
    // SELECT * FROM gerentes
    return await this.gerenteRepository.find();
  }

  async buscarPorId(id: string): Promise<Gerente | null> {
    // SELECT * FROM gerentes WHERE id = ?;
    return await this.gerenteRepository.findOne({
      where: { id },
    });
  }

  async cadastrar(gerente: Gerente): Promise<Gerente> {
    // INSERT INTO gerentes
    return await this.gerenteRepository.save(gerente);
  }

  async excluir(id: string): Promise<boolean> {
    const result = await this.gerenteRepository.delete(id);
    return result.affected > 0;
  }
}
