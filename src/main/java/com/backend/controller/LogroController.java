package com.backend.controller;

import com.backend.entity.Logro;
import com.backend.service.LogroService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/logros")
public class LogroController {
    private final LogroService logroService;

    public LogroController(LogroService logroService) {
        this.logroService = logroService;
    }

    @GetMapping(value = {"", "/"})
    public List<Logro> listAll() {
        log.info("Listando todos los logros");
        return this.logroService.listAll();
    }

    @GetMapping("/{logro}")
    public Logro buscarPorLogro(@PathVariable String logro) {
        return this.logroService.findLogroByNombre(logro);
    }

    @PostMapping({"", "/"})
    public Logro guardar(@RequestBody Logro logro) {
        return this.logroService.guardar(logro);
    }

    @PutMapping("/{id}")
    public Logro replace(@PathVariable Long id, @RequestBody Logro logro) {
        return this.logroService.replace(id, logro);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.logroService.eliminar(id);
    }
}
