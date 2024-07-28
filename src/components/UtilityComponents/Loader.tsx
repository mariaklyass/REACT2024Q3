import './Loader.css';

function Loader() {
  return (
    <div>
      <div className="spinner" data-testid="loader" />
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
