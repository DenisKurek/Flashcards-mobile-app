package com.ans.backend.set;

import com.ans.backend.flashcard.Flashcard;
import com.ans.backend.user.User;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FlashcardsSetService {

    @Autowired
    private FlashcardsSetRepository flashcardsSetRepository;


    @Autowired
    private MongoTemplate mongoTemplate;

    public List<FlashcardsSet> allSets(){
        return flashcardsSetRepository.findAll();
    }

    public Optional<FlashcardsSet> singleSet(ObjectId id){
        return flashcardsSetRepository.findById(id);
    }

    public FlashcardsSet createSet(String title, String userEmail){
        FlashcardsSet flashcardsSet = flashcardsSetRepository.insert(new FlashcardsSet(title));

       UpdateResult result = mongoTemplate.update(User.class)
                .matching(Criteria.where("emailAddress").is(userEmail))
                .apply(new Update().push("setsIds").value(flashcardsSet))
                .first();
        System.out.println(result);
        return flashcardsSet;
    }

    public List<Flashcard> flashcardsInSet(ObjectId setId){
        var optionalSet = singleSet(setId);
        if(optionalSet.isEmpty()){
            throw new RuntimeException("setNotFound");
        }
        return optionalSet.get().getFlashcardsIds();
    }

    public void deleteSet(ObjectId id, String userEmail) {
        flashcardsSetRepository.deleteById(id);
        UpdateResult result = mongoTemplate.update(User.class)
                .matching(Criteria.where("emailAddress").is(userEmail))
                .apply(new Update().pull("setsIds", id))
                .first();
        System.out.println(result);
    }
}
