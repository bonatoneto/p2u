import './Warning.scss'
import { useState } from 'react';
import { CloseRounded } from '@mui/icons-material';

export default function Warning() {
  const [showWarning, setShowWarning] = useState(true);

  const warningMessage = () => {
    setShowWarning(!showWarning)
  };

  return (
    <div className={showWarning ? 'main-warning hide' : 'main-warning'} id='warning'>
      <div className='text'>
        <strong>Sua solicitação foi enviada, atenção:</strong><br />
        Para ativar sua conta, é preciso <strong>validar seu e-mail dentro das próximas
          2 horas</strong> após o cadastro inicial. Se isso não acontecer dentro do tempo
        determinado, será necessário refazer sua conta.<br />
        Você terá acesso a plataforma apenas após ter seu e-mail validado.
      </div>
      <CloseRounded className='close-icon' alt="X" onClick={warningMessage} />
    </div>
  )
}