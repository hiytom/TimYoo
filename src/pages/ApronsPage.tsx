import React from 'react';
import ProductGalleryPage from '../components/products/ProductGalleryPage';
import { siteData } from '../data/siteData';

const ApronsPage: React.FC = () => {
  return <ProductGalleryPage pageId="aprons-page" pageData={siteData.apronDetailPage} />;
};

export default ApronsPage;
