package com.todolisto.taskapp.Repositories;

import com.todolisto.taskapp.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findUserByUsernameAndPassword(String Username, String password);
    User getUserByUserId(Long id);
}
