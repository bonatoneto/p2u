'use client'

import { Form, Formik } from "formik"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Toaster } from "react-hot-toast"
import * as Yup from 'yup'
import Button from '../../components/Button'
import CustomInput from "../../components/CustomInput"
import Input from "../../components/Input"
import InputPhone from "../../components/InputPhone"
import errorToastComponent from "../../components/Toast/error-toast"
import successToastComponent from "../../components/Toast/success-toast"
import api from "../../services/api"
import './FormCadastroUsuario.scss'
import { Text, Title, ValidatePassword, View } from "../FormNovaSenha/styles/styles"
import { CheckCircleRounded, CancelRounded, Visibility, VisibilityOff } from "@mui/icons-material"

export default function FormCadastroUsuario({ params }) {
  //  State responsável por exibir os formulários invertendo os valores
  const [showUserForm, setShowUserForm] = useState(true)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  //  State que preenche automaticamente o campo "company_name, user_name e user_email"
  const [completeFoundData, setCompleteFoundData] = useState({
    company_name: "",
    user_name: "",
    user_email: ""
  })
  //  States responsáveis por exibir a senha e mudar ícone 
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordIcon, setShowPasswordIcon] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(true)
  //  State responsável por desabilitar o botão de envio 
  //const [isDoneSubmit, setIsDoneSubmit] = useState(false)
  //  State responsável por fazer a validação de senha 
  const [validadeInputPassword, setValidateInputPassword] = useState({
    case: false,
    number: false,
    length: false
  })

  //  Hook responsável por armazenar os valores que serão reutilizados no userForm
  const companyFoundData = useRef(null)
  //  useRef cria um referencia que é mantida durante todo o ciclo de vida do componente, mesmo que ele seja renderizado novamente 

  //  Objeto responsável por inicilizar cada campo como uma string vazia "" (Yup)
  const initialValues_userForm = {
    company_name: "",
    user_name: "",
    user_email: "",
    user_phone: "",
    user_company_role: "",
    user_cpf: "",
    user_password: "",
    user_confirm_password: ""
  }

  //  Objeto responsável por realizar a validação de cada campo (Yup)
  const validationSchema_userForm = Yup.object({
    company_name: Yup
      .string(),
    user_name: Yup
      .string(),
    user_email: Yup
      .string(),
    user_phone: Yup
      .string()
      .min(13, "Verifique se o numero de contato é válido")
      .required("Informe seu numero de telefone"),
    user_company_role: Yup
      .string()
      .required("Informe seu cargo na empresa"),
    user_cpf: Yup
      .string()
      .min(11, "Verifique se o CPF informado é válido")
      .required("Digite seu CPF"),
    user_password: Yup
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .matches(/[0-9]/, "A senha deve conter pelo menos um numero")
      .required("Crie a sua senha"),
    user_confirm_password: Yup
      .string()
      .oneOf([Yup.ref('user_password'), null], "As senhas devem ser iguais")
      .required("Confirme sua senha")
  })

  useEffect(() => {
    async function completeCompanyName() {
      try {
        await api.post('find_user_invite', {
          token: params.id
        })
          .then(response => {
            const resp = response.data
            const status = response.status
            console.log(status);
            if (status == 200) {
              console.log(response);
              companyFoundData.user_company_id = resp.data.id
              companyFoundData.company_name = resp.data.company_name
              companyFoundData.user_name = resp.data.first_name
              companyFoundData.user_email = resp.data.email
              setCompleteFoundData({
                company_name: resp.data.company_name,
                user_email: resp.data.email,
                user_name: resp.data.first_name
              })
              successToast({ customMessage: `Boas vindas, ${resp.data.company_name}` })
            }
          })
          .catch(error => {
            console.log(error);
            errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
          })
      } catch {
        errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
      }
    }
    completeCompanyName()
  }, [])

  //  Funções para os toast de erro e de sucesso passando uma mensagem customizada para cada um deles
  const errorToast = ({ customMessage }) => errorToastComponent(customMessage)
  const successToast = ({ customMessage }) => successToastComponent(customMessage)

  //  Funcão responsável por trocar o "type" e o Icon nos campos de "password"
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

  const togglePasswordForm = () => {
    setShowUserForm(false)
    setShowPasswordForm(true)
  }

  const securePassword = (user_password) => {
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
    const length = user_password.length >= 8 && user_password.length <= 20

    setValidateInputPassword({
      case: regexUppercase.test(user_password),
      number: regexNumber.test(user_password),
      length
    })
  }

  const handleSubmit_userForm = (values, isSubmitting) => {
    try {
      api.post('/signUp', {
        ...values,
        user_company_id: companyFoundData.user_company_id,
        company_name: companyFoundData.company_name,
        user_email: companyFoundData.user_email,
        user_name: companyFoundData.user_name
      })
        .then(response => {
          const resp = response.data
            (resp.success === false
              ? errorToast({ customMessage: "Esse e-mail já está cadastrado." })
              : successToast({ customMessage: "Administrador cadastrado com sucesso!" })
            )
          console.log(resp);

        })
    } catch (error) {
      errorToast({ customMessage: "Algo inesperado aconteceu, , tente novamente mas tarde." })
    } finally {
      !isSubmitting
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues_userForm}
        validationSchema={validationSchema_userForm}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          handleSubmit_userForm(values)
        }}
      >
        {({ setFieldValue, isSubmitting, isValid }) => (
          <Form className='main-cadastro-usuario'>
            {showUserForm && (
              <div className='segundo-form'>
                <h2>Cadastro de usuário convidado</h2>
                <div className='inputs'>
                  <div className='empresa'>
                    <div className='title'>Dados do Usuário:</div>
                    <Input
                      id="company_name"
                      name="company_name"
                      type='text'
                      label="Empresa*"
                      value={completeFoundData.company_name}
                      disabled
                    />
                    <Input
                      id="user_name"
                      name="user_name"
                      type='text'
                      label="Nome Completo*"
                      placeholder="Digite seu nome completo"
                      value={completeFoundData.user_name}
                    />
                    <Input
                      id="user_email"
                      name="user_email"
                      type='email'
                      label="E-mail profissional*"
                      value={completeFoundData.user_email}
                      disabled
                    />
                  </div>
                  <div className='responsavel'>
                    <div className='title'></div>
                    <Input
                      id="user_company_role"
                      name="user_company_role"
                      type='text'
                      label="Cargo"
                      placeholder="Insira seu cargo..."
                    />
                    <CustomInput
                      mask="999.999.999.99"
                      id="user_cpf"
                      name="user_cpf"
                      type='text'
                      label="CPF*"
                      placeholder="000.000.000-00"
                      onChange={e => {
                        const value = e.target.value
                        setFieldValue("user_cpf", value)
                      }}
                    />
                    <InputPhone
                      id="user_phone"
                      name="user_phone"
                      type="tel"
                      label="Telefone*"
                      placeholder="+00 (00) 00000-0000"
                      onChange={e => setFieldValue("user_phone", e)}
                    />
                  </div>
                </div>
                <div className='buttons'>
                  <Button
                    onClick={togglePasswordForm}
                    label="Cadastrar senha"
                  //disabled={!isValid || isSubmitting}
                  />
                  <Link href="/login">
                    <Button
                      label="Login"
                      variant="white"
                    />
                  </Link>
                </div>
              </div>
            )}
            {showPasswordForm && (
              <div className='main-cadastro-senha'>
                <h2>Cadastro de usuário convidado | Cadastrar Senha</h2>
                <div className='password'>
                  <Input
                    id="user_password"
                    name="user_password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    type={showPassword ? "text" : "password"}
                    onChange={e => {
                      setFieldValue("user_password", e.target.value)
                      securePassword(e.target.value, setFieldValue)
                    }}
                  />
                  <div className='icon-align'>
                    {showPasswordIcon ? <Visibility className="show-icon" alt="Vetor" onClick={togglePassword} id='showPasswordIcon' /> : <VisibilityOff className="show-icon" alt="Vetor" onClick={togglePassword} id='showPasswordIcon' />}
                  </div>
                </div>
                <div className='password'>
                  <Input
                    id="user_confirm_password"
                    name="user_confirm_password"
                    label="Confirmar Senha"
                    placeholder="Confirme sua senha"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <div className='icon-align'>
                    {showConfirmPasswordIcon ? <Visibility className="show-icon" alt="Vetor" onClick={togglePassword} id='showConfirmPasswordIcon' /> : <VisibilityOff className="show-icon" alt="Vetor" onClick={togglePassword} id='showConfirmPasswordIcon' />}
                  </div>
                </div>
                <div className='validation'>
                  <ValidatePassword>
                    <Title>Sua senha deve ter:</Title>
                    <View>
                      {validadeInputPassword.length ? <CheckCircleRounded style={{ color: validadeInputPassword.length ? '#00CAA6' : 'none' }} className='icon' /> : <CancelRounded style={{ color: validadeInputPassword.length ? 'none' : '#FF0003' }} className='icon' />}
                      <Text>Entre 8 e 20 caracteres;</Text>
                    </View>
                    <View>
                      {validadeInputPassword.number ? <CheckCircleRounded style={{ color: validadeInputPassword.number ? '#00CAA6' : 'none' }} className='icon' /> : <CancelRounded style={{ color: validadeInputPassword.number ? 'none' : '#FF0003' }} className='icon' />}
                      <Text>Pelo menos 1 número;</Text>
                    </View>
                    <View>
                      {validadeInputPassword.case ? <CheckCircleRounded style={{ color: validadeInputPassword.case ? '#00CAA6' : 'none' }} className='icon' /> : <CancelRounded style={{ color: validadeInputPassword.case ? 'none' : '#FF0003' }} className='icon' />}
                      <Text>Pelo menos 1 letra maiúscula.</Text>
                    </View>
                  </ValidatePassword>
                </div>
                <div className='buttons'>
                  <Button
                    label="Criar conta"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  />
                  <Button
                    label="Login"
                    variant="white"
                  //onClick={backUserForm}
                  />
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 5000,
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