package com.MainApp.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String color;
    private double price;
    private String description;
    private List<Integer> sizes;
}