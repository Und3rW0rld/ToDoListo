package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.LoginForm;
import com.todolisto.taskapp.Services.AuthService;
import com.todolisto.taskapp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public AuthController( AuthService authService, UserService userService ){
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody LoginForm loginForm) {
        String username = loginForm.getUsername();
        String password = loginForm.getPassword();

        if (authService.authenticate(username, password)) {
            Long userId = userService.findUserByUsernameAndPassword(username, password).getUserId();
            return ResponseEntity.ok(userId); // Devuelve el ID del usuario en la respuesta OK (200)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(-1L); // Devuelve -1 en caso de error de autenticación
        }
    }
}
