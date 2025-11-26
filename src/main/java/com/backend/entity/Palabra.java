package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name="palabra")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idPalabra")
public class Palabra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_palabra")
    private Long idPalabra;

    private String palabra;

    private Integer tamanio;

    private String descripcion;

    private String categoria;
}
