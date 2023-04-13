using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Data.Mappings
{
    public class AtividadeMap : IEntityTypeConfiguration<Atividade>
    {
        public void Configure(EntityTypeBuilder<Atividade> buider)
        {
            buider.ToTable("Atividades");

            buider.Property(a => a.Titulo)
                .HasColumnType("varchar(100)");

            buider.Property(a => a.Descricao)
                .HasColumnType("varchar(255)");

            buider.Property(a => a.DataConclusao)
                .HasColumnType("datetime2(0)");
        }
    }
}
