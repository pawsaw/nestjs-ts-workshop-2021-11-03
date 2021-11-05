import { Test, TestingModule } from '@nestjs/testing';
import { MockPublisherService } from './mock-publisher.service';

describe('MockPublisherService', () => {
  let service: MockPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockPublisherService],
    }).compile();

    service = module.get<MockPublisherService>(MockPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
