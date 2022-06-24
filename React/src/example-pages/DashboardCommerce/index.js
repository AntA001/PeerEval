import React from 'react';
import { PageTitle } from '../../layout-components';
import DashboardCommerce2 from '../../example-components/DashboardCommerce/DashboardCommerce2';
import DashboardCommerce5 from '../../example-components/DashboardCommerce/DashboardCommerce5';
export default function DashboardCommerce() {
  return (
    <>
      <PageTitle
        titleHeading="Student Dashboard"
        titleDescription=""
      />
      <DashboardCommerce2 />
      <DashboardCommerce5 />
    </>
  );
}
