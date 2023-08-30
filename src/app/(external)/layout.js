import './Layout.scss'
import Welcome from '../../templates/Welcome'

export default function ExternalLayout({ children }) {
  return (
    <>
      <div className='layout-external'>
        <div className='left'>
          <img src='/images/logo.png' className='logo' alt='Logo P2U' />
          {children}
        </div>
        <div className='right'>
          <Welcome />
          <img
            src='/images/fundo-borda.png'
            className='background-desktop' 
            alt='Background desktop'
          />
          <img
            src='/images/fundo.png'
            className='background-mobile'
            alt='Background mobile' 
          />
        </div>
      </div>
    </>
  )
}
