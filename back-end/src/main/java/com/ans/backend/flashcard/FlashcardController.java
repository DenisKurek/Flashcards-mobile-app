package com.ans.backend.flashcard;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    @Autowired
    private FlashcardService flashcardService;

    @GetMapping
    public ResponseEntity<List<Flashcard>> getAllFlashcards(){
        return new ResponseEntity<>(flashcardService.allFlashcards(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Flashcard>> getFlashcard(@PathVariable ObjectId id){
        return  new ResponseEntity<>(flashcardService.singleFlashcard(id),HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Flashcard> createFlashcard(@RequestBody CreateFlashcardRequest request) {
        return new ResponseEntity<>(flashcardService.createFlashcard(request.concept(),request.definition(), request.set()),HttpStatus.CREATED);
    }

}
