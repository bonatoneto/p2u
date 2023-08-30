import { AuthProvider } from '../context/AuthContext'
import './global.scss'

export const metadata = {
  title: 'Process to Use',
  icons: {
    icon: 'icon.png', type: "image/png",
  },
}

export default function RootLayout({ children }) {
  // redirect('/login');
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
