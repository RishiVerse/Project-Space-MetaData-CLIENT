import { ExternalLink, Play } from 'lucide-react';

const VIDEO_ID = 'gUt1hR8NpX8';

export function FeaturedVideo() {
  return (
    <section className="featured-video" aria-labelledby="featured-video-title">
      <div className="page-shell featured-video-layout">
        <div className="featured-video-copy">
          <p className="eyebrow">FEATURED VIDEO</p>
          <h2 id="featured-video-title">See space in motion.</h2>
          <p>Take a quick visual detour with this featured short, then keep exploring the cosmic archive.</p>
          <a
            className="featured-video-link"
            href={`https://www.youtube.com/shorts/${VIDEO_ID}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="featured-video-frame">
          <div className="featured-video-badge">
            <Play size={14} fill="currentColor" aria-hidden="true" />
            YouTube Short
          </div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="Cosmic Research featured YouTube Short"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
