import React from 'react'

export default function Atividade(props) {

  function prioridadeLabel(params){
    switch(params) {
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return params;
      default:
        return 'Não definido';
    }
  };
  
  function prioridadeStyle(params, icone){
    switch(params){
      case 'Baixa':
        return icone ? 'smile' : 'success';
      case 'Normal':
        return icone ? 'meh' : 'dark';
      case 'Alta':
        return icone ? 'frown' : 'warning';
      default:
        return 'Não definido';
    }
  };

  return (
    <div>
      <div className={'card mb-2 shadow-sm border-' + prioridadeStyle(props.ativ.prioridade)}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">
                <span className="badge bg-primary me-2">
                  {props.ativ.id}
                </span>
                - {props.ativ.titulo}
              </h5>   
              <h6 >
                prioridade: 
                <span className={'ms-1 text-' + prioridadeStyle(props.ativ.prioridade)}>
                  <i className={'me-1 far fa-' + prioridadeStyle(props.ativ.prioridade, true)}></i>
                  {prioridadeLabel(props.ativ.prioridade)}
                </span>
              </h6>
            </div>

            <p className="card-text">{props.ativ.descricao}</p>

            <div className="d-flex justify-content-end pt-2 m-0">
              <button 
                className='btn-sm btn btn-outline-primary me-2'
                onClick={() => props.alteraAtividades(props.ativ.id)}> 
                <i className='fas fa-pen me-2'></i>
                Editar
              </button>
              <button 
                className='btn-sm btn btn-outline-danger'
                onClick={() => props.handleConfirmModal(props.ativ.id)}>
                <i className='fas fa-trash me-2'></i>
                Deletar
              </button>
            </div>

          </div>
        </div>
    </div>
  )
}
