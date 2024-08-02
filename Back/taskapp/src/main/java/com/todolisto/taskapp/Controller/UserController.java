package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.Task;
import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class UserController {

    @Value("${server.port}")
    private String port;
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

    @PutMapping("/edit_user/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable(name = "id") long id,
            @RequestBody User user){
        Optional<User> optionalUser = userService.findUserById(id);
        User existingUser = null;
        if (optionalUser.isPresent()) {
            existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            userService.updateUser(existingUser);
        } else {
            return ResponseEntity.badRequest().body("User not found with id " + id);
        }
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "application/json").body(existingUser);
    }

    @PostMapping("/upload/profile-image/{id}")
    public ResponseEntity<?> uploadProfileImage(
            @PathVariable(name="id") long id,
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Por favor sube un archivo válido.");
        }



        try {
            // Guarda el archivo en el sistema de archivos local (puedes cambiar esto según tus necesidades)
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // Devuelve la URL o ruta del archivo guardado
            String fileUrl = "http://localhost:"+port+"/api/v1/"+"uploads/" + fileName;
            Optional<User> user = userService.findUserById(id);
            if(user.isPresent()){
                User presente = user.get();
                presente.setImagen(fileUrl);
                userService.updateUser(presente);
            }
            return ResponseEntity.ok().body(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo.");
        }
    }

    @GetMapping("/img_path/{id}")
    public ResponseEntity<?> getProfileImagen(
            @PathVariable(name="id") long id
    ){
        Optional <User> userOpt = userService.findUserById(id);
        String profileImg = null;
        if (userOpt.isPresent()){
            User user = userOpt.get();
            profileImg = user.getImagen();
        }
        return ResponseEntity.ok().body(profileImg);
    }

}
