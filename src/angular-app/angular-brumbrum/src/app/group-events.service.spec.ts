import { TestBed } from '@angular/core/testing';

import { GroupEventService } from './group-events.service';

describe('GroupEventsService', () => {
  let service: GroupEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
