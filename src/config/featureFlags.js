const environmentId = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID?.trim();
const realtimeEnabled = import.meta.env.VITE_FLAGSMITH_REALTIME === 'true';

export const FEATURE_FLAGS = Object.freeze({
  HERO_BACKGROUND_IMAGE: 'rishabh_profile_image',
  HOMEPAGE_SEARCH_BAR: 'homepage_search_bar',
  HOMEPAGE_VIDEO_1: 'homwpage_video_1',
  SPACE_GEAR: 'space_gear',
  DEVELOPMENT_MESSAGE: 'development_message',
  CREATOR_HUB: 'creator_hub',
  BUILD_YOUR_SATELLITE: 'build_your_satellite',
});

export const ROLLOUT_FLAG_KEYS = Object.freeze(Object.values(FEATURE_FLAGS));

export const isFlagEnabled = (flags, flagName) => flags?.[flagName]?.enabled === true;

export const flagsmithOptions = Object.freeze({
  environmentID: environmentId || 'local-defaults',
  preventFetch: !environmentId,
  realtime: Boolean(environmentId) && realtimeEnabled,
  defaultFlags: {
    ranjana_profile_image: { enabled: false },
    [FEATURE_FLAGS.HERO_BACKGROUND_IMAGE]: { enabled: false },
    [FEATURE_FLAGS.HOMEPAGE_SEARCH_BAR]: { enabled: false },
    [FEATURE_FLAGS.HOMEPAGE_VIDEO_1]: { enabled: false },
    [FEATURE_FLAGS.SPACE_GEAR]: { enabled: false },
    [FEATURE_FLAGS.DEVELOPMENT_MESSAGE]: { enabled: false },
    [FEATURE_FLAGS.CREATOR_HUB]: { enabled: false },
    [FEATURE_FLAGS.BUILD_YOUR_SATELLITE]: { enabled: false },
    buy_space_stuff: { enabled: false },
    courses: { enabled: false },
    research_paper: { enabled: false },
  },
});
