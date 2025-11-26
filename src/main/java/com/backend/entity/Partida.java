package com.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name="partida")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idPartida")
public class Partida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_partida")
    private Long idPartida;

    @ManyToOne()
    @JoinColumn(name = "palabra_id", nullable = false)
    private Palabra palabra;

    @ManyToOne()
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private Integer intentos;

    private String resultado;

    @Column(name="fecha_partida")
    @JsonFormat(pattern = "yyyy-MM-dd", shape =  JsonFormat.Shape.STRING)
    @Temporal(TemporalType.DATE)
    private Date fecha;

    private Integer puntuacion;
}
