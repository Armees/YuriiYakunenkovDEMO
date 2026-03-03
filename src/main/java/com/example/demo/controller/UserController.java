package com.example.demo.controller;

import com.example.demo.repository.model.UserEntity;
import com.example.demo.repository.model.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfo> resultUsers = new ArrayList<>();
        for (UserEntity user : users) {
            resultUsers.add(new UserInfo(user.getId(),user.getFirstName(), user.getLastName()));
        }

        return ResponseEntity.ok(resultUsers);
    }

    @PostMapping("/users")
    public ResponseEntity<UserInfo> createUser(@RequestBody UserInfo userInfo) {
        userRepository.save(new UserEntity(userInfo.getFirstName(), userInfo.getLastName()));
        return ResponseEntity.ok(new UserInfo(userInfo.getId(), userInfo.getFirstName(), userInfo.getLastName()));

    }

    @DeleteMapping("/users")
    public ResponseEntity<Void> deleteUser() {
        userRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/lastname")
    public ResponseEntity<Void> updateAllLastNames() {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity user : users) {
            user.setLastName("Yakunenkov");
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/firstname")
    public ResponseEntity<Void> updateAllFirstNames() {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity user : users) {
            user.setFirstName("Yurii");
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/even")
    public ResponseEntity<Void> deleteEvenUsers() {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity user : users) {
            if (user.getId() % 2 == 0) {
                userRepository.delete(user);
            }
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
