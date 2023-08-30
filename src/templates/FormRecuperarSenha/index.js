'use client'

import { Form, Formik } from 'formik'
import Link from 'next/link'
import { Toaster } from "react-hot-toast"
import * as Yup from 'yup'
import Button from '../../components/Button'
import Input from '../../components/Input'
import errorToastComponent from "../../components/Toast/error-toast"
import successToastComponent from "../../components/Toast/success-toast"
import api from '../../services/api'
import './FormRecuperarSenha.scss'

const FormRecuperarSenha = () => {
  const initialValues = {
    email: ""
  }

  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email("E-mail inválido")
      .required("Campo obrigatório")
  })

  const errorToast = ({ customMessage }) => errorToastComponent(customMessage)
  const successToast = ({ customMessage }) => successToastComponent(customMessage)

  async function handleSubmit(values) {
    try {
      await api.post('/resetpassword', values)
        .then(response => {
          const resp = response.data
          if (resp.success === true) {
            console.log(resp);
            successToast({ customMessage: "Solicitação enviada com sucesso, verifique seu e-mail." })
          } else {
            errorToast({ customMessage: "Não existe uma conta vinculada a e esse e-mail." })
          }
        })
        .catch(error => {
          console.log(error);
          errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
        })
    } catch (error) {
      console.log(error);
      errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mas tarde." })
    }
  }
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        <Form className='main-recuperarsenha'>
          <h2>Recuperar senha</h2>
          <Input
            name="email"
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail..."
          />
          <div className='buttons'>
            <Button
              label="Solicitar"
              type="submit"
            />
            <Link href="/login">
              <Button
                label="Login"
                variant="white" />
            </Link>
          </div>
        </Form>
      </Formik>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 50000,
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

export default FormRecuperarSenha