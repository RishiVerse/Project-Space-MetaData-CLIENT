import { useEffect, useState } from 'react';
import { useFlags } from '@flagsmith/flagsmith/react';
import { AtlasSection } from './components/AtlasSection';
import { BuildSatellitePage } from './components/BuildSatellitePage';
import { DevelopmentMessage } from './components/DevelopmentMessage';
import { Footer } from './components/Footer';
import { FeaturedVideo } from './components/FeaturedVideo';
import { GearPage } from './components/GearPage';
import { GearSection } from './components/GearSection';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ObservationGuides } from './components/ObservationGuides';
import { FEATURE_FLAGS, isFlagEnabled, ROLLOUT_FLAG_KEYS } from './config/featureFlags';
import { useAtlasSearch } from './hooks/useAtlasSearch';
import { cosmicImageRepository } from './services/cosmicImageRepository';

export default function App() {
  const atlas = useAtlasSearch(cosmicImageRepository);
  const flags = useFlags(ROLLOUT_FLAG_KEYS);
  const [route, setRoute] = useState(window.location.hash);
  const creatorHubEnabled = isFlagEnabled(flags, FEATURE_FLAGS.CREATOR_HUB);
  const buildSatelliteEnabled = isFlagEnabled(flags, FEATURE_FLAGS.BUILD_YOUR_SATELLITE);
  const homepageSearchEnabled = isFlagEnabled(flags, FEATURE_FLAGS.HOMEPAGE_SEARCH_BAR);
  const homepageVideoEnabled = isFlagEnabled(flags, FEATURE_FLAGS.HOMEPAGE_VIDEO_1);
  const spaceGearEnabled = isFlagEnabled(flags, FEATURE_FLAGS.SPACE_GEAR);
  const developmentMessageEnabled = isFlagEnabled(flags, FEATURE_FLAGS.DEVELOPMENT_MESSAGE);
  const socialMediaEnabled = isFlagEnabled(flags, FEATURE_FLAGS.SOCIAL_MEDIA);
  const heroBackgroundEnabled = isFlagEnabled(flags, FEATURE_FLAGS.HERO_BACKGROUND_IMAGE);
  const isBuildSatellitePage = creatorHubEnabled && buildSatelliteEnabled && route === '#build-your-satellite';
  const isGearPage = spaceGearEnabled && (route === '#gear' || route.startsWith('#gear-'));

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    if (isBuildSatellitePage || !route) return;

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(route)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isBuildSatellitePage, isGearPage, route]);

  useEffect(() => {
    document.title = isGearPage
      ? 'Space Gear Guide | SpaceMetadata'
      : 'SpaceMetadata | Explore Public Space Imagery';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      'content',
      isGearPage
        ? 'Learn how to choose astronomy equipment and browse featured astronomy products.'
        : spaceGearEnabled
          ? 'Explore public space imagery, understand mission metadata, read observing guides, and discover astronomy equipment.'
          : 'Explore public space imagery, understand mission metadata, and read approachable observing guides.',
    );
  }, [isGearPage, spaceGearEnabled]);

  return (
    <div className={developmentMessageEnabled ? 'app has-development-message' : 'app'}>
      {developmentMessageEnabled ? <DevelopmentMessage /> : null}
      <Header
        route={route || '#top'}
        spaceGearEnabled={spaceGearEnabled}
        socialMediaEnabled={socialMediaEnabled}
      />
      {isBuildSatellitePage ? (
        <BuildSatellitePage />
      ) : isGearPage ? (
        <GearPage />
      ) : (
        <main>
          <Hero
            atlas={atlas}
            showBackgroundImage={heroBackgroundEnabled}
            showGearLink={spaceGearEnabled}
            showSearch={homepageSearchEnabled}
            showVideo={homepageVideoEnabled}
          />
          <AtlasSection atlas={atlas} />
          {spaceGearEnabled ? <GearSection showBrowseLink /> : null}
          <ObservationGuides />
          {!homepageVideoEnabled ? <FeaturedVideo /> : null}
        </main>
      )}
      <Footer spaceGearEnabled={spaceGearEnabled} />
    </div>
  );
}
