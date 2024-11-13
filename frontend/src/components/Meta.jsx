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
  title: 'GameShop',
  description: 'بروز ترین را با ما تجربه کنید',
  keywords: 'انواع بازی های ویدیویی',
};

export default Meta;
