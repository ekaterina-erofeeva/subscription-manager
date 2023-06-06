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
    public List<SubscriptionPlan> getUsers(){
        return subscriptionPlanRepository.findAll();
    }

    @PostMapping("/addSubscription")
    public void addSubscription(@RequestBody SubscriptionPlan subscriptionPlan){
        subscriptionPlanRepository.save(subscriptionPlan);
    }
}
