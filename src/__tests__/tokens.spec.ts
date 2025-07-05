import { describe, expect, it } from 'vitest';

import config from '../../tailwind.config';

describe('Design Tokens', () => {
  it('exposes primary colour', () => {
    expect(config.theme.extend.colors.primary).toBeDefined();
  });

  it('has all required design token colors', () => {
    const colors = config.theme.extend.colors;
    expect(colors.bg).toBeDefined();
    expect(colors.surface).toBeDefined();
    expect(colors.primary).toBeDefined();
    expect(colors.secondary).toBeDefined();
    expect(colors.border).toBeDefined();
    expect(colors.text.high).toBeDefined();
    expect(colors.text.low).toBeDefined();
  });

  it('has correct font families', () => {
    const fonts = config.theme.extend.fontFamily;
    expect(fonts.display).toEqual(['Cormorant Garamond', 'serif']);
    expect(fonts.body).toEqual(['Inter', 'ui-sans-serif', 'system-ui']);
  });
});
