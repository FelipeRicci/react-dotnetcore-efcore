using ProAtividade.Data.Context;
using ProAtividade.Domain.Interfaces.Repositories;
using System;
using System.Threading.Tasks;

namespace ProAtividade.Data.Repositories
{
    public class GeralRepo : IGeralRepo
    {

        private readonly DataContext _context;

        public GeralRepo(DataContext dataContext)
        {
            _context = dataContext;
        }

        public void Adicionar<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeletarTodos<T>(T[] entity) where T : class
        {
            _context.RemoveRange(entity);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
