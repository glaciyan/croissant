﻿// <auto-generated />
using System;
using Croissant.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Croissant.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Entities.Models.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Content")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("content");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("character varying(70)")
                        .HasColumnName("title");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_posts");

                    b.ToTable("posts");

                    b.HasData(
                        new
                        {
                            Id = new Guid("267cec85-dcdb-4253-97fb-014563794ebb"),
                            Content = "Testing Post Content",
                            CreatedAt = new DateTime(2021, 9, 17, 15, 13, 8, 315, DateTimeKind.Local).AddTicks(5432),
                            Title = "Testing Post",
                            UpdatedAt = new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(2779)
                        },
                        new
                        {
                            Id = new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"),
                            Content = "Content of the other testing Post",
                            CreatedAt = new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(3192),
                            Title = "Another Testing Post",
                            UpdatedAt = new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(3205)
                        });
                });
#pragma warning restore 612, 618
        }
    }
}