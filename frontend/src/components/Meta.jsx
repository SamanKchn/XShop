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
  title: 'به XShop خوش آمدید',
  description: 'ارزان ترین قیمت را با ما تجربه کنید',
  keywords: 'انواع لوازم الکترونیکی',
};

export default Meta;
