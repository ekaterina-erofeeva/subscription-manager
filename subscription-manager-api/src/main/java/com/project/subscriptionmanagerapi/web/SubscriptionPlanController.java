package com.project.subscriptionmanagerapi.web;

import com.project.subscriptionmanagerapi.model.SubscriptionPlan;
import com.project.subscriptionmanagerapi.model.User;
import com.project.subscriptionmanagerapi.repository.SubscriptionPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SubscriptionPlanController {
    @Autowired
    SubscriptionPlanRepository subscriptionPlanRepository;

    @GetMapping("/subscriptionPlans")
    public List<SubscriptionPlan> getSubscriptionPlans(){
        return subscriptionPlanRepository.findAll();
    }

    @PostMapping("/addSubscriptionPlan")
    public ResponseEntity<String> addSubscriptionPlan (@RequestBody SubscriptionPlan subscriptionPlan) {
        Optional<SubscriptionPlan> xSubscriptionPlan = subscriptionPlanRepository.findByName(subscriptionPlan.getName());
        if (xSubscriptionPlan.isPresent()) {
            return new ResponseEntity<>("Subscription plan with name " + subscriptionPlan.getName() + " already exists. ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        subscriptionPlanRepository.save(subscriptionPlan);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping(value = "/subscriptionPlans/{id}")
    public ResponseEntity<String> deleteUser (@PathVariable Integer id){
        Optional<SubscriptionPlan> subscriptionPlan = subscriptionPlanRepository.findById(id);
        if(subscriptionPlan.isPresent()){
            subscriptionPlanRepository.delete(subscriptionPlan.get());
            return new ResponseEntity<>("Removed subscription plan with id: " + id, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
