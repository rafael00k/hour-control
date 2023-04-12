import { Test, TestingModule } from '@nestjs/testing';
import { TimeSheetController } from './timeSheet.controller';
import { TimeSheetService } from './timeSheet.service';

describe('TimeSheetController', () => {
  let controller: TimeSheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSheetController],
      providers: [TimeSheetService],
    }).compile();

    controller = module.get<TimeSheetController>(TimeSheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
