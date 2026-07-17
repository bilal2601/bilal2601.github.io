"use client";

import Link from "next/link";
import { useState } from "react";
import { propertyPhotos } from "../property-photos";

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : propertyPhotos[activeIndex];

  function movePhoto(direction: -1 | 1) {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + direction + propertyPhotos.length) % propertyPhotos.length;
    });
  }

  return (
    <main className="gallery-page">
      <header className="site-header gallery-page-header">
        <Link className="brand" href="/" aria-label="Villa Piedanlo home">
          <span className="brand-mark" aria-hidden="true">∿</span>
          <span>Villa Piedanlo</span>
        </Link>
        <nav aria-label="Gallery navigation"><Link href="/">Home</Link><Link href="/#amenities">Amenities</Link><Link href="/#location">Location</Link><Link href="/#contact">Contact</Link></nav>
        <Link className="nav-book gallery-home-link" href="/">Back home</Link>
      </header>

      <section
        className="gallery-page-hero"
        style={{ backgroundImage: `linear-gradient(105deg, rgba(23,50,71,0.96), rgba(23,50,71,0.62)), url("${propertyPhotos[0].large}")` }}
      >
        <p className="eyebrow">Villa Piedanlo · Trou aux Biches</p>
        <h1>The full gallery</h1>
        <p>Explore the real beachfront, garden, living spaces, bedrooms, kitchen, bathrooms and nearby surroundings.</p>
        <div className="photo-count"><strong>{propertyPhotos.length}</strong><span>real listing photos</span></div>
      </section>

      <section className="gallery-library" aria-label="Property photo gallery">
        <div className="gallery-filters" aria-label="Gallery status">
          <span className="active">All {propertyPhotos.length} photos</span>
          <span>Click any photo to enlarge</span>
        </div>
        <div className="full-gallery-grid">
          {propertyPhotos.map((photo, index) => (
            <button className={`full-photo photo-${index + 1}`} key={photo.src} type="button" onClick={() => setActiveIndex(index)}>
              <img src={photo.thumb} alt={photo.title} loading={index < 6 ? "eager" : "lazy"} />
              <span><strong>{index + 1}</strong><small>Villa Piedanlo</small></span>
            </button>
          ))}
        </div>
        <div className="gallery-ready-note">
          <p className="eyebrow">The actual house</p>
          <h2>See where you&apos;ll stay</h2>
          <p>These photos come from Villa Piedanlo&apos;s public Airbnb listing. For the highest photographer-original quality, the original files can still replace these Airbnb-served versions later.</p>
          <Link className="button button-primary" href="/">Return to the main page</Link>
        </div>
      </section>

      {activePhoto && activeIndex !== null && (
        <div className="photo-lightbox" role="presentation" onMouseDown={() => setActiveIndex(null)}>
          <div role="dialog" aria-modal="true" aria-label={activePhoto.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo">×</button>
            <button className="lightbox-prev" type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">‹</button>
            <img src={activePhoto.large} alt={activePhoto.title} />
            <button className="lightbox-next" type="button" onClick={() => movePhoto(1)} aria-label="Next photo">›</button>
            <p>{activePhoto.title} <span>{activeIndex + 1} of {propertyPhotos.length}</span></p>
          </div>
        </div>
      )}
    </main>
  );
}
