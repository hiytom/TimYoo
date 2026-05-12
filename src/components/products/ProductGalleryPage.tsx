import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import { toDomId } from '../../utils/domId';

type ProductGalleryPageData = {
  eyebrow: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  items: Array<{ id: number; name: string; code: string; image: string }>;
  galleryLabel: string;
};

interface ProductGalleryPageProps {
  pageId: string;
  pageData: ProductGalleryPageData;
}

const productDetailLinks = [
  { pageId: 'chef-wear-page', label: 'Chef Wear', path: '/products/chef-wear' },
  { pageId: 'casuals-page', label: 'Casuals', path: '/products/casuals' },
  { pageId: 'aprons-page', label: 'Aprons', path: '/products/aprons' },
];

const ProductGalleryPage: React.FC<ProductGalleryPageProps> = ({ pageId, pageData }) => {
  return (
    <div id={pageId} className="bg-stone-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection id={`${pageId}-hero-copy`} className="max-w-5xl">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-blue-300">{pageData.eyebrow}</p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{pageData.title}</h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{pageData.description}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {pageData.stats.map((stat, index) => (
                <AnimatedSection key={stat.label} id={toDomId(pageId, 'stat', stat.label)} delay={0.12 + index * 0.08}>
                  <div className="rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold tracking-tight text-white">{stat.value}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{stat.label}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 flex flex-col gap-6 border-b border-stone-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">Product Gallery</p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {pageData.items.length} {pageData.galleryLabel}
              </h2>
            </div>
            <nav aria-label="Switch product detail page" className="flex flex-wrap gap-2">
              {productDetailLinks.map((link) => {
                const isActive = link.pageId === pageId;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`clickable-cursor cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-stone-300 bg-white text-slate-600 hover:border-blue-700 hover:text-blue-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {pageData.items.map((item, index) => (
              <AnimatedSection key={item.code} id={toDomId(pageId, 'card-wrap', item.code, item.name)} delay={index * 0.06} className="h-full">
                <article
                  id={toDomId(pageId, 'card', item.code, item.name)}
                  className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden bg-white p-6">
                    <img
                      id={toDomId(pageId, 'image', item.code, item.name)}
                      src={item.image}
                      alt={item.name}
                      className="h-[480px] w-full object-contain object-center"
                    />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductGalleryPage;
