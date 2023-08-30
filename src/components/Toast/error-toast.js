import { toast } from "react-hot-toast"


const errorToastComponent = (msg) => toast.error(msg, {
  id: 'error',
  style: {
    borderRadius: '0.5vh',
    background: 'none',
    color: 'red',
    fontSize: 'var(--font-size-s)',
    fontWeight: 'normal',
    boxShadow: '0vh 0vh 0vh',
    border: '0.1vh solid red',
    maxWidth: '50vw'
    //animation: 'none'
  }
})

export default errorToastComponent