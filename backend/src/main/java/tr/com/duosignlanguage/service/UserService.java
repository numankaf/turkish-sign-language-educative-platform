package tr.com.duosignlanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.com.duosignlanguage.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}
