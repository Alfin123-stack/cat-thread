function FormWrapper({ title, children, className = '' }) {
  return (
    <div className={`${className}`}>
      {title && (
      <h3 className="text-2xl font-semibold text-blue-400 mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default FormWrapper;
