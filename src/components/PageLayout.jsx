import PropTypes from 'prop-types';
import PageHeader from './PageHeader';

function PageLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <PageHeader title={title} />
      {children}
    </div>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
