package com.backend.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="logro")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idLogro")
public class Logro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_logro")
    private Long idLogro;

    private String nombre;

    private String descripcion;

    @OneToMany(mappedBy = "logro", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    private Set<UsuarioLogro> usuarioLogros;
}
