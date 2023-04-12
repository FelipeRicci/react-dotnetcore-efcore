using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {

        private readonly DataContext _context;

        public AtividadeController(DataContext dbcontext)
        {
            _context = dbcontext;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0)
                return atividade;
            else
                throw new Exception("Você nao conseguiu adicionar uma ativadede");
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Você está tentando atualizar a atividade errada");

            _context.Update(atividade);

            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(x => x.Id == id);
            else
                return new Atividade();
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(x => x.Id == id);

            if (atividade == null)
                throw new Exception("Você está tentando remover uma pessoa que não existe");

            _context.Remove(atividade);

            return _context.SaveChanges() > 0;
        }
    }
}