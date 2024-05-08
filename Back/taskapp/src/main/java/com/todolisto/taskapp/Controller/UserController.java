package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.Task;
import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/email")
    public ResponseEntity<String> getUserEmail(@PathVariable Long userId) {
        // Obtener el correo electrónico del usuario utilizando el ID del usuario
        String userEmail = userService.getUserEmail(userId);
        if (userEmail != null) {
            return ResponseEntity.ok(userEmail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get_categories/{id}")
    public List<Category> getCategories(@PathVariable long id){
        return userService.getAllUserCategoriesById(id);
    }

    @GetMapping("/get_tasks/{id}")
    public List<Task> getTasks(@PathVariable long id){
        return userService.getAllUserTasksById(id);
    }

    @GetMapping("/test")
    @ResponseBody
    public String test(){
        return"hola user controller";
    }
}
