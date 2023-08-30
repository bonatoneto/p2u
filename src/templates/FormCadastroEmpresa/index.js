'use client'

import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import Input from '../../components/Input';
import InputPhone from '../../components/InputPhone';
import errorToastComponent from '../../components/Toast/error-toast';
import successToastComponent from '../../components/Toast/success-toast';
import Warning from '../../components/Warning';
import { Text, Title, ValidatePassword, View } from '../FormNovaSenha/styles/styles';
import { CheckCircleRounded, CancelRounded, Visibility, VisibilityOff } from "@mui/icons-material"
import api from '../../services/api';
import './FormCadastroEmpresaEAdmin.scss';

export default function FormCadastroEmpresa() {
  //  State responsável por exibir os formulários invertendo os valores
  const [showCompanyForm, setShowCompanyForm] = useState(true)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  //  States responsável por exibir a senha e mudar ícone 
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(true);
  const [validadeInputPassword, setValidateInputPassword] = useState({
        case: false,
        number: false,
        length: false
      })

  // Componente responsável por armazenar os valores que serão reutilizados no userForm
  const companyFoundData = useRef(null)
  // useRef cria um referencia que é mantida durante todo o ciclo de vida do componente, mesmo que ele seja renderizado novamente 

  //  Funçoes para os toast de erro e de sucesso passando uma mensagem customizada para cada um deles
  const errorToast = ({ customMessage }) => errorToastComponent(customMessage)
  const successToast = ({ customMessage }) => successToastComponent(customMessage)

  //  Objeto responsável por inicilizar cada campo como uma string vazia "" (Yup)
  const initialValues_companyForm = {
    company_identifier: "",
    company_name: "",
    company_email: "",
    company_phone: "",
    user_name: "",
    user_email: "",
    user_company_id: ""
  }
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

  // Objeto responsável por realizar a validação de cada campo (Yup)
  const validationSchema_companyForm = Yup.object({
    company_identifier: Yup
      .string()
      .required("Informe o CPNJ"),
    company_name: Yup
      .string()
      .required("Informe o nome da empresa"),
    company_email: Yup
      .string()
      .email("E-mail inválido")
      .required("Informe o e-mail da empresa"),
    company_phone: Yup
      .string()
      .min(13, "Verifique se o numero de contato é válido")
      .required("Informe o numero de telefone empresarial"),
    user_name: Yup
      .string()
      .min(4, "O nome deve conter no mínimo 4 caracteres")
      .required("Informe seu nome"),
    user_email: Yup
      .string()
      .email("E-mail inválido")
      .required("Informe o seu E-mail profissional"),
  })
  // Objeto responsável por realizar a validação de cada campo (Yup)
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
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required("Crie a sua senha"),
    user_confirm_password: Yup
      .string()
      .oneOf([Yup.ref('user_password'), null], "Certifique que as senhas informadas sejam iguais")
      .required("Confirme sua senha")
  })

  //  Funcão responsável por trocar o "type" e o Icon nos campos de password
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

  //  Função responsável por verificar se o CNPJ informado já está cadastrado
  async function verify_CNPJ(company_identifier, setFieldValue) {
    try {
      await api.post('/verifyCompanyIdentifier', {
        company_identifier: company_identifier,
      })
        .then(response => {
          const resp = response.data
          console.log(resp);
          if (resp.success === true) {
            successToast({ customMessage: "Empresa já cadastrada." })
            setFieldValue("company_name", resp.data.name)
            setFieldValue("company_email", resp.data.email)
            setFieldValue("company_phone", resp.data.phone)
            setFieldValue("user_name", resp.data.user_name === null ? '' : resp.data.user_name)
            setFieldValue("user_email", resp.data.user_email === null ? '' : resp.data.user_email)
            setFieldValue("user_company_id", resp.data.id)
          } else {
            return
          }
        })
        .catch(error => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
      errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde" })
    }
  }

  //  Função responsável por mandar os valores do primeiro formulario (companyForm) 
  async function handleSubmit_companyForm(values) {
    if (values.user_company_id === "") {
      try {
        await api.post('/company/new', values)
          .then(response => {
            if (response.data.success === true) {
              companyFoundData.user_company_id = response.data.data.id
              companyFoundData.company_name = values.company_name
              companyFoundData.user_name = values.user_name
              companyFoundData.user_email = values.user_email
              setShowCompanyForm(false)
              setShowUserForm(true)
            } else {
              return
            }
          })
          .catch(error => {
            console.log(error);
            errorToast({ customMessage: "Algo inesperado aconteceu..." })
          })
      } catch (error) {
        console.log(error);
        errorToast({ customMessage: "Algo inesperado aconteceu..." })
      }
    } else {
      successToast({ customMessage: "" })
      companyFoundData.user_company_id = values.user_company_id
      companyFoundData.company_name = values.company_name
      companyFoundData.user_name = values.user_name
      companyFoundData.user_email = values.user_email
      setShowCompanyForm(false)
      setShowUserForm(true)
    }
  }

  //  Função responsável por enviar os valores do segundo formulário (userForm)
  async function handleSubmit_userForm(values) {
    try {
      await api.post('/signUpWithCompany', {
        ...values,
        user_company_id: companyFoundData.user_company_id,
        user_email: companyFoundData.user_email,
        user_name: companyFoundData.user_name
      })
        .then(response => {
          successToast({
            customMessage: "Sua solicitação foi enviada, atenção: Para ativar sua conta, é preciso validar seu e-mail dentro das próximas horas após o cadastro inicial Se isso não acontecer dentro do tempo determinado, será necessário refazer sua conta. Você terá acesso a plataforma apenas após ter seu e-mail validado."
          })
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
        })
    } catch (error) {
      console.log(error);
      errorToast({ customMessage: "Algo inesperado aconteceu, tente novamente mais tarde." })
    }
  }

  const togglePasswordForm = () => {
    setShowUserForm(false)
    setShowPasswordForm(true)
  }

  const backUserForm = () => {
    setShowUserForm(true)
    setShowPasswordForm(false)
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

  const isValidFormUser = (values) => {
    values.user_name &&
    values.user_email &&
    values.user_phone &&
    values.user_company_role &&
    values.user_cpf
  }

  return (
    <>
      <Formik
        key="1"
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues_companyForm}
        validationSchema={validationSchema_companyForm}
        onSubmit={(values, { setFieldValue }) => {
          handleSubmit_companyForm(values, setFieldValue)
        }}
      >
        {({ isValid, setFieldValue, values, isSubmitting }) => (
          <Form className='main-cadastro-empresa'>
            {showCompanyForm && (
              <div className='primeiro-form'>
                <h2>Cadastrar nova empresa</h2>
                <div className='inputs'>
                  <div className='empresa'>
                    <div className='title'>Dados de Empresa:</div>
                    <CustomInput
                      mask="99.999.999/9999-99"
                      id="company_identifier"
                      name="company_identifier"
                      type='text'
                      label="CNPJ*"
                      placeholder="00.000.000/0001-00"
                      onChange={e => {
                        setFieldValue("company_identifier", e.target.value);
                        verify_CNPJ(e.target.value, setFieldValue)
                      }}
                      onBlur={e => {
                        const value = e.target.value
                        setFieldValue("company_identifier", value);
                        verify_CNPJ(value, setFieldValue)
                      }}
                    />
                    <Input
                      id="company_name"
                      name="company_name"
                      type='text'
                      label="Nome da Empresa*"
                      placeholder="Digite o nome da sua empresa..."
                    />
                    <Input
                      id="company_email"
                      name="company_email"
                      type='email'
                      label="E-mail institucional*"
                      placeholder="Digite o e-mail..."
                    />
                  </div>
                  <div className='responsavel'>
                    <div className='title'>Responsável pela plataforma:</div>
                    <Input
                      id="user_name"
                      name="user_name"
                      type="text"
                      label="Nome Completo*"
                      placeholder="Digite seu nome completo"
                    />
                    <Input
                      id="user_email"
                      name="user_email"
                      type="email"
                      label="E-mail profissional*"
                      placeholder="Digite seu e-mail profissional..."
                    />
                    <InputPhone
                      id="company_phone"
                      name="company_phone"
                      type="tel"
                      label="Telefone Institucional*"
                      placeholder="(00) 00 00000-0000"
                      onChange={e => setFieldValue("company_phone", e)}
                      value={values.company_phone}
                    />
                  </div>
                </div>
                <div className='buttons'>
                  <Button
                    type="submit"
                    label="Próximo"
                    disabled={!isValid || isSubmitting || !isValidFormUser}
                  />
                  <Link href="/login">
                    <Button
                      label="Login"
                      variant="white" />
                  </Link>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <Formik
        key="2"
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialValues_userForm}
        validationSchema={validationSchema_userForm}
        onSubmit={(values) => {
          handleSubmit_userForm(values)
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className='main-cadastro-administrador'>
            {showUserForm && (
              <div className='segundo-form'>
                <h2>Administrador do Sistema</h2>
                <div className='inputs'>
                  <div className='empresa'>
                    <div className='title'>Dados do usuário administrador:</div>
                    <Input
                      id="company_name"
                      name="company_name"
                      type='text'
                      label="Empresa*"
                      value={companyFoundData.company_name}
                      disabled
                    />
                    <Input
                      id="user_name"
                      name="user_name"
                      type='text'
                      label="Nome Completo*"
                      value={companyFoundData.user_name}
                      disabled
                    />
                    <Input
                      id="user_email"
                      name="user_email"
                      type='email'
                      label="E-mail profissional*"
                      value={companyFoundData.user_email}
                      disabled
                    />
                  </div>
                  <div className='responsavel'>
                  <div className='title'>&nbsp;</div>
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
                      placeholder="(00) 00 00000-0000"
                      onChange={e => setFieldValue("user_phone", e)}
                    />
                  </div>
                </div>
                <div className='buttons'>
                  <Button
                    type="button"
                    onClick={togglePasswordForm}
                    //disabled={!isValidFormUser(values)}
                    label="Cadastrar senha"
                  />
                  <Button
                    label="Voltar"
                    variant="white"
                    //onClick={backUserForm}
                  />
                </div>
                <Warning />
              </div>
            )}
            {showPasswordForm && (
              <div className='main-cadastro-senha'>
                <h2>Administrador do Sistema | Cadastrar Senha</h2>
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
                    <Title className='title-validation'>Sua senha deve ter:</Title>
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
                    //disabled={isSubmitting}
                  />
                  <Button
                    label="Voltar"
                    variant="white"
                    onClick={backUserForm}
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
          style: {
            maxWidth: 700
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