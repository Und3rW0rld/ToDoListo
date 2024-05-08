package com.todolisto.taskapp.Services;

import com.todolisto.taskapp.Entities.Category;
import com.todolisto.taskapp.Entities.User;
import com.todolisto.taskapp.Repositories.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category){
        this.categoryRepository.save(category);
        return category;
    }

    public Category getCategoryByName(String category){
        return categoryRepository.getCategoriesByName(category);
    }

    public Category getCategoryById(long id){
        return categoryRepository.getReferenceById(id);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public List<Category> getCategoriesByUser(User user){
        return categoryRepository.getCategoriesByUser(user);
    }

    @Transactional
    public void deleteByName(String name){
        categoryRepository.deleteByName(name);
    }

}
