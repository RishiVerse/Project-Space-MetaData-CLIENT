import { ArrowUpRight } from 'lucide-react';
import { memo } from 'react';

const HOMEPAGE_VIDEO_ID = '_XEIXeSBi44';

export const HeroVideo = memo(function HeroVideo() {
  return (
    <aside className="hero-video-panel" aria-label="Featured Cosmic Research video">
      <div className="hero-video-label">
        <span>Cosmic Short</span>
        <span aria-hidden="true">01</span>
      </div>
      <div className="hero-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${HOMEPAGE_VIDEO_ID}`}
          title="What was before the Big Bang?"
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a
        className="hero-video-caption"
        href={`https://www.youtube.com/shorts/${HOMEPAGE_VIDEO_ID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span><strong>What was before the Big Bang?</strong> Watch the latest question from Cosmic Research.</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </aside>
  );
});
