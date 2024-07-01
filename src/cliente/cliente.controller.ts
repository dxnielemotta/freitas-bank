import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  listarClientes(): Cliente[] {
    return this.clienteService.listarClientes();
  }

  @Post('cadastrar')
  cadastrarCliente(@Body() cliente: Cliente): void {
    this.clienteService.cadastrarCliente(cliente);
  }
}
