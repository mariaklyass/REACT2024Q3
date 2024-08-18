import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <main>
      <h1>Main Page</h1>
      <section>
        <Link to={'/hook-form'}>Hook Form</Link>
        <Link to={'/uncontrolled-form'}>Uncontrolled Form</Link>
      </section>
      {/* <div>here tiles list with form data should render</div> */}
    </main>
  );
}

export default MainPage;
