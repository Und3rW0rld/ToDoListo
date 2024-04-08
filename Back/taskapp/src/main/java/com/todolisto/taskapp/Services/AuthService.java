package com.todolisto.taskapp.Services;

import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
