"use client";

import "./Company.scss";
import {
  Circle,
  Domain,
  DomainAdd,
  EditNote,
  ExpandMore,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
  Search,
  DeleteForever,
  CheckRounded,
  ColorLens,
} from "@mui/icons-material";
import { useState } from "react";
import EditIcon from "../../components/EditIcon";
import EditCompany from "../EditCompany/index";

const Company = () => {
  const [showTable, setShowTable] = useState(true);
  const [showCompanyTable, setShowCompanyTable] = useState(false);

  const hideTable = () => {
    setShowTable(!showTable);
    setShowCompanyTable(!showCompanyTable);
  };

  return (
    <div className="main-company-page">
      <div className="main-company">
        <div className={showTable ? "tableHeader fadeIn" : "tableHeader fadeOut"}>
          <div className="company-title">
            <Domain id="iconDomain" />
            <h1>Empresas</h1>
          </div>
          <div className="input-search">
            <Search id="searchIcon" />
            <input type="search" id="mySearch" placeholder="Buscar..." />
          </div>
        </div>
        <div className={showTable ? "table-background scaleUp" : "table-background scaleDown"}>
          <div className="voltar">
            <div className="bola"></div>
            <div className="bola"></div>
            <div className="bola"></div>
          </div>
          <table className="table">
            <thead>
              <tr className="teste">
                <th className="borderRadius">Empresa</th>
                <th>CNPJ (ID)</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>País</th>
                <th>Admin</th>
                <th width="150">Status</th>
                <th className="tableIconAlign">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>James Schleifer</td>
                <td>
                  <Circle className="Active" /> Ativo
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="1" className="tableIcon"  />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Jocelyn Culhane</td>
                <td className="Waiting">
                  <Circle className="Pending" />
                  <p>Aguardando Pagamento</p>
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="2" className="tableIcon" />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Alfonso Rosser </td>
                <td className="inactiveText">
                  <Circle className="Inactive" /> Inativo
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="3" className="tableIcon" />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Craig Baptista</td>
                <td>
                  <Circle className="Active" /> Ativo
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="4" className="tableIcon" />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Anika Workman</td>
                <td>
                  <Circle className="Active" /> Ativo
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="5" className="tableIcon" />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Mira Schleifer</td>
                <td>
                  <Circle className="Active" /> Ativo
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="6" className="tableIcon" />
                </td>
              </tr>
              <tr>
                <td className="itemAlign">Empresa X0X1X2</td>
                <td>XX. XXX. XXX/0001-XX</td>
                <td>emailexemplo@empresa.com</td>
                <td>+55 00 00000-0000</td>
                <td>País</td>
                <td>Tatiana Korsgaard</td>
                <td className="Waiting">
                  <Circle className="Pending" />
                  <p>Aguardando Pagamento</p>
                </td>
                <td className="tableIconAlign" onClick={hideTable}>
                  <EditIcon id="7" className="tableIcon" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="inputAlign">
            <div className="selectInput">
              <label htmlFor="Exibition">Exibir </label>
              <select name="Exibition" className="selection" id="Exibition">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <label htmlFor="Exibition">
                <ExpandMore className="arrowIcon" />
              </label>
              <label htmlFor="Exibition"> Resultados</label>
            </div>
            <div className="btnLayout">
              <KeyboardDoubleArrowLeftRounded className="btnIcon" />
              <KeyboardArrowLeftRounded className="btnArrowLeft" />
              <p>Exibindo 1 ao 7 de 7</p>
              <KeyboardArrowRightRounded className="btnArrowRight" />
              <KeyboardDoubleArrowRightRounded className="btnIcon" />
            </div>
          </div>
        </div>
      </div>
      <EditCompany className={showTable ? "main-editCompany fadeOut" : "main-editCompany fadeIn"}/>
      <div className="backCompany">
          
            <div className="circleBack" onClick={hideTable}></div>
              <p onClick={hideTable}>Voltar</p>
            <div className="circleBack" onClick={hideTable}></div>
          
      </div>
    </div>
  );
};

export default Company;
