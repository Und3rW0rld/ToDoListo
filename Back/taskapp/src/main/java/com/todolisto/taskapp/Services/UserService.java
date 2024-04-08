package com.todolisto.taskapp.Services;

import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public  UserService( UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
