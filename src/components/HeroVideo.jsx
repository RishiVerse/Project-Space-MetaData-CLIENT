const HOMEPAGE_VIDEO_ID = '_XEIXeSBi44';

export function HeroVideo() {
  return (
    <div className="hero-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${HOMEPAGE_VIDEO_ID}`}
        title="Featured SpaceMetadata YouTube Short"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
