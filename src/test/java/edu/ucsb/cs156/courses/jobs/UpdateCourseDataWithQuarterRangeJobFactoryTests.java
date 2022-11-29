package edu.ucsb.cs156.courses.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.services.UCSBSubjectsService;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;

@RestClientTest(UpdateCourseDataWithQuarterRangeJobFactory.class)
@AutoConfigureDataJpa
public class UpdateCourseDataWithQuarterRangeJobFactoryTests {

    @MockBean
    UCSBSubjectsService ucsbSubjectsService;

    @MockBean
    UCSBCurriculumService ucsbCurriculumService;

    @MockBean
    ConvertedSectionCollection convertedSectionCollection;

    @Autowired
    UpdateCourseDataWithQuarterRangeJobFactory updateCourseDataWithQuarterRangeJobFactory;

    @Test
    void test_create() throws Exception {

        // Act

        UpdateCourseDataWithQuarterRangeJob updateCourseDataWithQuarterRangeJob = updateCourseDataWithQuarterRangeJobFactory.create("20212", "20221");

        // Assert

        assertEquals("20212",updateCourseDataWithQuarterRangeJob.getQuarterYYYYQ1());
        assertEquals("20221",updateCourseDataWithQuarterRangeJob.getQuarterYYYYQ2());
        assertEquals(ucsbSubjectsService,updateCourseDataWithQuarterRangeJob.getUcsbSubjectService());
        assertEquals(ucsbCurriculumService,updateCourseDataWithQuarterRangeJob.getUcsbCurriculumService());
        assertEquals(convertedSectionCollection,updateCourseDataWithQuarterRangeJob.getConvertedSectionCollection());

    }
}