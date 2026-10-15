import { describe, expect, it } from 'vitest';
import { FEATURE_FLAGS, flagsmithOptions, isFlagEnabled, ROLLOUT_FLAG_KEYS } from './featureFlags';

describe('feature flag registry', () => {
  it('keeps rollout keys centralized and registered with Flagsmith', () => {
    expect(ROLLOUT_FLAG_KEYS).toEqual(expect.arrayContaining([
      'homepage_search_bar',
      'homwpage_video_1',
      'space_gear',
      'development_message',
      'social_media',
    ]));

    ROLLOUT_FLAG_KEYS.forEach((flagName) => {
      expect(flagsmithOptions.defaultFlags[flagName]).toEqual({ enabled: false });
    });
  });

  it('only treats explicitly enabled flags as active', () => {
    expect(isFlagEnabled({ [FEATURE_FLAGS.SPACE_GEAR]: { enabled: true } }, FEATURE_FLAGS.SPACE_GEAR)).toBe(true);
    expect(isFlagEnabled({}, FEATURE_FLAGS.SPACE_GEAR)).toBe(false);
    expect(isFlagEnabled(undefined, FEATURE_FLAGS.SPACE_GEAR)).toBe(false);
  });
});
