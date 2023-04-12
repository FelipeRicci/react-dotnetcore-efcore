import React, { useEffect, useState } from 'react'

const atividadeInicial = {
  id: 0,
  prioridade: 0,
  titulo: '',
  descricao: ''
};

export default function AtividadeForm(props) {

  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.atividadeSelecionado.id !== 0)
      setAtividade(props.atividadeSelecionado)
  }, [props.atividadeSelecionado]);

  const inputTextHandler = (e) => {
    const {name, value} = e.target;

    setAtividade({...atividade, [name]: value});
  }

  function atividadeAtual()  {
    if (props.atividadeSelecionado.id !== 0){
      return props.atividadeSelecionado;
    } else {
      return atividadeInicial;
    } 
  }

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade()
    setAtividade(atividadeInicial);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (props.atividadeSelecionado.id !== 0){
      props.atualizaAtividade(atividade);
    } else {
      props.addAtividades(atividade);
    }

    setAtividade(atividadeInicial);
  }

  return (
    <>
      <h1 className='mt-2'>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <div>
        <form className="row g-3 mt-3" onSubmit={handlerSubmit}>
        <div className="col-md-6">
            <label className="form-label">Titulo</label>
            <input id="titulo" 
              type="text" 
              className="form-control" 
              placeholder="Titulo" 
              onChange={inputTextHandler} 
              value={atividade.titulo}
              name="titulo"
              maxLength={300}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prioridade</label>
            <select 
              id="prioridade" 
              className="form-select"
              name="prioridade"
              value={atividade.prioridade}
              onChange={inputTextHandler}
            >
              <option defaultValue="0">Selecione ...</option>
              <option value="1">Baixa</option>
              <option value="2">Normal</option>
              <option value="3">Alta</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">Descrição</label>
            <textarea 
              id="descricao" 
              type="text" 
              className="form-control" 
              placeholder="Descrição"
              onChange={inputTextHandler}
              value={atividade.descricao}
              name="descricao"
            />
            <hr/>
          </div>
          <div className="col-12 mt-0">
            {
              atividade.id === 0 
              ? 
              <button className="btn btn-outline-secondary" type='submit'><i className='fas fa-plus me-2'></i>Atividade</button>
              : 
              <>
                <button className="btn btn-outline-success me-2" type='submit'><i className='fas fa-plus me-2'></i>Salvar</button>
                <button className="btn btn-outline-danger" onClick={handleCancelar}><i className='fas fa-plus me-2'></i>Cancelar</button>
              </>
            }
          </div>
        </form>
      </div>
    </>
  )
}
