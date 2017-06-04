using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using DataModel.Models;

namespace test.Models
{
    public partial class AccountingModuleContext : DbContext
    {
        public AccountingModuleContext(DbContextOptions<AccountingModuleContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Compte>(entity =>
            {
                entity.HasKey(e => e.IdCpt)
                    .HasName("PK_Compte");

                entity.HasIndex(e => e.CodeCpt)
                    .HasName("unique_accound_code")
                    .IsUnique();

                entity.Property(e => e.IdCpt).HasColumnName("idCpt");

                entity.Property(e => e.LevelCpt).HasDefaultValueSql("1");

                entity.Property(e => e.LibelleCpt)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.MontantCpt).HasDefaultValueSql("0");

                entity.Property(e => e.TypeCpt)
                    .HasColumnName("typeCpt")
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'user'");

                entity.Property(e => e.VisibilityCpt).HasDefaultValueSql("1");

                entity.HasOne(d => d.IdCptParentNavigation)
                    .WithMany(p => p.InverseIdCptParentNavigation)
                    .HasForeignKey(d => d.IdCptParent)
                    .HasConstraintName("FK_Compte_Compte");
            });

            modelBuilder.Entity<CoursEchange>(entity =>
            {
                entity.HasKey(e => e.IdCours)
                    .HasName("PK_CoursEchange");

                entity.Property(e => e.DateCours).HasColumnType("date");

                entity.HasOne(d => d.IdDeviseNavigation)
                    .WithMany(p => p.CoursEchange)
                    .HasForeignKey(d => d.IdDevise)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_CoursEchange_Devise");
            });

            modelBuilder.Entity<Devise>(entity =>
            {
                entity.HasKey(e => e.IdDevise)
                    .HasName("PK_Devise");

                entity.Property(e => e.NomDevise)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PrefixDevise)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.SigneDevise)
                    .IsRequired()
                    .HasColumnType("char(1)");
            });

            modelBuilder.Entity<EcritureComptable>(entity =>
            {
                entity.HasKey(e => e.NumEcriture)
                    .HasName("PK_EcritureComptable");

                entity.Property(e => e.DateEcheanceEcriture).HasColumnType("date");

                entity.Property(e => e.DateEcriture).HasColumnType("date");

                entity.Property(e => e.DateValidationEcriture).HasColumnType("date");

                entity.Property(e => e.LibelleEcriture).HasMaxLength(150);

                entity.Property(e => e.Reference)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.StatusEcriture).HasDefaultValueSql("1");

                entity.HasOne(d => d.CodeJNavigation)
                    .WithMany(p => p.EcritureComptable)
                    .HasForeignKey(d => d.CodeJ)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_EcritureComptable_Journal");

                entity.HasOne(d => d.CompteNavigation)
                    .WithMany(p => p.EcritureComptable)
                    .HasPrincipalKey(p => p.CodeCpt)
                    .HasForeignKey(d => d.Compte)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_EcritureComptable_Compte");

                entity.HasOne(d => d.NumeroOperationNavigation)
                    .WithMany(p => p.EcritureComptable)
                    .HasForeignKey(d => d.NumeroOperation)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_EcritureComptable_Operation");
            });

            modelBuilder.Entity<ExerciceComptable>(entity =>
            {
                entity.HasKey(e => e.IdExercice)
                    .HasName("PK_ExerciceComptable");

                entity.Property(e => e.DateClotureExercice).HasColumnType("date");

                entity.Property(e => e.DateFinExercice).HasColumnType("date");

                entity.Property(e => e.DateOuvertureExercice).HasColumnType("date");

                entity.Property(e => e.LibelleExercice)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.StatusExercice).HasMaxLength(35);
            });

            modelBuilder.Entity<Facture>(entity =>
            {
                entity.HasKey(e => e.CodePieceJ)
                    .HasName("PK_Facture");

                entity.Property(e => e.CodePieceJ).HasMaxLength(50);

                entity.Property(e => e.StatusFacture).HasDefaultValueSql("0");

                entity.HasOne(d => d.CodePieceJNavigation)
                    .WithOne(p => p.Facture)
                    .HasForeignKey<Facture>(d => d.CodePieceJ)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Facture_PieceJustificatif");
            });

            modelBuilder.Entity<Journal>(entity =>
            {
                entity.HasKey(e => e.CodeJournal)
                    .HasName("PK_Journal");

                entity.Property(e => e.LibelleJournal)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.PatternEcriture)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.PrefixJournal)
                    .IsRequired()
                    .HasMaxLength(5);

                entity.Property(e => e.StatusJournal).HasDefaultValueSql("1");
            });

            modelBuilder.Entity<Lettrage>(entity =>
            {
                entity.HasKey(e => e.IdLettrage)
                    .HasName("PK_Lettrage");

                entity.HasIndex(e => new { e.PremiereEcritureLettre, e.DeuxiemeEcritureLettre })
                    .HasName("ECRITURES")
                    .IsUnique();

                entity.Property(e => e.IdLettrage).ValueGeneratedOnAdd();

                entity.Property(e => e.DateLettrage).HasColumnType("date");

                entity.Property(e => e.LibelleLettrage)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdLettrageNavigation)
                    .WithOne(p => p.LettrageIdLettrageNavigation)
                    .HasForeignKey<Lettrage>(d => d.IdLettrage)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("Second_FK_Lettrage_Lettrage");

                entity.HasOne(d => d.PremiereEcritureLettreNavigation)
                    .WithMany(p => p.LettragePremiereEcritureLettreNavigation)
                    .HasForeignKey(d => d.PremiereEcritureLettre)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("First_FK_Lettrage_Lettrage");
            });

            modelBuilder.Entity<OperationComptable>(entity =>
            {
                entity.HasKey(e => e.IdOp)
                    .HasName("PK_OperationComptable_1");

                entity.Property(e => e.DateOp).HasColumnType("date");

                entity.Property(e => e.LibelleOp)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.NatureOp).HasMaxLength(100);

                entity.Property(e => e.NumPieceJustificatifOp)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdExerciceComptableNavigation)
                    .WithMany(p => p.OperationComptable)
                    .HasForeignKey(d => d.IdExerciceComptable)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_OperationComptable_ExerciceComptable");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.OperationComptable)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_OperationComptable_User");
            });

            modelBuilder.Entity<PieceJustificatif>(entity =>
            {
                entity.HasKey(e => e.IdPieceJ)
                    .HasName("PK_PieceJustificatif");

                entity.HasIndex(e => e.NumeroPieceJ)
                    .HasName("IX_PieceJustificatif")
                    .IsUnique();

                entity.Property(e => e.IdPieceJ).HasMaxLength(50);

                entity.Property(e => e.DataPieceJ).HasColumnType("date");

                entity.Property(e => e.LibellePieceJ)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.CodeTiersNavigation)
                    .WithMany(p => p.PieceJustificatif)
                    .HasForeignKey(d => d.CodeTiers)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_PieceJustificatif_PieceJustificatif");
            });

            modelBuilder.Entity<Regulement>(entity =>
            {
                entity.HasKey(e => e.CodePieceJ)
                    .HasName("PK_Regulement");

                entity.Property(e => e.CodePieceJ).HasMaxLength(50);

                entity.Property(e => e.ModeRegulement)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.CodePieceJNavigation)
                    .WithOne(p => p.Regulement)
                    .HasForeignKey<Regulement>(d => d.CodePieceJ)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Regulement_Regulement");
            });

            modelBuilder.Entity<Tiers>(entity =>
            {
                entity.HasKey(e => e.CodeTiers)
                    .HasName("PK_Tiers");

                entity.Property(e => e.CodeTiers).ValueGeneratedOnAdd();

                entity.Property(e => e.AdresseTiers)
                    .IsRequired()
                    .HasMaxLength(300);

                entity.Property(e => e.CourrierTiers)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.FaxTiers)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.NomTiers)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.TypeTiers)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasOne(d => d.CodeTiersNavigation)
                    .WithOne(p => p.Tiers)
                    .HasForeignKey<Tiers>(d => d.CodeTiers)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Tiers_Compte");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK_User");

                entity.Property(e => e.AdresseUser).HasMaxLength(400);

                entity.Property(e => e.NomUser)
                    .IsRequired()
                    .HasMaxLength(65);

                entity.Property(e => e.PrenomUser)
                    .IsRequired()
                    .HasMaxLength(65);

                entity.Property(e => e.UsernameUser)
                    .IsRequired()
                    .HasMaxLength(100);
            });
        }

        public virtual DbSet<Compte> Compte { get; set; }
        public virtual DbSet<CoursEchange> CoursEchange { get; set; }
        public virtual DbSet<Devise> Devise { get; set; }
        public virtual DbSet<EcritureComptable> EcritureComptable { get; set; }
        public virtual DbSet<ExerciceComptable> ExerciceComptable { get; set; }
        public virtual DbSet<Facture> Facture { get; set; }
        public virtual DbSet<Journal> Journal { get; set; }
        public virtual DbSet<Lettrage> Lettrage { get; set; }
        public virtual DbSet<OperationComptable> OperationComptable { get; set; }
        public virtual DbSet<PieceJustificatif> PieceJustificatif { get; set; }
        public virtual DbSet<Regulement> Regulement { get; set; }
        public virtual DbSet<Tiers> Tiers { get; set; }
        public virtual DbSet<User> User { get; set; }
    }
}