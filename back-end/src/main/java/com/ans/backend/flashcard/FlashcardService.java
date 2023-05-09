package com.ans.backend.flashcard;

import com.ans.backend.set.FlashcardsSet;
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
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public FlashcardService(FlashcardRepository flashcardRepository) {
        this.flashcardRepository = flashcardRepository;
    }

    public List<Flashcard> allFlashcards(){
        return flashcardRepository.findAll();
    }

    public Optional<Flashcard> singleFlashcard(ObjectId id){
        return flashcardRepository.findById(id);
    }

    public Flashcard createFlashcard(String concept, String definition, ObjectId setId) {
        Flashcard flashcard = flashcardRepository.insert(new Flashcard(concept, definition));

        UpdateResult result = mongoTemplate.update(FlashcardsSet.class)
                .matching(Criteria.where("_id").is(setId))
                .apply(new Update().push("flashcardsIds", flashcard))
                .first();
        System.out.println(result);
        return flashcard;
    }

    public Flashcard editFlashcard(ObjectId id, String concept, String definition) {
        Flashcard flashcard = flashcardRepository.findById(id).orElseThrow(RuntimeException::new);
        flashcard.setConcept(concept);
        flashcard.setDefinition(definition);
        flashcardRepository.save(flashcard);
        return  flashcard;
    }


    public void deleteFlashcard(ObjectId id) {
        flashcardRepository.deleteById(id);
        UpdateResult result = mongoTemplate.update(FlashcardsSet.class)
                .matching(Criteria.where("flashcardsIds").in(id))
                .apply(new Update().pull("flashcardsIds", id))
                .first();
        System.out.println(result);
    }
}
