import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftEntity } from '@/pages/draft/entities/draft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DraftEntity])],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
