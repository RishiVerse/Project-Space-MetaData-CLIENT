import { Wrench } from 'lucide-react';

export function DevelopmentMessage() {
  return (
    <aside className="development-message" aria-label="Development notice">
      <Wrench size={14} aria-hidden="true" />
      <span>We are constantly building and developing SpaceMetadata. New tools and improvements are added regularly.</span>
    </aside>
  );
}
