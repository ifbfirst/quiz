import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <p>Oops!...Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to="/" className={'back-btn'}>
          Back to settings
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
