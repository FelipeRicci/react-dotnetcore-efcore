import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';

let initialState = [
  {
    id: 1,
    descricao: "Primeira Atividade",
    titulo: "Atividade",
    prioridade: '1'
  },
  {
    id: 2,
    descricao: "Segunda Atividade",
    titulo: "Atividade",
    prioridade: '2'
  },
  {
    id: 3,
    descricao: "Terceira Atividade",
    titulo: "Atividade",
    prioridade: '3'
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState(initialState);
  const [atividade, setAtividade] = useState({id: 0});

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : setIndex(Math.max.apply( Math, atividades.map(item => item.id)) + 1);
  }, [atividades]);

  function addAtividades(ativ) {
    setAtividades([...atividades,
      { ...ativ, id: index}]);
  }

  function deletaAtividades(id){
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
    setAtividades([...atividadesFiltradas])
  }

  function alteraAtividades(id){
    const atividadesAlterar = atividades.filter(atividade => atividade.id === id);
    setAtividade(atividadesAlterar[0])
  }

  function cancelarAtividade(){
    setAtividade({id: 0});
  }

  function atualizaAtividade(ativ){
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item));
    setAtividade({id: 0});
  }

  return (
    <>

      <AtividadeForm 
        atividades={atividades}
        atividadeSelecionado={atividade}
        atualizaAtividade={atualizaAtividade}
        cancelarAtividade={cancelarAtividade}
        addAtividades={addAtividades}
      />

      <AtividadeLista 
        atividades={atividades}
        deletaAtividades={deletaAtividades}
        alteraAtividades={alteraAtividades}
      />
      
    </>
  );
}

export default App;
