import { Link } from 'react-router-dom';
import TilesList from '../../components/TilesList';

function MainPage() {
  return (
    <main>
      <h1>Main Page</h1>
      <section className="links">
        <Link to={'/hook-form'}>Hook Form</Link>
        <Link to={'/uncontrolled-form'}>Uncontrolled Form</Link>
      </section>
      <TilesList />
    </main>
  );
}

export default MainPage;
