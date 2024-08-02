package com.todolisto.taskapp.Controller;

import com.todolisto.taskapp.Entities.*;
import com.todolisto.taskapp.Repositories.CategoryRepository;
import com.todolisto.taskapp.Repositories.UserRepository;
import com.todolisto.taskapp.Services.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
public class TaskController {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TaskService taskService;
    public TaskController(UserRepository userRepository, CategoryRepository categoryRepository, TaskService taskService) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.taskService = taskService;
    }

    @PostMapping("/create_task")
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest taskRequest) throws ParseException {
        System.out.println(Arrays.toString(taskRequest.getCategories()) +taskRequest.getTaskName()+taskRequest.getPriority()+taskRequest.getDate());
        long userId = taskRequest.getUserId();
        String name = taskRequest.getTaskName();
        String dateString = taskRequest.getDate();
        String description = taskRequest.getDescription();
        String categoryName = taskRequest.getCategories()[0];
        String importance = taskRequest.getPriority();
        User user = userRepository.getUserByUserId(userId);
        Category category = categoryRepository.getCategoriesByName(categoryName);
        System.out.println(categoryName);
        Task task = new Task();
        task.setTaskName(name);
        task.setCategories(new HashSet<>(Set.of(category)));
        task.setUser(user);
        task.setDescription(description);
        Priority priority = null;
        if(importance.equalsIgnoreCase("important")){
            priority = Priority.IMPORTANT;
        }else if(importance.equalsIgnoreCase("habitual")){
            priority = Priority.HABITUAL;
        }else if(importance.equalsIgnoreCase("no_important")){
            priority = Priority.NO_IMPORTANT;
        }
        task.setPriority(priority);
        String stateValue = taskRequest.getState();
        State state = null;
        if(stateValue.equalsIgnoreCase("to_do")){
            state = State.TO_DO;
        }else if(stateValue.equalsIgnoreCase("completed")){
            state = State.COMPLETED;
        }else if(stateValue.equalsIgnoreCase("pending")){
            state = State.PENDING;
        }
        task.setState(state);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        try {
            date = dateFormat.parse(dateString);
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        task.setDate(date);
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/edit_task/{taskId}")
    public ResponseEntity<Task> editTask(@PathVariable Long taskId, @RequestBody TaskRequest taskRequest) {
        Optional<Task> optionalTask = taskService.findById(taskId);
        if (!optionalTask.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Task task = optionalTask.get();
        task.setTaskName(taskRequest.getTaskName());
        task.setDescription(taskRequest.getDescription());

        String categoryName = taskRequest.getCategories()[0];
        Category category = categoryRepository.getCategoriesByName(categoryName);
        task.setCategories(new HashSet<>(Set.of(category)));

        Priority priority = null;
        String importance = taskRequest.getPriority();
        if (importance.equalsIgnoreCase("important")) {
            priority = Priority.IMPORTANT;
        } else if (importance.equalsIgnoreCase("habitual")) {
            priority = Priority.HABITUAL;
        } else if (importance.equalsIgnoreCase("no_important")) {
            priority = Priority.NO_IMPORTANT;
        }
        task.setPriority(priority);

        State state = null;
        String stateValue = taskRequest.getState();
        if (stateValue.equalsIgnoreCase("to_do")) {
            state = State.TO_DO;
        } else if (stateValue.equalsIgnoreCase("completed")) {
            state = State.COMPLETED;
        } else if (stateValue.equalsIgnoreCase("pending")) {
            state = State.PENDING;
        }
        task.setState(state);

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date;
        try {
            date = dateFormat.parse(taskRequest.getDate());
        } catch (java.text.ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        task.setDate(date);

        Task updatedTask = taskService.updateTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete_task/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        boolean isDeleted = taskService.deleteTask(taskId);
        if (!isDeleted) {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    }

}
