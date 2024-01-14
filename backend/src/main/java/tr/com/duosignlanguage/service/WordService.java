package tr.com.duosignlanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import tr.com.duosignlanguage.dto.word.WordSearchDto;
import tr.com.duosignlanguage.entity.Word;
import tr.com.duosignlanguage.mapper.WordMapper;
import tr.com.duosignlanguage.repository.WordRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WordService{
    private final WordRepository wordRepository;
    private final WordMapper wordMapper;

    public Word findById(Long id){
        Word word = wordRepository.findById(id).orElseThrow();
        return word;
    }

    public List<Word> findAll(){
        List<Word> words = wordRepository.findAll();
        return words;
    }

    public Page<Word> findAll(Pageable pageable){
        Page<Word> words = wordRepository.findAll(pageable);
        List<Word> wordList =  words.stream().toList();
        return  new PageImpl<>(wordList,pageable,words.getTotalElements());
    }


    public Page<Word> search(WordSearchDto dto, Pageable pageable){
        Word exampleWord= wordMapper.toEntity(dto);
        ExampleMatcher matcher = ExampleMatcher.matchingAll().withIgnoreCase().withIgnoreNullValues()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Word> example = Example.of(exampleWord,matcher);
        Page<Word> words = wordRepository.findAll(example, pageable);
        List<Word> wordList =  words.stream().toList();
        return  new PageImpl<>(wordList,pageable,words.getTotalElements());
    }



}
