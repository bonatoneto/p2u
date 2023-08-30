import "./Layout.scss";
import { Settings } from "@mui/icons-material";

export default function RootLayout({ children }) {
  return (
    <div className="main-layoutConfig">
      <div className="config-layout">
        <div className="title">
          <Settings className="icon" />
          <h1>Configurações</h1>
        </div>
        <div className="links">
          <a href="#">
            <p>Empresas</p>
          </a>
          <img className="img" src="/images/link-bar.png"></img>
          <a href="#">Meus Processos</a>
          <img className="img" src="/images/link-bar.png"></img>
          <a href="#">Usuários</a>
          <img className="img" src="/images/link-bar.png"></img>
          <a href="#">Papéis e Acessos</a>
          <img className="img" src="/images/link-bar.png"></img>
          <a href="#">Financeiro</a>
        </div>
      </div>
      <div className="config-content">{children}</div>
    </div>
  );
}
