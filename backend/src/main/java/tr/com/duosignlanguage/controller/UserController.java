package tr.com.duosignlanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.duosignlanguage.dto.user.UserDetailDto;
import tr.com.duosignlanguage.dto.user.UserListDto;
import tr.com.duosignlanguage.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/{id}")
    ResponseEntity<UserDetailDto> getById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/all")
    ResponseEntity<List<UserListDto>> getAll(){
        return ResponseEntity.ok(userService.getAll());
    }

}
