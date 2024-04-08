package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.LoginForm;
import com.todolisto.taskapp.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController( AuthService authService ){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        String username = loginForm.getUsername();
        String password = loginForm.getPassword();

        if (authService.authenticate(username, password)) {
            return ResponseEntity.ok("Inicio de sesión exitoso para el usuario: " + username);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
}
