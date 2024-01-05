package tr.com.duosignlanguage.exception.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tr.com.duosignlanguage.exception.HttpResponse;

import java.time.LocalDateTime;
public class HttpResponseUtil {

    public static ResponseEntity<HttpResponse> createHttpErrorResponse(HttpStatus httpStatus, String message, Exception exception) {
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message(message)
                        .status(httpStatus)
                        .statusCode(httpStatus.value())
                        .timeStamp(LocalDateTime.now().format(DateUtil.dateTimeFormatter()))
                        .build(), httpStatus);
    }

    public static ResponseEntity<HttpResponse> createHttpResponse(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message(message)
                        .status(httpStatus)
                        .statusCode(httpStatus.value())
                        .timeStamp(LocalDateTime.now().format(DateUtil.dateTimeFormatter()))
                        .build(), httpStatus);
    }


}
