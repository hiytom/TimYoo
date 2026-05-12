import React from 'react';
import ProductGalleryPage from '../components/products/ProductGalleryPage';
import { siteData } from '../data/siteData';

const CasualsPage: React.FC = () => {
  return <ProductGalleryPage pageId="casuals-page" pageData={siteData.casualsDetailPage} />;
};

export default CasualsPage;
