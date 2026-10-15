import { describe, expect, it } from 'vitest';
import { getCardImageUrl } from './imageUrl';

describe('getCardImageUrl', () => {
  it('uses the smaller NASA image variant for atlas cards', () => {
    expect(getCardImageUrl('https://images-assets.nasa.gov/image/ID/ID~large.jpg'))
      .toBe('https://images-assets.nasa.gov/image/ID/ID~medium.jpg');
    expect(getCardImageUrl('https://images-assets.nasa.gov/image/ID/ID~large.jpeg?download=1'))
      .toBe('https://images-assets.nasa.gov/image/ID/ID~medium.jpeg?download=1');
  });

  it('leaves unrelated image URLs unchanged', () => {
    const url = 'https://example.com/cosmic-image.png';
    expect(getCardImageUrl(url)).toBe(url);
    expect(getCardImageUrl(null)).toBe('');
  });
});
