package com.todolisto.taskapp.Repositories;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category getCategoriesByName(String name);
    void deleteByName(String name);
    List<Category> getCategoriesByUser(User user);
}
