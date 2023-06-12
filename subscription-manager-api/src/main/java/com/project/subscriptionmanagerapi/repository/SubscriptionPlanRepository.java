package com.project.subscriptionmanagerapi.repository;

import com.project.subscriptionmanagerapi.model.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Integer> {
    @Query(value = "SELECT s FROM SubscriptionPlan s WHERE s.name=:name")
    public Optional<SubscriptionPlan> findByName(String name);

    @Query(value = "SELECT s FROM SubscriptionPlan s WHERE s.id=:id")
    public Optional<SubscriptionPlan> findById(Integer id);
}
