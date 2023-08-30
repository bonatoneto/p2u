import { toast } from "react-hot-toast"

const successToastComponent = (msg) => toast.success(msg, {
  id: "successToast",
  style: {
    background: 'none',
    color: 'green',
    fontSize: 'var(--font-size-s)',
    fontWeight: 'normal',
    boxShadow: '0vh 0vh 0vh',
    border: '0.1vh solid green',
    maxWidth: '50vw',
    //animation: 'none'
  }
})

export default successToastComponent