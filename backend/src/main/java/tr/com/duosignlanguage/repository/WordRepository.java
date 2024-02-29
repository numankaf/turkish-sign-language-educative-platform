package tr.com.duosignlanguage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.duosignlanguage.entity.Word;
@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

}
