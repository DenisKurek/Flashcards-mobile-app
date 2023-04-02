package com.ans.backend.set;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashcardsSetRepository extends MongoRepository<FlashcardsSet, ObjectId> {

}
