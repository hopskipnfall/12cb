import { TestBed } from '@angular/core/testing';

import { HistoryEncoderService } from './history-encoder.service';

describe('HistoryEncoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryEncoderService = TestBed.get(HistoryEncoderService);
    expect(service).toBeTruthy();
  });
});
