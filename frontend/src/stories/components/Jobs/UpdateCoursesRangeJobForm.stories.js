import React from "react";

import UpdateCoursesRangeJobForm from "main/components/Jobs/UpdateCoursesRangeJobForm";
import { ucsbSubjectsFixtures } from "fixtures/ucsbSubjectsFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

export default {
  title: "components/Jobs/UpdateCoursesRangeJobForm",
  component: UpdateCoursesRangeJobForm,
  parameters: {
    mockData: [
      {
        url: '/api/UCSBSubjects/all',
        method: 'GET',
        status: 200,
        response: ucsbSubjectsFixtures.threeSubjects
      },
      {
        url: '/api/systemInfo',
        method: 'GET',
        status: 200,
        response: systemInfoFixtures.showingBoth
      },
    ],
  },
};

const Template = (args) => {
  return <UpdateCoursesRangeJobForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  callback: (data) => {
    console.log("Submit was clicked, data=", data);
  }
};
