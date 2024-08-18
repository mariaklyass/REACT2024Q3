import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

function UncontrolledForm() {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <main className="uncontrolled-form">
      <h1>Uncontrolled Form</h1>
      <Link to={'/'}>back to Main</Link>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}></form>
    </main>
  );
}

export default UncontrolledForm;
