import formSchema from '../models/formSchema';
import * as yup from 'yup';
import { FormData } from '../models/types';

export async function validateForm(formData: FormData) {
  try {
    const validatedForm = await formSchema.validate(formData, {
      abortEarly: false,
    });

    const { name, age, gender, email, password, picture, country } =
      validatedForm;

    const result = {
      name,
      age,
      gender,
      email,
      password,
      picture,
      country,
    };

    return { result, isOk: true };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        result: error.errors,
        isOk: false,
      };
    }
    return {
      result: ['there is an error'],
      isOk: false,
    };
  }
}
