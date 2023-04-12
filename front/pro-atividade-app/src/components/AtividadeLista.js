import React from 'react'
import Atividade from './Atividade'

export default function AtividadeLista(props) {
  return (
    <div>
      <div className='mt-3'>
        {props.atividades.map((ativ )=> (
          <Atividade
            key={ativ.id} 
            ativ={ativ}
            deletaAtividades={props.deletaAtividades}
            alteraAtividades={props.alteraAtividades}
          />
        ))}
      </div>
    </div>
  )
}
