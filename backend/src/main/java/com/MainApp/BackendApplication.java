
package com.MainApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner printPasswordHash(PasswordEncoder encoder) {
        return args -> System.out.println(
            "NEW PASSWORD HASH: " + encoder.encode("Sneaker@123")
        );
    }
}
