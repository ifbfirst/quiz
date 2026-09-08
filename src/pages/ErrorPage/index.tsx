import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <p>Oops!...Sorry, an unexpected error has occurred.</p>
      <div className="btn-slot">
        <Link to="/" className="back-btn">
          Back to settings
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
