using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;
using System;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {

        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;

        }

        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.PegarPorTiuloAsync(model.Titulo) != null)
                throw new Exception("Já existe uma atividade com esse titulo");

            if (await _atividadeRepo.PegarPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model?.DataConclusao != null)
                throw new Exception("Não se pode alterar a atividade ja concluida");

            if (await _atividadeRepo.PegarPorIdAsync(model.Id) != null)
            {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegarPorIdAsync(atividadeId);
            if (atividade == null)
                throw new Exception("Essa atividade que voce tentou deletar não existe");

            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegarPorIdAsync(atividadeId);
                if (atividade == null) return null;

                if (atividade != null)
                {
                    return atividade;
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Ocorreu um erro ao buscar uma ativdade {ex.Message}");
            }

            return null;
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegarTodosAsync();
                if (atividades == null) return null;

                return atividades;
            }
            catch (Exception ex)
            {
                throw new Exception($"Ocorreu um erro ao buscar todas as ativdade {ex.Message}");
            }
        }
    }
}
