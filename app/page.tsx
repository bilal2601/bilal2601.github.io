"use client";

import { FormEvent, useRef, useState } from "react";
import { amenityCount, amenityGroups } from "./property-amenities";
import { propertyPhotos } from "./property-photos";

const WHATSAPP_NUMBER = "23057281705";
const BOOKING_EMAIL = "piedanlovilla@gmail.com";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4Zm-8.3 18.2h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.7-.8-2.8-1.5-4-3.4-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.1.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}

export default function Home() {
  const bookingRef = useRef<HTMLDivElement>(null);
  const [bookingNote, setBookingNote] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  function focusBooking() {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      bookingRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    }, 450);
  }

  function checkAvailability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const checkIn = String(formData.get("checkIn") ?? "");
    const checkOut = String(formData.get("checkOut") ?? "");
    const guests = String(formData.get("guests") ?? "");
    const message = `Hi Shaheen, I would like to check Villa Piedanlo for ${guests} guest${guests === "1" ? "" : "s"}, from ${checkIn} to ${checkOut}. Could you please confirm availability and the best direct rate?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setBookingNote("WhatsApp opened with your dates. Send the prepared message to Shaheen to check availability.");
  }

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const enquiry = String(formData.get("message") ?? "");
    const message = `Hi Shaheen, my name is ${name}. I have a Villa Piedanlo enquiry:\n\n${enquiry}\n\nMy email is ${email}.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setEnquiryOpen(false);
    setBookingNote("WhatsApp opened with your enquiry ready to send to Shaheen.");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Villa Piedanlo home">
          <span className="brand-mark" aria-hidden="true">∿</span>
          <span>Villa Piedanlo</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#stay">Stay</a>
          <a href="/gallery">Gallery</a>
          <a href="#amenities">Amenities</a>
          <a href="#location">Location</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="nav-book" type="button" onClick={focusBooking}>
          Book direct
        </button>
      </header>

      <section
        className="hero"
        id="top"
        aria-labelledby="hero-title"
        style={{ backgroundImage: `url("${propertyPhotos[0].large}"), linear-gradient(125deg, #d9ece9, #78c6ce)` }}
      >
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">One of Mauritius&apos; best beaches</p>
          <h1 id="hero-title">Villa<br />Piedanlo</h1>
          <span className="title-rule" aria-hidden="true" />
          <p className="hero-lead">Your own beachfront house on the calm lagoon of Trou aux Biches.</p>
          <p className="hero-proof">World&apos;s Leading Beach Destination 2011 · World Travel Awards</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={focusBooking}>
              Check availability <span aria-hidden="true">→</span>
            </button>
            <button className="button button-secondary" type="button" onClick={() => setEnquiryOpen(true)}>
              Send an enquiry
            </button>
          </div>
        </div>

        <div className="booking-card" ref={bookingRef}>
          <div className="booking-heading">
            <div>
              <p className="booking-kicker">Plan your stay</p>
              <h2>Check your dates</h2>
            </div>
            <span className="direct-badge">Direct booking</span>
          </div>
          <form onSubmit={checkAvailability}>
            <label>
              Check-in
              <input type="date" name="checkIn" required />
            </label>
            <label>
              Check-out
              <input type="date" name="checkOut" required />
            </label>
            <label>
              Guests
              <select name="guests" defaultValue="2" aria-label="Number of guests">
                {Array.from({ length: 6 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>
                ))}
              </select>
            </label>
            <button className="button button-primary booking-submit" type="submit">
              Check availability
            </button>
          </form>
          {bookingNote && <p className="form-note" role="status">{bookingNote}</p>}
          <p className="calendar-note">Your dates open in WhatsApp for Shaheen to confirm personally—no payment is taken.</p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Property highlights">
        <div><span aria-hidden="true">01</span><strong>Award-winning beach</strong><small>World&apos;s Leading Beach Destination 2011</small></div>
        <div><span aria-hidden="true">02</span><strong>Housekeeping included</strong><small>Scheduled twice per week</small></div>
        <div><span aria-hidden="true">03</span><strong>Guest favorite</strong><small>4.8 · 50 Airbnb reviews</small></div>
      </section>

      <section className="story-section" id="stay">
        <div className="section-heading">
          <p className="eyebrow">A better way to stay</p>
          <h2>One house.<br />One great beach.</h2>
        </div>
        <div className="story-copy">
          <p className="story-lead">Skip the big-hotel routine and stay together, right by the lagoon.</p>
          <p>Villa Piedanlo takes its name from the Mauritian Creole expression for having your feet in the water. Families and groups of up to six get three bedrooms, two bathrooms, an equipped kitchen, shared pool access, twice-weekly housekeeping and private access to Trou aux Biches beach.</p>
          <div className="feature-list">
            <div><strong>6 guests</strong><span>Maximum occupancy</span></div>
            <div><strong>3 bedrooms</strong><span>Three queen beds</span></div>
            <div><strong>2 bathrooms</strong><span>For an easy family stay</span></div>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">See the stay</p>
            <h2 id="gallery-title">Inside and out</h2>
          </div>
          <div className="gallery-intro-actions">
            <p>A quick look at the real house, with all 58 listing photos available in the complete gallery.</p>
            <a className="text-link" href="/gallery">View the full gallery <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-main">
            <img src={propertyPhotos[0].large} alt={propertyPhotos[0].title} />
            <figcaption>Beachfront living <span>Villa Piedanlo</span></figcaption>
          </figure>
          <figure>
            <img src={propertyPhotos[3].large} alt={propertyPhotos[3].title} />
            <figcaption>Three queen bedrooms <span>Villa Piedanlo</span></figcaption>
          </figure>
          <figure>
            <img src={propertyPhotos[2].large} alt={propertyPhotos[2].title} />
            <figcaption>Steps from the lagoon <span>Trou aux Biches</span></figcaption>
          </figure>
        </div>
        <a className="gallery-button button button-secondary" href="/gallery">Explore all photos <span aria-hidden="true">→</span></a>
      </section>

      <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="reviews-heading">
          <div>
            <p className="eyebrow">50 Airbnb reviews</p>
            <h2 id="reviews-title">A guest favorite<br />for a reason</h2>
          </div>
          <div className="rating-stamp" aria-label="Rated 4.8 out of 5 from 50 Airbnb reviews">
            <span>★★★★★</span>
            <strong>4.8 out of 5</strong>
            <small>50 Airbnb reviews · Guest favorite</small>
          </div>
        </div>
        <div className="review-grid">
          <article>
            <div className="review-person"><span className="review-avatar">A</span><div><strong>Andrea</strong><small>July 2026</small></div></div>
            <div className="review-stars" aria-label="Five stars">★★★★★</div>
            <blockquote>“The location is great, right on the beach!”</blockquote>
            <small>Airbnb guest</small>
          </article>
          <article>
            <div className="review-person"><span className="review-avatar">A</span><div><strong>Alison</strong><small>May 2026</small></div></div>
            <div className="review-stars" aria-label="Five stars">★★★★★</div>
            <blockquote>“The location of this property is special.”</blockquote>
            <small>Airbnb guest</small>
          </article>
          <article>
            <div className="review-person"><span className="review-avatar">F</span><div><strong>Flavie</strong><small>February 2026</small></div></div>
            <div className="review-stars" aria-label="Five stars">★★★★★</div>
            <blockquote>“Everything was perfect. We loved our stay here.”</blockquote>
            <small>Airbnb guest</small>
          </article>
        </div>
        <div className="review-source-row">
          <p className="review-disclaimer">Short excerpts from public five-star Airbnb reviews.</p>
          <a className="text-link" href="https://www.airbnb.com/rooms/762937412271949593/reviews" target="_blank" rel="noreferrer">Read all 50 reviews on Airbnb <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="amenities-section" id="amenities" aria-labelledby="amenities-title">
        <div className="amenities-intro">
          <p className="eyebrow">Included in your stay</p>
          <h2 id="amenities-title">More than a<br />hotel room</h2>
          <p>Beach and pool access, your own kitchen, flexible arrival and housekeeping scheduled twice per week.</p>
        </div>
        <div className="amenity-grid">
          <article><span>01</span><h3>Private beach access</h3><p>Step from the house directly toward the beachfront lagoon.</p></article>
          <article><span>02</span><h3>Shared pool access</h3><p>A refreshing pool shared with the villa behind the house.</p></article>
          <article><span>03</span><h3>Equipped kitchen</h3><p>Prepare relaxed breakfasts, family meals and drinks at home.</p></article>
          <article><span>04</span><h3>Wi-Fi</h3><p>Stay connected throughout your visit.</p></article>
          <article className="amenity-featured"><span>05</span><h3>Housekeeping included</h3><p>Housekeeping service is included, with visits scheduled twice per week.</p></article>
          <article className="amenity-featured"><span>06</span><h3>Flexible check-in</h3><p>Enjoy an assisted welcome when available, or secure self check-in through the lockbox.</p></article>
          <article><span>07</span><h3>Ocean and garden views</h3><p>Enjoy the coastal setting from both inside and outside the house.</p></article>
          <article><span>08</span><h3>Space for six</h3><p>Three queen bedrooms and two bathrooms keep everyone together comfortably.</p></article>
          <article className="amenity-featured"><span>09</span><h3>Parking for up to two cars</h3><p>Keep up to two cars securely parked inside the property grounds.</p></article>
          <article className="amenity-featured"><span>10</span><h3>Automatic gate</h3><p>Enter the premises through a remote-controlled automatic gate.</p></article>
        </div>
        <details className="all-amenities">
          <summary>See all {amenityCount} listed amenities <span aria-hidden="true">＋</span></summary>
          <div className="all-amenities-grid">
            {amenityGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
          <div className="safety-note">
            <strong>Important property information</strong>
            <p>Exterior security cameras are present. The property is near a body of water and the pool has no gate or lock. The Airbnb listing marks a carbon monoxide alarm and heating as unavailable.</p>
          </div>
        </details>
      </section>

      <section className="location-section" id="location" aria-labelledby="location-title">
        <div className="location-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(12,38,52,0.08), rgba(12,38,52,0.5)), url("${propertyPhotos[1].large}")` }}>
          <div className="location-place-label">
            <span>North-west coast</span>
            <strong>Trou aux Biches</strong>
            <small>Mauritius</small>
          </div>
        </div>
        <div className="location-copy">
          <p className="eyebrow">One of Mauritius&apos; best beaches</p>
          <h2 id="location-title">Trou aux Biches<br />earns the hype</h2>
          <p>Frequently described as one of Mauritius&apos; best beaches, Trou aux Biches is loved for its beautiful lagoon, snorkelling, diving, long walks and west-facing sunsets.</p>
          <div className="beach-proof-grid">
            <a href="https://mauritiusnow.com/blog/things-to-do/trou-aux-biches-beach/" target="_blank" rel="noreferrer">
              <strong>One of the island&apos;s best beaches</strong>
              <span>Mauritius Now · Official tourism site ↗</span>
            </a>
            <a href="https://www.worldtravelawards.com/award-worlds-leading-beach-destination-2011" target="_blank" rel="noreferrer">
              <strong>World&apos;s Leading Beach Destination 2011</strong>
              <span>World Travel Awards ↗</span>
            </a>
          </div>
          <div className="location-note">
            <strong>Find Villa Piedanlo on Google Maps</strong>
            <span>Villa Piedanlo is publicly listed in Trou aux Biches, Mauritius.</span>
            <a
              className="location-map-link"
              href="https://www.google.com/maps/search/?api=1&query=Villa+Piedanlo%2C+Trou+aux+Biches%2C+Mauritius"
              target="_blank"
              rel="noreferrer"
            >
              <img className="google-maps-logo" src="/google-maps-icon.svg" alt="" aria-hidden="true" />
              <span>Open Google Maps</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="nearby-section" aria-labelledby="nearby-title">
        <div className="nearby-heading">
          <p className="eyebrow">Everything within reach</p>
          <h2 id="nearby-title">Beach, groceries, pizza<br />and car hire—right here.</h2>
          <p>Open the gate, cross Coastal Road and you are already beside everyday essentials and one of Trou aux Biches&apos; best-known pizzerias, with car-rental options only minutes away.</p>
        </div>
        <div className="nearby-grid">
          <article>
            <span className="nearby-distance">Across the road · About 1 minute</span>
            <h3>Chez Popo / GSR Supermarket</h3>
            <p>Pick up groceries, drinks and everyday essentials without needing to drive.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Chez+Popo+Supermarket%2C+Trou+aux+Biches%2C+Mauritius" target="_blank" rel="noreferrer">Find on Google Maps <span aria-hidden="true">↗</span></a>
          </article>
          <article>
            <span className="nearby-distance">Beside the supermarket</span>
            <h3>La Voglia Matta</h3>
            <p>Also known as Chez Marco, this well-known Italian pizzeria makes an easy meal steps from home.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Voglia+Matta%2C+Trou+aux+Biches%2C+Mauritius" target="_blank" rel="noreferrer">Find on Google Maps <span aria-hidden="true">↗</span></a>
          </article>
          <article className="nearby-parking">
            <span className="nearby-distance">Inside the premises</span>
            <h3>Secure parking for up to two cars</h3>
            <p>Drive in through the remote-controlled automatic gate and park on the property.</p>
            <span className="nearby-included">Included with your stay</span>
          </article>
          <article>
            <span className="nearby-distance">Only minutes away</span>
            <h3>Car rental nearby</h3>
            <p>Several car-rental options are close to Villa Piedanlo, making it easy to explore Mauritius at your own pace.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=car+rental+near+Villa+Piedanlo%2C+Trou+aux+Biches%2C+Mauritius" target="_blank" rel="noreferrer">Explore nearby options <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="value-section" aria-labelledby="value-title">
        <div className="value-heading">
          <p className="eyebrow">A smarter beach stay</p>
          <h2 id="value-title">Why pay for<br />several hotel rooms?</h2>
        </div>
        <div className="value-copy">
          <p className="value-lead">Stay together in one beachfront home—and spend more of the holiday enjoying Mauritius.</p>
          <p>Villa Piedanlo brings the essentials into one stay: three bedrooms for up to six guests, two bathrooms, a kitchen, shared pool access, private beach access and housekeeping twice per week.</p>
          <div className="value-points" aria-label="Value highlights">
            <span>Whole home</span>
            <span>Up to 6 guests</span>
            <span>Housekeeping included</span>
            <span>Beachfront</span>
          </div>
          <button className="button button-primary" type="button" onClick={focusBooking}>Check your dates <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="book-your-way" aria-labelledby="book-way-title">
        <div className="book-way-heading">
          <p className="eyebrow">Choose what feels right</p>
          <h2 id="book-way-title">Book your way</h2>
          <p>Direct booking gives the best connection with the host. Guests who feel safer using a familiar platform can still find Villa Piedanlo there.</p>
        </div>
        <div className="booking-choice-grid">
          <article className="direct-choice">
            <span className="choice-label">Best connection with the host</span>
            <h3>Book directly</h3>
            <p>Send your dates directly to Shaheen on WhatsApp, receive the best direct rate and confirm availability personally.</p>
            <button className="button button-primary" type="button" onClick={focusBooking}>Check availability <span aria-hidden="true">→</span></button>
          </article>
          <article>
            <span className="choice-label">Familiar platform</span>
            <h3>Continue on Airbnb</h3>
            <p>View the existing listing, guest reviews and book through your Airbnb account.</p>
            <a className="platform-link" href="https://www.airbnb.com/rooms/762937412271949593" target="_blank" rel="noreferrer">View on Airbnb <span aria-hidden="true">↗</span></a>
          </article>
          <article>
            <span className="choice-label">Familiar platform</span>
            <h3>Continue on Booking.com</h3>
            <p>Open the Booking.com listing and complete the reservation there instead.</p>
            <a className="platform-link" href="https://www.booking.com/hotel/mu/piedanlo-trou-aux-biches-beach-house.html" target="_blank" rel="noreferrer">View on Booking.com <span aria-hidden="true">↗</span></a>
          </article>
        </div>
        <p className="platform-note">Prefer a familiar platform? Both current listings open securely in a new tab.</p>
      </section>

      <section className="booking-process" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow">Simple and direct</p>
          <h2 id="process-title">How direct enquiries work</h2>
          <p>A simple request-to-book process gives every guest a personal answer before anything is confirmed.</p>
        </div>
        <div className="process-grid">
          <article><span>1</span><h3>Choose dates</h3><p>Select your preferred dates and the number of people staying.</p></article>
          <article><span>2</span><h3>Message Shaheen</h3><p>Your details open in WhatsApp as a prepared availability request.</p></article>
          <article><span>3</span><h3>Confirm your stay</h3><p>Shaheen checks the calendars and replies with availability and the best direct rate.</p></article>
        </div>
        <button className="button button-primary" type="button" onClick={focusBooking}>Check your dates <span aria-hidden="true">→</span></button>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">A personal welcome</p>
          <h2>Meet your host,<br />Shaheen</h2>
        </div>
        <div className="contact-copy">
          <p>Ask Shaheen directly about dates, longer stays, arrival times, families or anything else before you book.</p>
          <div className="contact-actions">
            <a className="button whatsapp-button" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Shaheen, I'm interested in staying at Villa Piedanlo.")}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <a className="button email-button" href={`mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent("Villa Piedanlo enquiry")}`}>Email Shaheen</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top">Villa Piedanlo</a>
        <div><a href="#stay">The stay</a><a href="/gallery">Gallery</a><a href="#amenities">Amenities</a><a href="#location">Location</a></div>
        <p>Villa Piedanlo · Trou aux Biches, Mauritius · <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a></p>
      </footer>

      {enquiryOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setEnquiryOpen(false)}>
          <section className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setEnquiryOpen(false)} aria-label="Close enquiry form">×</button>
            <p className="eyebrow">Talk to Shaheen</p>
            <h2 id="enquiry-title">Send an enquiry</h2>
            <p>Perfect for longer stays, special requests or questions before booking.</p>
            <form onSubmit={sendEnquiry}>
              <label>Your name<input type="text" name="name" required /></label>
              <label>Email address<input type="email" name="email" required /></label>
              <label className="wide">Message<textarea name="message" rows={4} required /></label>
              <button className="button whatsapp-button wide" type="submit"><WhatsAppIcon /> Continue on WhatsApp</button>
            </form>
          </section>
        </div>
      )}

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Shaheen, I'm interested in Villa Piedanlo.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Shaheen on WhatsApp"
      >
        <WhatsAppIcon />
        <span>Chat with Shaheen</span>
      </a>
    </main>
  );
}
