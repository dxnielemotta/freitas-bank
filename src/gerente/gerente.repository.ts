import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from './gerente.entity';

@Injectable()
export class GerenteRepository {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
  ) {}

  async findAll(): Promise<Gerente[]> {
    // SELECT * FROM gerentes
    return await this.gerenteRepository.find({
      relations: ['clientes'],
    });
  }

  async findById(id: string): Promise<Gerente | null> {
    // SELECT * FROM gerentes WHERE id = ?;
    return this.gerenteRepository.findOne({
      where: { id },
      relations: ['clientes'],
    });
  }

  async save(gerente: Gerente): Promise<Gerente> {
    // INSERT INTO gerentes
    return await this.gerenteRepository.save(gerente);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.gerenteRepository.delete(id);
    return result.affected > 0;
  }
}
