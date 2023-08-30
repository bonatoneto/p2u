'use client'

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useContext, useState, } from 'react';
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './FormLogin.scss';
import { AuthContext } from '../../context/AuthContext';

const FormLogin = () => {
  const { signIn } = useContext(AuthContext)

  const initialValues = {
    email: "jeferson.saretta@simplifica.eu",
    password: "Abc12345"
  }

  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email("E-mail inválido")
      .required("E-mail obrigatório"),

    password: Yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .required("Campo obrigatório"),
  })

  async function handleSubmit(data) {
    await signIn(data)
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword)
    setShowPasswordIcon(!showPasswordIcon)
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className='main-login'>
          <h2>Login</h2>
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail..."
          />
          <div className='password'>
            <Input
              id="password"
              name="password"
              label="Senha"
              placeholder="Digite sua senha..."
              type={showPassword ? "text" : "password"}
            />
            <div className='icon-align'>
              {showPasswordIcon ? <Visibility className="show-password-icon" alt="Vetor" onClick={togglePassword} /> : <VisibilityOff className="show-password-icon" alt="Vetor" onClick={togglePassword} />}
            </div>
          </div>
          <div className='link'>
            <Link href="/change_password" >
              Esqueceu sua senha?
            </Link>
          </div>
          <Button
            label="Entrar"
            type="submit"
          />
        </Form>
      </Formik>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            width: 'auto'
          }
        }}
        containerStyle={{
          top: 0,
          left: 0,
          bottom: 20,
          right: 0,
        }}
      />
    </>
  )
}

export default FormLogin