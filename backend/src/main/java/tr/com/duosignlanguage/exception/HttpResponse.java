package tr.com.duosignlanguage.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HttpResponse{
    private String message;
    private HttpStatus status;
    private int statusCode;
    protected String timeStamp;
}
