
package com.MainApp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MainApp.Entity.UserEntity;
import com.MainApp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public UserEntity registerUser(UserEntity user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Get All Users
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User By ID
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    

    // Login User
    public String loginUser(String email, String password) {

        UserEntity user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }

        return jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );
    }
}
