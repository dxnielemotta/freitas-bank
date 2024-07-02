import {
  Controller,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post(':clienteID/corrente')
  criarContaCorrente(@Param('clienteID') clienteID: string) {
    try {
      this.contaService.criarContaCorrente(clienteID);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta corrente criada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':clienteID/poupanca')
  criarContaPoupanca(@Param('clienteID') clienteID: string) {
    try {
      this.contaService.criarContaPoupanca(clienteID);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta poupança criada com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
