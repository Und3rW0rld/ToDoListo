package Controller;

import Entities.User;
import Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/a")
    @ResponseBody
    public String prueba(){
        System.out.println("Se alcanzó el controlador de prueba.");
        return "hola";
    }

    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        System.out.println(user);
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
