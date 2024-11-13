import { Helmet } from 'react-helmet-async';

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
  title: 'JewelryShop',
  description: 'زیبایی را با ما تجربه کنید',
  keywords: 'انواع جواهرات و زیورآلات',
};

export default Meta;
