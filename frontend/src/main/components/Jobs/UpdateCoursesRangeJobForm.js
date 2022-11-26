import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { quarterRange } from "main/utils/quarterUtilities";

import { useSystemInfo } from "main/utils/systemInfo";
import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";
import SingleSubjectDropdown from "../Subjects/SingleSubjectDropdown";
import { useBackend  } from "main/utils/useBackend";

const UpdateCoursesRangeJobForm = ({ callback }) => {

  const { data: systemInfo } = useSystemInfo();

  // Stryker disable OptionalChaining
  const startQtr = systemInfo?.startQtrYYYYQ || "20211";
  const endQtr = systemInfo?.endQtrYYYYQ || "20214";
  // Stryker enable OptionalChaining

  const quarters = quarterRange(startQtr, endQtr);

  // Stryker disable all : not sure how to test/mock local storage
  const localSubject = localStorage.getItem("BasicSearch.Subject");
  const localStartQuarter = localStorage.getItem("BasicSearch.Quarter");
  const localEndQuarter = localStorage.getItem("BasicSearch.Quarter")

  const { data: subjects, error: _error, status: _status } =
  useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/UCSBSubjects/all"], 
    { method: "GET", url: "/api/UCSBSubjects/all" }, 
    []
  );

  const [startQuarter, setStartQuarter] = useState(localStartQuarter || quarters[0].yyyyq);
  const [endQuarter, setEndQuarter] = useState(localEndQuarter || quarters[0].yyyyq);
  const [subject, setSubject] = useState(localSubject || {});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("UpdateCoursesRangeJobForm: startQuarter", startQuarter);
    console.log("UpdateCoursesRangeJobForm: endQuarter", endQuarter);
    console.log("UpdateCoursesJobForm: subject", subject);
    callback({ startQuarter, endQuarter, subject});
  };

  // Stryker disable all : Stryker is testing by changing the padding to 0. But this is simply a visual optimization as it makes it look better
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={startQuarter}
              setQuarter={setStartQuarter}
              controlId={"BasicSearch.Quarter"}
            />
          </Col>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={endQuarter}
              setQuarter={setEndQuarter}
              controlId={"BasicSearch.Quarter"}
            />
          </Col>
          <Col md="auto">
            <SingleSubjectDropdown
              subjects={subjects}
              subject={subject}
              setSubject={setSubject}
              controlId={"BasicSearch.Subject"}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Col md="auto">
            <Button variant="primary" type="submit">
              Update Courses
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default UpdateCoursesRangeJobForm;
