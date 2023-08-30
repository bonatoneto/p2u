import { Field, ErrorMessage } from "formik";
import { Container, Label, FieldStyled, ErrorStyled } from './styles/styles';
const Input = ({ name, id, type = "", label, required, ...props }) => {
  return (
    <Container>
      <Label>
        {label}
      </Label>
      <Field
        id={id}
        as={FieldStyled}
        name={name}
        type={type}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        name={name}
        component={ErrorStyled}
      />
    </Container>
  )
}

export default Input 