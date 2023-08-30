import './Button.scss'
import Button from "react-bootstrap/Button";

export default function Botao(props) {
  return (
    <div className='button'>
      <Button
        type={props.type}
        name={props.name}
        id={props.id}
        variant={props.variant}
        onClick={props.onClick}
        disabled={props.disabled}
      >{props.label}
      </Button>
    </div>
  )
}