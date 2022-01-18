import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Imperial Supplies',
  description: 'We are specialized in selling The Black Series action figures from Hasbro with best prices and fastest shippment',
  keywords: 'hasbro black series, star wars black series, buy black series, black series hasbro, black series star wars',
};


export default Meta;