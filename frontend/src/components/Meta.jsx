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
  title: 'CandyShop',
  description: 'با کیفیت ترین و خوشمزه ترین را با ما تجربه کنید.',
  keywords: 'انواع دسر و شیرینی',
};

export default Meta;
