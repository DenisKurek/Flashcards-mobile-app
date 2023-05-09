package com.ans.backend.flashcard;

import org.bson.types.ObjectId;

public record CreateFlashcardRequest(String concept, String definition, ObjectId setId) {
}
