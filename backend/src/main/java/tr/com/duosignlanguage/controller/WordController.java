package tr.com.duosignlanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.duosignlanguage.dto.word.WordSearchDto;
import tr.com.duosignlanguage.entity.Word;
import tr.com.duosignlanguage.service.WordService;

import java.util.List;

@RestController
@RequestMapping("/word")
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;

    @GetMapping("/{id}")
    public ResponseEntity<Word> findById(@PathVariable Long id){
        return ResponseEntity.ok(wordService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Word>> findAll(){
        return ResponseEntity.ok(wordService.findAll());
    }
    @GetMapping("/")
    public ResponseEntity<Page<Word>> findAll(Pageable pageable){
        return ResponseEntity.ok(wordService.findAll(pageable));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<Word>> search(@RequestBody WordSearchDto dto, Pageable pageable){
        return ResponseEntity.ok(wordService.search(dto,pageable));
    }


}
