package com.todolisto.taskapp.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long task_id;
    private String taskName;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String description;
    @Enumerated(EnumType.STRING)
    private State state;

    @ManyToMany
    @JoinTable(
            name = "task_category", // Nombre de la tabla de unión
            joinColumns = @JoinColumn(name = "task_id"), // Columna que referencia a la entidad Task
            inverseJoinColumns = @JoinColumn(name = "category_id") // Columna que referencia a la entidad Category
    )
    private Set<Category> categories = new HashSet<>(); // Relación Many-to-Many con la entidad Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
