import { Gerente } from '../entities/gerente.entity';

export interface IGerenteRepository {
  listarGerentes(): Promise<Gerente[]>;
  buscarPorId(id: string): Promise<Gerente | null>;
  cadastrar(gerente: Gerente): Promise<Gerente>;
  excluir(id: string): Promise<boolean>;
}
