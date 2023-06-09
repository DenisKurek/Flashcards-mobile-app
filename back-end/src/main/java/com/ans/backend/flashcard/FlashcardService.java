package com.ans.backend.flashcard;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;

    public FlashcardService(FlashcardRepository flashcardRepository) {
        this.flashcardRepository = flashcardRepository;
    }

    public List<Flashcard> allFlashcards(){
        return flashcardRepository.findAll();
    }

    public Optional<Flashcard> singleFlashcard(ObjectId id){
        return flashcardRepository.findById(id);
    }
}
