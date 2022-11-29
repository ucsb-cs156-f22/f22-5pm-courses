package edu.ucsb.cs156.courses.jobs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import edu.ucsb.cs156.courses.services.UCSBSubjectsService;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UpdateCourseDataWithQuarterRangeJobFactory  {

    @Autowired
    private UCSBSubjectsService ucsbSubjectService;

    @Autowired
    private UCSBCurriculumService ucsbCurriculumService;

    @Autowired
    private ConvertedSectionCollection convertedSectionCollection;

    public UpdateCourseDataWithQuarterRangeJob create(String quarterYYYYQ1, String quarterYYYYQ2) {
        log.info("ucsbSubjectService = " + ucsbSubjectService);
        log.info("ucsbCurriculumService = " + ucsbCurriculumService);
        log.info("convertedSectionCollection = " + convertedSectionCollection);
        return new UpdateCourseDataWithQuarterRangeJob(quarterYYYYQ1, quarterYYYYQ2, ucsbSubjectService, ucsbCurriculumService, convertedSectionCollection);
    }
}