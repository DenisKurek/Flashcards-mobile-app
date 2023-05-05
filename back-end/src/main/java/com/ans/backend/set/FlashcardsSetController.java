package com.ans.backend.set;

import com.ans.backend.flashcard.Flashcard;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sets")
public class FlashcardsSetController {

    @Autowired
    private FlashcardsSetService flashcardsSetService;

    @GetMapping
    public ResponseEntity<List<FlashcardsSet>> getAllSets(){
        return new ResponseEntity<>(flashcardsSetService.allSets(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<FlashcardsSet>> getSet(@PathVariable ObjectId id){
        return  new ResponseEntity<>(flashcardsSetService.singleSet(id),HttpStatus.OK);
    }

    @GetMapping("/{id}/flashcards")
    public ResponseEntity<List<Flashcard>> getFlashcardsInSet(@PathVariable ObjectId id){
        try {
            return new ResponseEntity<>(flashcardsSetService.flashcardsInSet(id), HttpStatus.OK);
        }catch (RuntimeException e){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }


    @PostMapping("/add")
    public ResponseEntity<FlashcardsSet> createSet(@RequestBody CreateSetRequest request) {
        return new ResponseEntity<>(flashcardsSetService.createSet(request.title(),request.user()),HttpStatus.CREATED);
    }
}
