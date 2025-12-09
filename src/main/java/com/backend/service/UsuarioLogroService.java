package com.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.entity.Logro;
import com.backend.entity.Usuario;
import com.backend.entity.UsuarioLogro;
import com.backend.entity.UsuarioLogroId;
import com.backend.exceptions.LogroNotFoundException;
import com.backend.exceptions.UsuarioNotFoundException;
import com.backend.repository.LogroRepository;
import com.backend.repository.UsuarioLogroRepository;
import com.backend.repository.UsuarioRepository;

@Service
public class UsuarioLogroService {
    private final UsuarioLogroRepository usuarioLogroRepository;
    private final UsuarioRepository usuarioRepository;
    private final LogroRepository logroRepository;

    public UsuarioLogroService(UsuarioLogroRepository usuarioLogroRepository, UsuarioRepository usuarioRepository, LogroRepository logroRepository) {
        this.usuarioLogroRepository = usuarioLogroRepository;
        this.usuarioRepository = usuarioRepository;
        this.logroRepository = logroRepository;
    }

    //TIENE LOGRO
    public boolean usuarioTieneLogro(Long usuarioId, Long logroId) {
        UsuarioLogroId id = new UsuarioLogroId(usuarioId, logroId);
        return usuarioLogroRepository.existsById(id);
    }

    //LISTAR LOGROS DE UN USUARIO
    public List<UsuarioLogro> listByUsuario(Usuario usuario) {
        return this.usuarioLogroRepository.findByUsuario(usuario);
    }

    //ASIGNAR LOGRO A UN USUARIO
    public UsuarioLogro guardarLogroEnUsuario(Long usuarioId, Long logroId, Date fechaObtencion) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNotFoundException(usuarioId));
        Logro logro = logroRepository.findById(logroId)
                .orElseThrow(() -> new LogroNotFoundException(logroId));

        UsuarioLogro usuarioLogro = new UsuarioLogro();
        usuarioLogro.setId(new UsuarioLogroId(usuarioId, logroId));
        usuarioLogro.setUsuario(usuario);
        usuarioLogro.setLogro(logro);
        usuarioLogro.setFechaObtencion(fechaObtencion);
        return usuarioLogroRepository.save(usuarioLogro);
    }

    //ELIMINAR LOGRO DE UN USUARIO
    public void eliminarLogroDeUsuario(Long usuarioId, Long logroId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new UsuarioNotFoundException(usuarioId);
        }
        if (!logroRepository.existsById(logroId)) {
            throw new LogroNotFoundException(logroId);
        }
        UsuarioLogroId id = new UsuarioLogroId(usuarioId, logroId);
        usuarioLogroRepository.deleteById(id);
    }
}
