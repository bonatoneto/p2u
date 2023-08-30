"use client";

import "./Profile.scss";
import { Form, Formik } from "formik";
import { useState } from "react";
import {
  AccountCircleOutlined,
  DeleteForever,
  FlagRounded,
  KeyboardArrowDownRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "next/link";
import Image from "next/image";

const Profile = () => {
  const initialValues = {
    nome: "Lana Maria de Assis",
    email: "lanamaria@empresa.com",
    cargo: "Gerente de Projeto",
    cpf_id: "000.000.000-00",
    idioma: "Português",
    timezone: "Brasília - DF (GMT-3)",
    password: "",
    new_password: "",
    conf_password: "",
    telefone: "+55 41 00000-0000",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordIcon, setShowNewPasswordIcon] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(true);

  const togglePassword = (event) => {
    if (event.currentTarget.id === "showPasswordIcon") {
      setShowPassword(!showPassword);
      setShowPasswordIcon(!showPasswordIcon);
    } else if (event.currentTarget.id === "showNewPasswordIcon") {
      setShowNewPassword(!showNewPassword);
      setShowNewPasswordIcon(!showNewPasswordIcon);
    } else if (event.currentTarget.id === "showConfirmPasswordIcon") {
      setShowConfirmPassword(!showConfirmPassword);
      setShowConfirmPasswordIcon(!showConfirmPasswordIcon);
    }
  };

  return (
    <div className="main-profile">
      <div className="voltar">
        <Link href="/dashboard">Área de Trabalho</Link>
      </div>
      <div className="line"></div>
      <div className="group-perfil">
        <div className="title">
          <AccountCircleOutlined className="icon" alt="User" />
          <span className="text">
            <strong>Perfil</strong> | Editar
          </span>
        </div>
        <div className="dados">
          <div className="group-foto">
            <div className="image">
              <Image
                src="/images/image.png"
                layout="fill"
                objectFit="contain"
                alt="foto"
              />
            </div>
            <div className="group-text">
              Mínimo 200px por 200px, nos formatos jpg. e png.
            </div>
            <div className="flex-row">
              <div className="delete-hover">
                <DeleteForever className="delete" alt="delete" />
                <div className="text-hover"><span>Deletar Foto</span></div>
              </div>
              <Button label="Inserir Foto" type="submit" variant="s-white" />
            </div>
          </div>
          <div className="form">
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
              <Form className="form-dados">
                <div className="flex-row">
                  <div className="inputs flex-col input-gap">
                    <div className="small-title" id="personal-date">
                      Dados pessoais:
                    </div>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      label="Nome Completo"
                      disabled
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label="E-mail Profissional"
                      disabled
                    />
                    <Input
                      id="cargo"
                      name="cargo"
                      type="text"
                      label="Cargo"
                      disabled
                    />

                    <div className="flex-row">
                      <Input
                        id="telefone"
                        name="telefone"
                        type="text"
                        label="Telefone"
                        disabled
                      />
                      <Input
                        id="cpf_id"
                        name="cpf_id"
                        type="text"
                        label="CPF (ID)"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-row">
                  <div className="inputs flex-col">
                    <div className="flex-col language-input">
                      <div className="small-title">Idioma:</div>
                      <div className="group-arrow">
                        <Input
                          id="idioma"
                          name="idioma"
                          type="list"
                          label="Selecionar Idioma:"
                        />
                        <KeyboardArrowDownRounded
                          className="arrow-down"
                          alt="Arrow"
                        />
                      </div>
                    </div>
                    <div className="flex-col timezone-input">
                      <div className="small-title" id="time-zone">
                        Time zone:
                      </div>
                      <div className="group-arrow">
                        <FlagRounded className="flag" alt="Arrow" />
                        <Input
                          id="timezone"
                          name="timezone"
                          type="list"
                          label="Selecionar time zone:"
                        />
                        <KeyboardArrowDownRounded
                          className="arrow-down"
                          alt="Arrow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mid-line"></div>

                <div className="inputs flex-col">
                  <div className="small-title">Alterar Senha:</div>
                  <div className="title-gap">
                    <div className="group-senha">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Senha atual*"
                        placeholder="Digite sua senha atual..."
                      />

                      <div className="eye-align">
                        {showPasswordIcon ? (
                          <Visibility
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showPasswordIcon"
                          />
                        ) : (
                          <VisibilityOff
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showPasswordIcon"
                          />
                        )}
                      </div>
                    </div>
                    <div className="group-senha">
                      <Input
                        id="new_password"
                        name="new_password"
                        type={showNewPassword ? "text" : "password"}
                        label="Nova senha*"
                        placeholder="Digite sua senha..."
                      />
                      <div className="eye-align">
                        {showNewPasswordIcon ? (
                          <Visibility
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showNewPasswordIcon"
                          />
                        ) : (
                          <VisibilityOff
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showNewPasswordIcon"
                          />
                        )}
                      </div>
                    </div>
                    <div className="group-senha">
                      <Input
                        id="conf_password"
                        name="conf_password"
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirme sua nova senha*"
                        placeholder="Confirme sua nova senha..."
                      />
                      <div className="eye-align">
                        {showConfirmPasswordIcon ? (
                          <Visibility
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showConfirmPasswordIcon"
                          />
                        ) : (
                          <VisibilityOff
                            className="show"
                            alt="Show"
                            onClick={togglePassword}
                            id="showConfirmPasswordIcon"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="buttonSubmit">
                  <Button label="Salvar" type="submit" />
                  </div>
                 
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
