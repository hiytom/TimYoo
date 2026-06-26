import React from 'react';
import AnimatedSection from '../AnimatedSection';
import { siteData } from '../../data/siteData';
import { toDomId } from '../../utils/domId';

type GalleryImage = {
  src: string;
  alt: string;
};

interface GallerySectionProps {
  id: string;
  number: string;
  title: string;
  images: readonly GalleryImage[];
  summary: string;
  reverse?: boolean;
  delay?: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  id,
  number,
  title,
  images,
  summary,
  reverse = false,
  delay = 0,
}) => {
  const heroImage = images[0];
  const supportingImages = images.slice(1, 7);
  const remainingImages = images.slice(7);
  const isTwoImageSection = images.length === 2;
  const isFactoryPeopleSection = id === 'about-timeline-factory-people';

  if (isFactoryPeopleSection) {
    const mainImage = images[0];
    const smallImages = images.slice(1);

    return (
      <AnimatedSection id={id} direction="up" delay={delay}>
        <section className="grid gap-6 py-10 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:order-2 lg:col-span-4 lg:self-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{number}</span>
            <h3 className="mt-3 text-3xl font-bold text-gray-950">{title}</h3>
            <p className="mt-4 max-w-sm text-base leading-7 text-gray-600">{summary}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(220px,0.9fr)_minmax(0,1.1fr)] lg:order-1 lg:col-span-8">
            <figure
              id={toDomId(`${id}-image`, 1)}
              className="group overflow-hidden bg-gray-100 shadow-sm"
            >
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="aspect-[3/4] h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </figure>

            <div className="grid grid-cols-2 gap-3">
              {smallImages.map((image, index) => (
                <figure
                  id={toDomId(`${id}-image`, index + 2)}
                  key={image.src}
                  className="group overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[3/4] h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id={id} direction="up" delay={delay}>
      <section className="grid gap-6 py-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className={`lg:col-span-4 ${reverse ? 'lg:order-2' : ''}`}>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{number}</span>
          <h3 className="mt-3 text-3xl font-bold text-gray-950">{title}</h3>
          <p className="mt-4 max-w-sm text-base leading-7 text-gray-600">{summary}</p>
        </div>

        <div className={`lg:col-span-8 ${reverse ? 'lg:order-1' : ''}`}>
          {isTwoImageSection ? (
            <div className="grid gap-3 md:grid-cols-2">
              {images.map((image, index) => (
                <figure
                  id={toDomId(`${id}-image`, index + 1)}
                  key={image.src}
                  className="group overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-6">
              <figure
                id={toDomId(`${id}-image`, 1)}
                className="group overflow-hidden bg-gray-100 shadow-sm sm:col-span-4"
              >
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="aspect-[16/11] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>

              <div className="grid grid-cols-1 gap-3 sm:col-span-2">
                {supportingImages.slice(0, 3).map((image, index) => (
                  <figure
                    id={toDomId(`${id}-image`, index + 2)}
                    key={image.src}
                    className="group overflow-hidden bg-gray-100 shadow-sm"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-[16/11]"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>

              {supportingImages.slice(3, 6).map((image, index) => (
                <figure
                  id={toDomId(`${id}-image`, index + 5)}
                  key={image.src}
                  className="group hidden overflow-hidden bg-gray-100 shadow-sm sm:col-span-2 sm:block"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}

          {!isTwoImageSection && remainingImages.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {remainingImages.map((image, index) => (
                <figure
                  id={toDomId(`${id}-image`, index + 8)}
                  key={image.src}
                  className="group overflow-hidden bg-gray-100 shadow-sm"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  );
};

const TimelineSection: React.FC = () => {
  const { timeline } = siteData.aboutSection;

  return (
    <div id="about-timeline" className="bg-white py-14 md:py-20">
      <div id="about-timeline-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection id="about-timeline-header" className="mb-10 max-w-3xl md:mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">About TimYoo</span>
          <h2 id="about-timeline-title" className="mt-3 text-3xl font-bold text-gray-950 md:text-5xl">
            {timeline.title}
          </h2>
          <p id="about-timeline-description" className="mt-4 text-lg leading-relaxed text-gray-600">
            {timeline.description}
          </p>
        </AnimatedSection>

        <div id="about-timeline-content" className="divide-y divide-gray-200">
          <GallerySection
            id="about-timeline-journey"
            number="01"
            title="Our Journey"
            summary="Two Cambodia factory sites built for stable long-term apparel programs."
            images={timeline.images}
          />
          <GallerySection
            id="about-timeline-factory-people"
            number="02"
            title="The Team Behind Every Order"
            summary="Operators, QC, packing, and production teams working through daily programs."
            images={timeline.peopleImages}
            reverse
            delay={0.1}
          />
          <GallerySection
            id="about-timeline-factory-live"
            number="03"
            title="Life At The Factory"
            summary="Everyday factory spaces that support teams before, during, and after production."
            images={timeline.factoryLiveImages}
            reverse
            delay={0.2}
          />
          <GallerySection
            id="about-timeline-facility"
            number="04"
            title="Facilities and Capacity"
            summary="Production lines, storage, fabric handling, and shipment preparation in one integrated site."
            images={timeline.facilityImages}
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
