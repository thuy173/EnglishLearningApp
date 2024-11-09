package com.example.elearningapi.handler;

import com.example.elearningapi.beans.response.MessageResponse;
import com.example.elearningapi.exception.BadRequestException;
import com.example.elearningapi.exception.ConflictException;
import com.example.elearningapi.exception.EmptyException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody MessageResponse handleDataNotFoundException(ResourceNotFoundException e) {
        return new MessageResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }

    @ExceptionHandler(EmptyException.class)
    public @ResponseBody MessageResponse handleEmptyException(EmptyException e) {
        return new MessageResponse(HttpStatus.NO_CONTENT.value(), e.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody MessageResponse handleDuplicateException(BadRequestException e) {
        return new MessageResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public @ResponseBody MessageResponse handleConflictException(ConflictException e) {
        return new MessageResponse(HttpStatus.CONFLICT.value(), e.getMessage());
    }
}
