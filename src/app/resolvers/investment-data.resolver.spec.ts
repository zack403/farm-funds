import { TestBed } from '@angular/core/testing';

import { InvestmentDataResolver } from './investment-data.resolver';

describe('InvestmentDataResolver', () => {
  let resolver: InvestmentDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InvestmentDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
