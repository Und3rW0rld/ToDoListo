package com.todolisto.taskapp.Controller;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {
    private String name;
    private long userId;

    // Getters y setters
}
