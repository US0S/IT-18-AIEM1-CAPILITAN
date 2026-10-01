import { Test, TestingModule } from '@nestjs/testing';
import { RemarksService } from './remarks.service';
import { RemarksController } from './remarks.controller';

describe('RemarksController', () => {
  let controller: RemarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemarksController],
      providers: [RemarksService],
    }).compile();

    controller = module.get<RemarksController>(RemarksController);
  });
});

describe('RemarksService', () => {
  let service: RemarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemarksService],
    }).compile();

    service = module.get<RemarksService>(RemarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
