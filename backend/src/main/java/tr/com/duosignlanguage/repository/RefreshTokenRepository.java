package tr.com.duosignlanguage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.duosignlanguage.entity.RefreshToken;

import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    void deleteAllByUserId(Long id);
}
