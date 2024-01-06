package tr.com.duosignlanguage.dto;

import lombok.Data;
import java.util.Date;

@Data
public class BaseDto {

    private Long id;

    private String createdBy;

    private String lastModifiedBy;

    private Date createdDate;

    private Date lastModifiedDate;

    private Boolean isActive;
}
