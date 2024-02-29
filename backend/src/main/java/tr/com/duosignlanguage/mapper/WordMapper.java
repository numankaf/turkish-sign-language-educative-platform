package tr.com.duosignlanguage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import tr.com.duosignlanguage.dto.word.WordSearchDto;
import tr.com.duosignlanguage.entity.Word;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface WordMapper {
    Word toEntity(WordSearchDto dto);
}
