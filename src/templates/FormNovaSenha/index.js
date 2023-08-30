'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './styles/FormNovaSenha.scss';
import { Text, Title, ValidatePassword, View } from './styles/styles';
import errorToastComponent from '../../components/Toast/error-toast';
import successToastComponent from '../../components/Toast/success-toast';
import api from "../../services/api";
import { Toaster } from 'react-hot-toast';
import { CancelRounded, CheckCircleRounded, Visibility, VisibilityOff } from '@mui/icons-material';

const FormNovaSenha = ({ params }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(true);
  const [isDoneSubmit, setIsDoneSubmit] = useState(false)
  const [validadeInputPassword, setValidateInputPassword] = useState({
    case: false,
    number: false,
    length: false
  })

  const initialValues = {
    password: "",
    conf_password: ""
  }

  const validationSchema = Yup.object({
    password: Yup
      .string()
      .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .required("Informe sua nova senha"),
    conf_password: Yup
      .string()
      .oneOf([Yup.ref('password'), null], "Certifique que as senhas informadas sejam iguais")
      .required("Confirme sua nova senha")
  })

  const errorToast = ({ customMessage }) => errorToastComponent(customMessage)
  const successToast = ({ customMessage }) => successToastComponent(customMessage)

  async function handleSubmit(values, IsSubmitting) {
    try {
      await api.post(`/resetpassword/${params.id}`, {
        ...values,
        newPassword: values.password,
        confirmNewPassword: values.conf_password
      })
        .then(response => {
          console.log(response);
          setIsDoneSubmit(true)
          successToast({ customMessage: "Sua senha foi redefinida!" })
        })
        .catch(error => {
          console.log(error);
          errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
        })
    } catch (error) {
      console.log(error);
      errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
    } finally {
      !IsSubmitting
    }
  }

  const togglePassword = event => {
    if (event.currentTarget.id === "showPasswordIcon") {
      setShowPassword(!showPassword)
      setShowPasswordIcon(!showPasswordIcon)
    }
    else if (event.currentTarget.id === "showConfirmPasswordIcon") {
      setShowConfirmPassword(!showConfirmPassword)
      setShowConfirmPasswordIcon(!showConfirmPasswordIcon)
    }
  }

  const securePassword = (password) => {
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
    const length = password.length >= 8 && password.length <= 20

    setValidateInputPassword({
      case: regexUppercase.test(password),
      number: regexNumber.test(password),
      length
    })
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isValid, setFieldValue, isSubmitting}) => (
          <Form className='main-nova-senha'>
            <h2>Criar nova senha</h2>
            <div className='password'>
              <Input
                id="password"
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                onChange={e => {
                  setFieldValue("password", e.target.value)
                  securePassword(e.target.value, setFieldValue)
                }}
              />
              <div className='eye-align'>
                {showPasswordIcon ? <Visibility className="show-icon" alt="Vetor" onClick={togglePassword} id='showPasswordIcon'/> : <VisibilityOff className="show-icon" alt="Vetor" onClick={togglePassword} id='showPasswordIcon'/> }
              </div>
            </div>
            <div className='password'>
              <Input
                id="conf_password"
                name="conf_password"
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                type={showConfirmPassword ? "text" : "password"}
              />
              <div className='eye-align'>
                      {showConfirmPasswordIcon ? <Visibility className="show-icon" alt="Vetor" onClick={togglePassword} id='showConfirmPasswordIcon'/> : <VisibilityOff className="show-icon" alt="Vetor" onClick={togglePassword} id='showConfirmPasswordIcon'/> }
              </div>
            </div>
            <div className='validation'>
              <ValidatePassword>
                <Title>Sua senha deve ter:</Title>
                <View>
                  
                    {validadeInputPassword.length ? <CheckCircleRounded style={{color: validadeInputPassword.length ? '#00CAA6' : 'none'}} className='icon'/> : <CancelRounded style={{color: validadeInputPassword.length ? 'none' : '#FF0003'}} className='icon'/>}
                 
                  <Text>Sua senha deve ter entre 8 e 20 caracteres;</Text>
                </View>
                <View>
                
                    {validadeInputPassword.number ? <CheckCircleRounded style={{color: validadeInputPassword.number ? '#00CAA6' : 'none'}} className='icon'/> : <CancelRounded style={{color: validadeInputPassword.number ? 'none' : '#FF0003'}} className='icon'/> }
               

                  <Text>Pelo menos 1 número;</Text>
                </View>
                <View>
                  
                    {validadeInputPassword.case ? <CheckCircleRounded style={{color: validadeInputPassword.case ? '#00CAA6' : 'none'}} className='icon'/> : <CancelRounded style={{color: validadeInputPassword.case ? 'none' : '#FF0003'}} className='icon'/>}
                  
            
                  <Text>Pelo menos 1 letra maiúscula.</Text>
                </View>
              </ValidatePassword>
            </div>
            <div className='buttons'>
              <Button
                label="Confirmar"
                type="submit"
                disabled={!isValid || isSubmitting || isDoneSubmit}
              />
              <Link href="/login">
                <Button
                  label="Login"
                  variant="white"
              />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 50000,
          style: {
            maxWidth: 900,
            maxHeight: 32
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

export default FormNovaSenha