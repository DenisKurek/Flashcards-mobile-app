package com.ans.backend.set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
