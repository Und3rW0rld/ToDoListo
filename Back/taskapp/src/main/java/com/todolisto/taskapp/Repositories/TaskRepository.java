package com.todolisto.taskapp.Repositories;

import com.todolisto.taskapp.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
