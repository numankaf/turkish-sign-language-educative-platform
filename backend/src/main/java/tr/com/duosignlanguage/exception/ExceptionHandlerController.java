package tr.com.duosignlanguage.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tr.com.duosignlanguage.exception.domain.UserNotFoundException;
import tr.com.duosignlanguage.exception.util.HttpResponseUtil;

@RestControllerAdvice
@Slf4j
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HttpResponse> handleBadCredentialsException(BadCredentialsException exception) {
        return HttpResponseUtil.createHttpErrorResponse(HttpStatus.UNAUTHORIZED, exception.getMessage(), exception);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<HttpResponse> handleUserNotFoundException(UserNotFoundException exception) {
        return HttpResponseUtil.createHttpErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage(), exception);
    }


}
