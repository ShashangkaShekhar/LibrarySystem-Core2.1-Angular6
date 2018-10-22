using System;
using DataUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataModels.EntityModels
{
    public partial class LibraryDBContext : DbContext
    {
        public LibraryDBContext()
        {
        }

        public LibraryDBContext(DbContextOptions<LibraryDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookIssuereturn> BookIssuereturn { get; set; }
        public virtual DbSet<BookIssuereturndetails> BookIssuereturndetails { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserAuthentication> UserAuthentication { get; set; }
        public virtual DbSet<UserType> UserType { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(StaticInfos.conString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>(entity =>
            {
                entity.ToTable("author");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Authorid).HasColumnName("authorid");

                entity.Property(e => e.Authorname)
                    .HasColumnName("authorname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("book");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Authorid).HasColumnName("authorid");

                entity.Property(e => e.Bookid).HasColumnName("bookid");

                entity.Property(e => e.Bookname)
                    .HasColumnName("bookname")
                    .HasMaxLength(50);

                entity.Property(e => e.Category).HasColumnName("category");

                entity.Property(e => e.Coverimage)
                    .HasColumnName("coverimage")
                    .HasMaxLength(250);

                entity.Property(e => e.Description).HasColumnName("description");
            });

            modelBuilder.Entity<BookIssuereturn>(entity =>
            {
                entity.ToTable("book_issuereturn");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Duedate)
                    .HasColumnName("duedate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Issuedate)
                    .HasColumnName("issuedate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Issueid).HasColumnName("issueid");

                entity.Property(e => e.Issueto).HasColumnName("issueto");

                entity.Property(e => e.Returndate)
                    .HasColumnName("returndate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<BookIssuereturndetails>(entity =>
            {
                entity.ToTable("book_issuereturndetails");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Bookid).HasColumnName("bookid");

                entity.Property(e => e.Issueid).HasColumnName("issueid");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Categoryname)
                    .HasColumnName("categoryname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Contact)
                    .HasColumnName("contact")
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Firstname)
                    .HasColumnName("firstname")
                    .HasMaxLength(50);

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasMaxLength(50);

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Usertype).HasColumnName("usertype");
            });

            modelBuilder.Entity<UserAuthentication>(entity =>
            {
                entity.ToTable("user_authentication");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Joindate)
                    .HasColumnName("joindate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(50);

                entity.Property(e => e.Userpass)
                    .HasColumnName("userpass")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("user_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasMaxLength(50);
            });
        }
    }
}
