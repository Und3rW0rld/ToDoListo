package com.todolisto.taskapp.Services;

import com.todolisto.taskapp.Entities.Task;
import com.todolisto.taskapp.Repositories.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
}
