import { Controller, Param, Post } from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post(':clienteID/corrente')
  criarContaCorrente(@Param('clienteID') clienteID: string): void {
    this.contaService.criarContaCorrente(clienteID);
  }

  @Post(':clienteID/poupanca')
  criarContaPoupanca(@Param('clienteID') clienteID: string): void {
    this.contaService.criarContaPoupanca(clienteID);
  }
}
