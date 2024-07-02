import { Module, forwardRef } from '@nestjs/common';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';

@Module({
  imports: [ClienteModule],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
