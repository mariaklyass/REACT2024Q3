import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <main>
      <h1>Main Page</h1>
      <section>
        <Link to={'/hook-form'}>Hook Form</Link>
        <Link to={'/uncontrolled-form'}>Uncontrolled Form</Link>
      </section>
      {/* list */}
    </main>
  );
}

export default MainPage;
