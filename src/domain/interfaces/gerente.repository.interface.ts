import { Cliente } from '../entities/cliente.entity';
import { Conta } from '../entities/conta.entity';
import { Gerente } from '../entities/gerente.entity';
import { TipoConta } from '../enums/tipo-conta.enum';

export interface IGerenteRepository {
  listarGerentes(): Promise<Gerente[]>;
  buscarPorId(id: string): Promise<Gerente | null>;
  cadastrar(gerente: Gerente): Promise<Gerente>;
  excluir(id: string): Promise<boolean>;
}
