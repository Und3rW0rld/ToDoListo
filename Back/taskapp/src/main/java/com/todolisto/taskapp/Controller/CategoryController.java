package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Repositories.UserRepository;
import com.todolisto.taskapp.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class CategoryController {
    private final CategoryService categoryService;
    private final UserRepository userRepository;

    @Autowired
    public CategoryController(CategoryService categoryService, UserRepository userRepository) {
        this.categoryService = categoryService;
        this.userRepository = userRepository;
    }

    @PostMapping("/create_category")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest categoryRequest){
        long user_id = categoryRequest.getUserId();
        String name = categoryRequest.getName();
        User user = userRepository.getUserByUserId(user_id);
        Category category = new Category();
        category.setName(name);
        category.setUser(user);
        Category createdCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete_category/{name}")
    public ResponseEntity<String> deleteCategory(@PathVariable String name){
        categoryService.deleteByName(name);
        return new ResponseEntity<>("Category deleted successfully",  HttpStatus.OK);
    }

    @PostMapping("/update_category/{name}")
    public ResponseEntity<Category> updateCategory(@PathVariable String name, @RequestBody CategoryRequest categoryRequest) {
        long user_id = categoryRequest.getUserId();
        Category category = categoryService.getCategoryByName(name);
        String categoryName = categoryRequest.getName();
        User user = userRepository.getUserByUserId(user_id);
        category.setName(categoryName);
        category.setUser(user);
        Category updatedCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

}