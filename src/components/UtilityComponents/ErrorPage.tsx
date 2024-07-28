import { useNavigate, useRouteError } from 'react-router-dom';
import { RouteError } from '../../utils/types';

export default function ErrorPage() {
  const error = useRouteError() as RouteError | undefined;
  const navigate = useNavigate();

  if (!error) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>An unknown error occurred.</i>
        </p>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div id="error-page">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button type="button" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message || 'Unknown error'}</i>
      </p>
    </div>
  );
}
