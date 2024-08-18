import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { updateTiles } from '../../store/slices/tilesSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from '../../models/formSchema';
import { RHFInput } from '../../models/types';
import { convertImage } from '../../utils/convertImage';
import { defineStrength } from '../../utils/validatePassword';

import ErrorMessage from '../../components/ErrorMessage';
import SubmitButton from '../../components/SubmitButton';
import RHFSelect from '../../components/Select/RHFSelect';
import HookInput from '../../components/Input/HookInput';
import RHFAutocomplete from '../../components/Autocomplete/RHFAutocomplete';
import '../UncontrolledForm/form.scss';

function HookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [strength, setStrength] = useState<ReactNode>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<RHFInput>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<RHFInput> = async data => {
    const picture = await convertImage(data.picture[0]);
    dispatch(updateTiles({ ...data, picture }));
    navigate('/');
  };

  const watchPassword = watch('password');
  const watchCountry = watch('country');

  useEffect(() => {
    if (watchPassword) {
      const strength = defineStrength(watchPassword);
      setStrength(strength);
    }
  }, [watchPassword]);

  const updateCountry = (value: string) => {
    setValue('country', value, { shouldValidate: true });
  };

  return (
    <main className="">
      <h1>React Hook Form</h1>
      <Link to={'/'} className="">
        to MainPage
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <HookInput type="text" title="Name :" register={register('name')}>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </HookInput>

        <HookInput type="number" title="Age :" register={register('age')}>
          <ErrorMessage>{errors.age?.message}</ErrorMessage>
        </HookInput>

        <HookInput type="text" title="E-mail :" register={register('email')}>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </HookInput>

        <RHFSelect title="Gender :" register={register('gender')}>
          <ErrorMessage>{errors.gender?.message}</ErrorMessage>
        </RHFSelect>

        <RHFAutocomplete
          callback={updateCountry}
          value={watchCountry}
          title="Country :"
          register={register('country')}
        >
          <ErrorMessage>{errors.country?.message}</ErrorMessage>
        </RHFAutocomplete>

        <HookInput
          type="password"
          title="Password :"
          register={register('password')}
        >
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <div className="absolute right-0 top-0">{strength}</div>
        </HookInput>

        <HookInput
          type="password"
          title="Repeat password :"
          register={register('repeatedPassword')}
        >
          <ErrorMessage>{errors.repeatedPassword?.message}</ErrorMessage>
        </HookInput>

        <HookInput
          type="file"
          title="Image :"
          register={register('picture')}
          accept=".png, .jpeg"
        >
          <ErrorMessage>{errors.picture?.message}</ErrorMessage>
        </HookInput>

        <HookInput type="checkbox" title="T&C :" register={register('terms')}>
          <ErrorMessage>{errors.terms?.message}</ErrorMessage>
        </HookInput>

        <SubmitButton isDisabled={!isValid} />
      </form>
    </main>
  );
}

export default HookForm;
