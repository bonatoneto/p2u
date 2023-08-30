"use client";

import {
  DeleteForever,
  Domain,
  CheckRounded,
  ColorLens,
  Circle,
} from "@mui/icons-material";
import "./EditCompany.scss";
import { Formik, Form } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import { useState } from "react";

const EditCompany = (props) => {
  const initialValues = {
    cnpj_id: "XX.XXX.XXX/0001-XX",
    nome_da_empresa: "Nome da Empresa",
    email_institucional: "empresa@email.com",
    telefone_institucional: "+55 00 0000-0000",
    cep: "00000-000",
    endereco: "Rua. Eustáquio Correia de Assis Junior, 1235",
    bairro: "Bairro",
    cidade: "Curitiba",
    estado: "Paraná",
    pais: "Brasil",
    payment: "Aguardando Pagamento",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const [colorOption, setColorOption] = useState({
    original: true,
    green: false,
    orange: false,
    magenta: false,
    purple: false,
  });

  const selectColor = (e) => {
    let colorId = e.currentTarget.id;
    if (colorId === "Original") {
      setColorOption({
        original: true,
        green: false,
        orange: false,
        magenta: false,
        purple: false,
      });
    } else if (colorId === "Green") {
      setColorOption({
        original: false,
        green: true,
        orange: false,
        magenta: false,
        purple: false,
      });
    } else if (colorId === "Orange") {
      setColorOption({
        original: false,
        green: false,
        orange: true,
        magenta: false,
        purple: false,
      });
    } else if (colorId === "Magenta") {
      setColorOption({
        original: false,
        green: false,
        orange: false,
        magenta: true,
        purple: false,
      });
    } else if (colorId === "Purple") {
      setColorOption({
        original: false,
        green: false,
        orange: false,
        magenta: false,
        purple: true,
      });
    }
  };

  const { original, green, orange, magenta, purple } = colorOption;

  return (
    <div className={props.className}>
      <div className="tableHeader">
        <div className="company-title">
          <Domain id="iconDomain" />
          <h1>Empresas</h1>
          <h1> | </h1>
          <p>Editar</p>
        </div>
      </div>
      <div className="form">
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form className="form-dados flex-row">
            <div className="form-left flex-col">
              <div className="group-upload">
                <div className="border-image">
                  <div className="image">
                    <Image
                      src="/images/logo.png"
                      alt="Logo de sua empresa"
                      fill
                      sizes="10vw, 6vh"
                    />
                  </div>
                </div>
                <p className="upload-text">
                  Mínimo 200px de altura, nos formatos jpg. e png.
                </p>
                <div className="flex-row buttonUpload">
                  <div className="trash-hover">
                    <div className="text-hover">
                      <span>Deletar Logo</span>
                    </div>
                    <DeleteForever className="trash-icon" />
                  </div>
                  <Button label="Trocar Logo" type="button" variant="s-white" />
                </div>
              </div>
              <div className="flex-col">
                <div className="medium-title">Paleta de Cor:</div>
                <div className="group-text">
                  Você poderá selecionar uma paleta de cor que achar mais
                  apropriada. <br />
                  <i>*Se não selecionar a paleta que permanece é a original.</i>
                </div>
                <div className="group-color">
                  <div className={original ? "color-align color-selected" : "color-align"} onClick={selectColor} id="Original">
                    <p>Original:</p>
                    <div className="circle-align">
                      <Circle className="circle" style={{ color: "#297D88" }} />
                      <Circle className="circle" style={{ color: "#2BC3D4" }} />
                      <Circle className="circle" style={{ color: "#E3F5F8" }} />
                    </div>
                    <CheckRounded className="iconcheck" />
                  </div>
                  <div className={green ? "color-align color-selected" : "color-align"} onClick={selectColor} id="Green">
                    <p>Verde:</p>
                    <div className="circle-align">
                      <Circle className="circle" style={{ color: "#169B3B" }} />
                      <Circle className="circle" style={{ color: "#76BD7B" }} />
                      <Circle className="circle" style={{ color: "#DDEFDD" }} />
                    </div>
                    <CheckRounded className="iconcheck" />
                  </div>
                  <div className={orange ? "color-align color-selected" : "color-align"} onClick={selectColor} id="Orange">
                    <p>Laranja:</p>
                    <div className="circle-align">
                      <Circle className="circle" style={{ color: "#FCA600" }} />
                      <Circle className="circle" style={{ color: "#FFC36C" }} />
                      <Circle className="circle" style={{ color: "#FFF0DA" }} />
                    </div>
                    <CheckRounded className="iconcheck" />
                  </div>
                  <div className={magenta ? "color-align color-selected" : "color-align"} onClick={selectColor} id="Magenta">
                    <p>Magenta:</p>
                    <div className="circle-align">
                      <Circle className="circle" style={{ color: "#CF0459" }} />
                      <Circle className="circle" style={{ color: "#E8748C" }} />
                      <Circle className="circle" style={{ color: "#FDDDE1" }} />
                    </div>
                    <CheckRounded className="iconcheck" />
                  </div>
                  <div className={purple ? "color-align color-selected" : "color-align"} onClick={selectColor} id="Purple">
                    <p>Roxo:</p>
                    <div className="circle-align">
                      <Circle className="circle" style={{ color: "#472988" }} />
                      <Circle className="circle" style={{ color: "#876CAF" }} />
                      <Circle className="circle" style={{ color: "#E1D8EB" }} />
                    </div>
                    <CheckRounded className="iconcheck" />
                  </div>
                  <div className="color-align optionColor">
                    <p>Selecione mais opções de cores:</p>
                    <ColorLens className="iconColor" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-right">
              <div className="form-align">
                <div className="small-title"> Dados Pessoais: </div>
                <div className="inputs flex-row dados-pessoais">
                  <Input
                    id="cnpj_id"
                    name="cnpj_id"
                    type="text"
                    label="CNPJ (ID)"
                    disabled
                  />
                  <Input
                    id="nome_da_empresa"
                    name="nome_da_empresa"
                    type="text"
                    label="Nome da Empresa"
                    disabled
                  />
                  <Input
                    id="email_institucional"
                    name="email_institucional"
                    type="email"
                    label="Email Institucional"
                    disabled
                  />
                  <Input
                    id="telefone_institucional"
                    name="telefone_institucional"
                    type="text"
                    label="Telefone Institucional"
                    disabled
                  />
                </div>
                <div className="small-title">Endereço:</div>
                <div className="inputs flex-row endereco">
                  <Input id="cep" name="cep" type="text" label="CEP" disabled />
                  <Input
                    id="endereco"
                    name="endereco"
                    type="text"
                    label="Endereço"
                    disabled
                  />
                  <Input
                    id="bairro"
                    name="bairro"
                    type="text"
                    label="Bairro"
                    disabled
                  />
                </div>
                <div className="inputs flex-row localizacao">
                  <Input
                    id="cidade"
                    name="cidade"
                    type="text"
                    label="Cidade"
                    disabled
                  />
                  <Input
                    id="estado"
                    name="estado"
                    type="text"
                    label="Estado"
                    disabled
                  />
                  <Input
                    id="pais"
                    name="pais"
                    type="list"
                    label="País"
                    disabled
                  />
                </div>
                <div className="small-title">Adiministrador da Empresa:</div>
                <div className="flex-row flex-list">
                  <ul>
                    <li className="bluedisc">
                      <div className="flex-row">
                        <h1>Lana Maria de Assis</h1>
                        <p> &nbsp;| Gerente Geral</p>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>lanamaria@empresaestrela.com</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>+55 9 6532-5265</p>
                    </li>
                  </ul>
                </div>
                <div className="small-title">Responsável Financeiro:</div>
                <div className="flex-row flex-list">
                  <ul>
                    <li className="bluedisc">
                      <div className="flex-row">
                        <h1>Roberto Luiz Azul</h1>
                        <p> &nbsp;| Gerente Financeiro</p>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>luizazul@empresaestrela.com</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>+55 9 2345-5768</p>
                    </li>
                  </ul>
                </div>
                <div className="inputs flex-row company-status">
                  <div className="small-title">Status da Empresa:</div>
                  <Input
                    id="payment"
                    name="payment"
                    type="text"
                    label=""
                    disabled
                  />
                  <div className="btn-submit">
                    <Button label="Salvar" type="submit" />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditCompany;
