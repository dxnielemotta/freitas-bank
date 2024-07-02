import { Controller, Post, Body, Param } from '@nestjs/common';
import { GerenteService } from './gerente.service';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  criarGerente(@Body('nome') nome: string): void {
    this.gerenteService.criarGerente(nome);
  }

  @Post(':id/clientes')
  adicionarCliente(
    @Param('id') id: string,
    @Body('nomeCompleto') nomeCompleto: string,
    @Body('endereco') endereco: string,
    @Body('telefone') telefone: string,
    @Body('rendaSalarial') rendaSalarial: number,
  ): void {
    this.gerenteService.adicionarCliente(
      id,
      nomeCompleto,
      endereco,
      telefone,
      rendaSalarial,
    );
  }
}
