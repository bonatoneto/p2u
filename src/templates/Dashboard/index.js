'use client'

import './Dashboard.scss'
import { Flight, Receipt, CoPresent, CalendarMonth, Timer, Settings } from '@mui/icons-material'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className="main-dashboard">
      <img className="logo" src="/images/logo.png" alt="Logo" />
      <div className='col'>
        <div className='ferramenta'>
          <Flight className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Requisição de viagens
          </label>
        </div>
        <div className='ferramenta'>
          <Receipt className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Reembolsos
          </label>
        </div>
        <div className='ferramenta'>
          <CoPresent className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Reuniões
          </label>
        </div>
      </div>
      <div className='col'>
        <div className='ferramenta'>
          <CalendarMonth className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Calendário
          </label>
        </div>
        <div className='ferramenta'>
          <Timer className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Controle de Atividades
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col disabled'>
        <div className='ferramenta'>
          <label className='label' htmlFor='icon'>
          </label>
        </div>
      </div>
      <div className='col'>
        <Link href="config/company" className='ferramenta'>
          <Settings className='icon' id="icon" />
          <label className='label' htmlFor='icon'>
            Configurações
          </label>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard