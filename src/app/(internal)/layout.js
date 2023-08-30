import './Layout.scss'
import Header from "../../components/Header"

export default function DashboardLayout({ children }) {
  return (
      <>
        <div className="tela-dash">
          <Header />
          <div className="content">
            {children}
          </div>
          <img className="background" src="/images/fundo-dash.png" alt="Background" />
        </div>
      </> 
  )
}
