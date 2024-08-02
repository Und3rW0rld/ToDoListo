package com.todolisto.taskapp.Services;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.Task;
import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public User findUserByUsernameAndPassword(String username, String password) {
        return userRepository.findUserByUsernameAndPassword(username, password);
    }

    public String getUserEmail(Long userId) {
        User user = userRepository.getUserByUserId(userId);
        return user.getEmail();
    }
    public List<Category> getAllUserCategoriesById(long id){
        return userRepository.getUserByUserId(id).getCategories();
    }

    public Optional<User> findUserById (long id){
        return userRepository.findById(id);
    }

    public List<Task> getAllUserTasksById(long id) {
        return userRepository.getUserByUserId(id).getTasks();
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }
}
