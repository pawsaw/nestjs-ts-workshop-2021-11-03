import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { MockPublisherService } from './mock-publisher.service';

@Module({
  controllers: [PublisherController],
  providers: [
    {
      provide: PublisherService,
      useFactory: () => {
        return new MockPublisherService();
      },
    },
  ],
})
export class PublisherModule {}
