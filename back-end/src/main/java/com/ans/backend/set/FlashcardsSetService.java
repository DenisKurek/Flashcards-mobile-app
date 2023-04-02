package com.ans.backend.set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlashcardsSetService {

    @Autowired
    private FlashcardsSetRepository flashcardsSetRepository;

    public List<FlashcardsSet> allSets(){
        return flashcardsSetRepository.findAll();
    }

    public Optional<FlashcardsSet> singleSet(ObjectId id){
        return flashcardsSetRepository.findById(id);
    }
}
