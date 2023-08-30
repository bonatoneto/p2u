import InputMask from "react-input-mask";
import Input from '../Input';

const CustomInput = (props) => {
  return (
    <>
      <InputMask {...props}>
        {inputProps => <Input {...inputProps} />}
      </InputMask>
    </>
  )
}

export default CustomInput