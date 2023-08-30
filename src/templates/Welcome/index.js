import './Welcome.scss';
import Image from "next/image";

const Welcome = () => {
  return (
    <div className='main-welcome-message'>
      <div className='welcome-image'>
        <Image
          src="/images/pessoa.png"
          alt="Ilustração de boas vindas"
          fill
          sizes="100vw, 100vh"
          priority={true}
        />
      </div>
      <h1>Bem-Vindo</h1>
      <p>Com o Process to use você pode selecionar as ferramentas que você
        precisa e montar o sistema da forma mais prática pra você.</p>
    </div>
  )
}

export default Welcome