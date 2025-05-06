import PropTypes from 'prop-types';

function AuthLayout({ children, imageUrl }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center relative">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          filter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />

        {/* Right Content (Form, etc) */}
        <div className="w-1/2 p-8">{children}</div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default AuthLayout;
