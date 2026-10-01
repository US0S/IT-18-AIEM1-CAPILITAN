import { Test, TestingModule } from '@nestjs/testing';
import { AdvisersService } from './advisers.service';

describe('AdvisersService', () => {
  let service: AdvisersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvisersService],
    }).compile();

    service = module.get<AdvisersService>(AdvisersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
