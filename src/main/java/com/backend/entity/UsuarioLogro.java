package com.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name="usuario_logro")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioLogro {
    @EmbeddedId
    private UsuarioLogroId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("usuarioId")
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("logroId")
    @JoinColumn(name = "logro_id", nullable = false)
    private Logro logro;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd", shape =  JsonFormat.Shape.STRING)
    @Column(name="fecha_obtencion")
    private Date fechaObtencion;
}
