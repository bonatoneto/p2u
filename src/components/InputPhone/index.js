import { ErrorMessage } from 'formik';

import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/high-res.css';
import './styles/InputPhone.scss';
import { Container, ErrorStyled, FieldStyled, Label } from './styles/styles';

const InputPhone = ({ name, id, type = "", label, placeholder, required, ...props }) => {
  return (
    <>
      <Container>
        <Label>
          {label}
        </Label>
        <PhoneInput
          {...props}
          name={name}
          type={type}
          country={'br'}
          placeholder={placeholder}
          preferredCountries={['br']}
          as={FieldStyled}
          autoComplete="off"
        />
        <ErrorMessage
          name={name}
          component={ErrorStyled}
        />
      </Container>
    </>
  )
}

export default InputPhone