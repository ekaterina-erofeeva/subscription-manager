package com.project.subscriptionmanagerapi.repository;

import com.project.subscriptionmanagerapi.model.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Integer> {
    public Optional<SubscriptionPlan> findByName(String name);

    public Optional<SubscriptionPlan> findById(Integer id);
}
