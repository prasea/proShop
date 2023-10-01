import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'Bro goes to ProShop',
  keywords: 'cheap, best',
};
export default Meta;
