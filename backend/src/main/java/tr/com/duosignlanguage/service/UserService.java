package tr.com.duosignlanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.com.duosignlanguage.dto.user.UserDetailDto;
import tr.com.duosignlanguage.dto.user.UserListDto;
import tr.com.duosignlanguage.entity.User;
import tr.com.duosignlanguage.exception.domain.UserNotFoundException;
import tr.com.duosignlanguage.mapper.UserMapper;
import tr.com.duosignlanguage.repository.UserRepository;

import java.util.List;

import static tr.com.duosignlanguage.exception.constant.ExceptionConstant.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDetailDto getById(Long id){
        User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException(USER_NOT_FOUND));
        return userMapper.toDetailDto(user);
    }

    public List<UserListDto> getAll(){
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toListDto).toList();
    }
}
