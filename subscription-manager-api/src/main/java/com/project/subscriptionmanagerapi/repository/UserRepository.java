package com.project.subscriptionmanagerapi.repository;

import com.project.subscriptionmanagerapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT u FROM User u WHERE u.email=:email")
    public Optional<User> findByEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.userId=:userId")
    public Optional<User> findById(Integer userId);
}
