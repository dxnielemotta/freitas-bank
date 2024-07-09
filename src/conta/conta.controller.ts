import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('contas')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Get('/')
  listarContas() {
    try {
      const contas = this.contaService.listarContas();
      return {
        statusCode: HttpStatus.OK,
        message: 'Contas retornadas com sucesso',
        data: contas,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get(':id')
  obterContaPorId(@Param('id') contaID: string) {
    try {
      const conta = this.contaService.obterContaPorId(contaID);
      if (!conta) {
        throw new Error('Conta não encontrada');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta retornada com sucesso',
        data: conta,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
