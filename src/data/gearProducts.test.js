import { describe, expect, it } from 'vitest';
import { AMAZON_ASSOCIATE_ID, gearProducts } from './gearProducts';

describe('gear product catalog', () => {
  const suppliedProducts = gearProducts.filter((product) => product.id.startsWith('featured-product-'));

  it('preserves the supplied Amazon affiliate configuration', () => {
    expect(AMAZON_ASSOCIATE_ID).toBe('spacemetadata-21');
    expect(suppliedProducts.map((product) => product.affiliateUrl)).toEqual([
      'https://link.amazon/B0hxVaaSp',
      'https://link.amazon/B04oN3YZ7',
      'https://link.amazon/B0avus0y1',
    ]);
  });

  it('does not invent unverified product categories or images', () => {
    expect(suppliedProducts).toHaveLength(3);
    suppliedProducts.forEach((product) => {
      expect(product.category).toBeNull();
      expect(product.imageUrl).toBeNull();
    });
  });
});
