package com.project.subscriptionmanagerapi.web;

import com.project.subscriptionmanagerapi.model.SubscriptionPlan;
import com.project.subscriptionmanagerapi.model.User;
import com.project.subscriptionmanagerapi.repository.SubscriptionPlanRepository;
import com.project.subscriptionmanagerapi.repository.UserRepository;
import org.hibernate.persister.entity.SingleTableEntityPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private static class UserSubscription{
        private String userEmail;
        private String subscriptionPlan;

        public UserSubscription() {
        }

        public String getSubscriptionPlan() {
            return subscriptionPlan;
        }
        public String getUserEmail(){
            return userEmail;
        }

    }
    @Autowired
    UserRepository userRepository;
    @Autowired
    SubscriptionPlanRepository subscriptionPlanRepository;

    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser (@RequestBody User user){
        Optional<User> xUser =  userRepository.findByEmail(user.getEmail());
        if (xUser.isPresent()) {
            return new ResponseEntity<>("User with email " + user.getEmail() + " already exists. ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        java.util.Date currentDate = new java.util.Date();
        Date joinedAt = new Date(currentDate.getTime());
        user.setJoinedAt(joinedAt);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

   @DeleteMapping(value = "/users/{id}")
   public ResponseEntity<String> deleteUser (@PathVariable Integer id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return new ResponseEntity<>("Removed user with id: " + id, HttpStatus.OK);
        }
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

    @PostMapping("/bookSubscription")
    public void bookSubscription (@RequestBody UserSubscription userSubscription) {
        Optional<User> user = userRepository.findByEmail(userSubscription.getUserEmail());
        Optional<SubscriptionPlan> subscriptionPlan = subscriptionPlanRepository.findByName(userSubscription.getSubscriptionPlan());
        if(user.isPresent() && subscriptionPlan.isPresent()) {
            user.get().setPlanId(subscriptionPlan.get().getPlanId());
            userRepository.save(user.get());
        }
    }
}
