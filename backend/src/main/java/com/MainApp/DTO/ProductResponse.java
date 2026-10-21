
package com.MainApp.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String color;
    private double price;
    private String description;
    private String imageUrl;
    private List<Integer> sizes;
    private String category;
}
