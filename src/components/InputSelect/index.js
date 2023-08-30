import { Container, Label, FieldStyled } from './styles/styles';
import { Field } from "formik";


const InputSelect = ({ name, label, type, ...props }) => {
  return (
    <Container>
      <Label>
        {label}
      </Label>
      <Field as="select"
        id={id}
        //as={FieldStyled}
        name={name}
        type={type}
        {...props}
        autoComplete="off"
      />
    </Container>
  )
}

export default InputSelect