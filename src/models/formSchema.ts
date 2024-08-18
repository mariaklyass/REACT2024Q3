import * as yup from 'yup';
import {
  hasDigits,
  hasUppercase,
  hasLowercase,
  hasSpecialChar,
} from '../utils/validatePassword';
import { countries } from '../models/countries';
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .test(
      'isCapitalized',
      'first letter of name should be uppercased',
      value => {
        if (value[0]) {
          return (
            isNaN(+value[0] / 1) === true && value[0] === value[0].toUpperCase()
          );
        }
      }
    ),
  age: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .nullable()
    .required()
    .test('isNonNegative', 'age should be non-negative', value => value >= 0),
  email: yup
    .string()
    .required()
    .test('isEmail', 'enter valid email', value => {
      return emailRegex.test(value);
    }),
  gender: yup
    .string()
    .required()
    .test(
      'gender-isOk',
      'gender is not selected',
      value => value !== 'not selected'
    ),
  password: yup
    .string()
    .required()
    .test(
      'hasDigits',
      'password should contain at least 1 digit',
      value => hasDigits(value) === true
    )
    .test(
      'hasUppercased',
      'password should contain at least 1 uppercased letter',
      value => hasUppercase(value) === true
    )
    .test(
      'hasLowercased',
      'password should contain at least 1 lowercased letter',
      value => hasLowercase(value) === true
    )
    .test(
      'hasSpecialChar',
      'password should contain at least 1 special character',
      value => hasSpecialChar(value) === true
    ),
  repeatedPassword: yup
    .string()
    .required('please repeat the password')
    .when('password', ([password], schema) => {
      return schema.test(
        'isMatching',
        'passwords should match',
        schema => schema === password
      );
    }),
  picture: yup
    .mixed<FileList>()
    .required('please upload a picture')
    .test('isLoaded', 'please upload a picture', value => !!value[0])
    .test(
      'isSizeCorrect',
      'picture size must be equal or less than 1 MB',
      value => {
        if (value[0]) {
          const size: number = value[0].size;
          return size <= 1 * 1024 * 1024;
        }
      }
    )
    .test(
      'extensionIsOK',
      'picture should have a jpg or png extension ',
      value => {
        if (value[0]) {
          const type: string = value[0].type;
          return type === 'image/jpeg' || type === 'image/png';
        }
      }
    ),
  country: yup
    .string()
    .required()
    .test('isCorrect', 'choose existing country', value => {
      return countries.includes(value);
    }),

  terms: yup
    .boolean()
    .test('terms-isOk', 'you need to accept T&C', value => value === true),
});

export default formSchema;
