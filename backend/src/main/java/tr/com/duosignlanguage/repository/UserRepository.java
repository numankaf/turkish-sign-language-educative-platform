package tr.com.duosignlanguage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.duosignlanguage.entity.User;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select u from User u where u.username = :s or u.email = :s ")
    Optional<User> findByUsernameOrEmail(String s);
}
