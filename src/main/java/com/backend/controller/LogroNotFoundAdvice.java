package com.backend.controller;


import com.backend.exceptions.LogroNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class LogroNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(LogroNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String logroNotFoundHandler(LogroNotFoundException ex) {
        return ex.getMessage();
    }
}
