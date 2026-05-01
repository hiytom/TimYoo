import React from 'react';
import ProductGalleryPage from '../components/products/ProductGalleryPage';
import { siteData } from '../data/siteData';

const ChefWearPage: React.FC = () => {
  return <ProductGalleryPage pageId="chef-wear-page" pageData={siteData.chefWearDetailPage} />;
};

export default ChefWearPage;
