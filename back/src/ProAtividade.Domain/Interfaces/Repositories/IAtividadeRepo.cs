using ProAtividade.Domain.Entities;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<Atividade[]> PegarTodosAsync();
        Task<Atividade> PegarPorIdAsync(int id);
        Task<Atividade> PegarPorTiuloAsync(string titulo);
    }
}
