package tr.com.duosignlanguage.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import tr.com.duosignlanguage.dto.user.UserDetailDto;
import tr.com.duosignlanguage.dto.user.UserListDto;
import tr.com.duosignlanguage.entity.User;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface UserMapper {
    UserDetailDto toDetailDto(User user);
    UserListDto toListDto(User user);
}
