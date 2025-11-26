package com.backend.controller;

import com.backend.exceptions.PartidaNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PartidaNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PartidaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String partidaNotFoundHandler(PartidaNotFoundException ex) {
        return ex.getMessage();
    }
}
