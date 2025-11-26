package com.backend.service;

import com.backend.entity.Logro;
import com.backend.exceptions.LogroNotFoundException;
import com.backend.repository.LogroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogroService {
    private final LogroRepository logroRepository;

    public LogroService(LogroRepository logroRepository) {
        this.logroRepository = logroRepository;
    }

    //LISTAR TODOS LOS LOGROS
    public List<Logro> listAll() {
        return this.logroRepository.findAll();
    }

    //ENCONTRAR LOGRO POR NOMBRE
    public Logro findLogroByNombre(String nombre){
        if (logroRepository.existsByNombre(nombre)) {
            return logroRepository.findByNombre(nombre);
        } else {
            throw new RuntimeException("Logro no encontrado");
        }
    }

    //ECONTRAR LOGRO POR ID
    public Logro findLogroById(long id){
        return logroRepository.findById(id)
                .orElseThrow(() ->new LogroNotFoundException(id));
    }

    //GUARDAR LOGRO
    public Logro guardar(Logro logro){
        if (logroRepository.existsByNombre(logro.getNombre())) {
            throw new RuntimeException("El logro ya existe");
        }
        return this.logroRepository.save(logro);
    }

    //REEMPLAZAR LOGRO
    public Logro replace(Long id, Logro logro) {
        return this.logroRepository.findById(id).map(l -> {
            l.setNombre(logro.getNombre());
            l.setDescripcion(logro.getDescripcion());
            return this.logroRepository.save(l);
        }).orElseThrow(() -> new LogroNotFoundException(id));
    }

    //ELIMINAR LOGRO
    public void eliminar(Long id) {
        this.logroRepository.findById(id).map(l -> {this.logroRepository.delete(l);
            return l;}).orElseThrow(() -> new LogroNotFoundException(id));
    }
}
