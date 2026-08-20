import { AtlasSection } from './components/AtlasSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { useAtlasSearch } from './hooks/useAtlasSearch';
import { useHealthCheck } from './hooks/useHealthCheck';
import { cosmicImageRepository } from './services/cosmicImageRepository';

export default function App() {
  const atlas = useAtlasSearch(cosmicImageRepository);
  const health = useHealthCheck(cosmicImageRepository);

  return (
    <>
      <Header healthStatus={health.status} />
      <main>
        <Hero
          query={atlas.query}
          setQuery={atlas.setQuery}
          onSearch={atlas.search}
          isLoading={atlas.isLoading}
        />
        <AtlasSection atlas={atlas} />
        <ProjectRoadmap />
      </main>
      <Footer />
    </>
  );
}
