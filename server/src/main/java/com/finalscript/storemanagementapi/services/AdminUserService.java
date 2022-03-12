package com.finalscript.storemanagementapi.services;

import com.finalscript.storemanagementapi.models.AdminUser;
import com.finalscript.storemanagementapi.repositories.AdminUserRepository;
import com.finalscript.storemanagementapi.utility.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AdminUserService {
    private final AdminUserRepository adminUserRepository;

    @Autowired
    public AdminUserService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }

    public AdminUser getAdmin(Long id) {
        Optional<AdminUser> userOptional = adminUserRepository.findById(id);

        if(userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exist");
        }

        return userOptional.get();
    }

    public AdminUser register(AdminUser newUser) {
        Optional<AdminUser> userOptional = adminUserRepository.findAdminUserByUsername(newUser.getUsername());

        if (userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with that username already exists");
        }

        if (newUser.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 6 characters long");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        newUser.setPassword(encoder.encode(newUser.getPassword()));

        AdminUser savedUser = adminUserRepository.save(newUser);

        savedUser.setToken(JWT.getJWTToken(savedUser));

        return savedUser;
    }

    public AdminUser login(AdminUser user) {
        Optional<AdminUser> userOptional = adminUserRepository.findAdminUserByUsername(user.getUsername());

        if(userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account with that username does not exist");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if(!encoder.matches(user.getPassword(), userOptional.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username/Password combination invalid");
        }

        userOptional.get().setToken(JWT.getJWTToken(userOptional.get()));

        return userOptional.get();
    }

}
