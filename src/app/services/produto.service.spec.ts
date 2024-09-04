import { TestBed } from '@angular/core/testing';

import { produtoService } from './produto.service';

describe('ProdutoService', () => {
  let service: produtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(produtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
