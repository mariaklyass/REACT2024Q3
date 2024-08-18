import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UncontrolledInput from '../../components/Input/UncontrolledInput';
import { useAppDispatch } from '../../store/hooks';
import { updateTiles } from '../../store/slices/tilesSlice';
import { validateForm } from '../../utils/validateForm';
import { defineStrength } from '../../utils/validatePassword';
import { convertImage } from '../../utils/convertImage';
import ErrorMessage from '../../components/ErrorMessage';
import Select from '../../components/Select/Select';
import Autocomplete from '../../components/Autocomplete';
import SubmitButton from '../../components/SubmitButton';
import './form.scss';
import PasswordIndicator from '../../components/PasswordIndicator';

function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [strengthDescription, setStrengthDescription] = useState<string>('');

  const [countryValue, setCountryValue] = useState<string | undefined>('');

  const updateStrength = (password: string) => {
    const description = defineStrength(password);
    setStrengthDescription(description);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const createFileList = (file: File | null): FileList => {
      const dataTransfer = new DataTransfer();
      if (file) dataTransfer.items.add(file);
      return dataTransfer.files;
    };

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formValues = {
      name: formData.get('name') as string,
      age: formData.get('age') ? Number(formData.get('age')) : undefined,
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      password: formData.get('password') as string,
      repeatedPassword: formData.get('repeatedPassword') as string,
      picture: createFileList(formData.get('picture') as File),
      country: countryValue,
    };

    const { isOk, result } = await validateForm(formValues);

    if (isOk && !Array.isArray(result)) {
      const picture = result.picture
        ? await convertImage(result.picture[0])
        : '';
      dispatch(updateTiles({ ...result, picture }));
      navigate('/');
    } else if (!isOk && Array.isArray(result)) {
      const errorMapping: Record<string, string | undefined> = {};
      result.forEach(error => {
        if (error.includes('name')) errorMapping.name = error;
        if (error.includes('age')) errorMapping.age = error;
        if (error.includes('email')) errorMapping.email = error;
        if (error.includes('gender')) errorMapping.gender = error;
        if (error.includes('T&C')) errorMapping.terms = error;
        if (error.includes('password')) errorMapping.password = error;
        if (error.includes('repeat' || 'match'))
          errorMapping.repeatedPassword = error;
        if (error.includes('picture')) errorMapping.picture = error;
        if (error.includes('country')) errorMapping.country = error;
      });
      setErrors(errorMapping);
    }
  };

  return (
    <main className="uncontrolled-form">
      <h1>Uncontrolled Form</h1>
      <Link to={'/'}>
        <span className="link">Go back to the Main Page</span>
      </Link>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <UncontrolledInput type="text" title="Name :" name="name">
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </UncontrolledInput>
        </div>
        <div className="form-group">
          <UncontrolledInput type="number" title="Age :" name="age">
            {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
          </UncontrolledInput>
        </div>
        <div className="form-group">
          <UncontrolledInput type="text" title="E-mail :" name="email">
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </UncontrolledInput>
        </div>
        <div className="form-group">
          <Select title="Gender: " name="gender">
            {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
          </Select>
        </div>
        <div className="form-group">
          <Autocomplete
            title="Country :"
            callback={setCountryValue}
            getValue={() => countryValue}
          >
            {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
          </Autocomplete>
        </div>
        <div className="form-group">
          <UncontrolledInput
            title="Password: "
            type="password"
            name="password"
            handleChange={e =>
              updateStrength((e.target as HTMLInputElement).value)
            }
          >
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <PasswordIndicator description={strengthDescription} />
          </UncontrolledInput>
        </div>
        <div className="form-group">
          <UncontrolledInput
            title="Confirm password: "
            type="password"
            name="repeatedPassword"
          >
            {errors.repeatedPassword && (
              <ErrorMessage>{errors.repeatedPassword}</ErrorMessage>
            )}
          </UncontrolledInput>
        </div>
        <div className="form-group">
          <UncontrolledInput
            type="file"
            title="Image :"
            name="picture"
            accept=".png, .jpeg"
          >
            {errors.picture && <ErrorMessage>{errors.picture}</ErrorMessage>}
          </UncontrolledInput>
        </div>
        <div className="form-group checkbox-group">
          <UncontrolledInput type="checkbox" title="T&C :" name="terms">
            {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}
          </UncontrolledInput>
        </div>
        <SubmitButton />
      </form>
    </main>
  );
}

export default UncontrolledForm;
