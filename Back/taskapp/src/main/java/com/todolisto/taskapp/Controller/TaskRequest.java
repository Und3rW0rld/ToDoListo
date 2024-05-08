package com.todolisto.taskapp.Controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    private String taskName;
    private String priority;
    private String date;
    private String [] categories;
    private String description;
    private String state;
    private long userId;
}
