import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';

import { Bell, Activity, Calendar } from 'react-feather';

const SidebarFooter = () => {
  return (
    <>
      <div className="app-sidebar--footer">
        <ul>
          <li>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn btn-sm btn-transition-none px-2 mx-2"
              id="AnalyticsDashboardTooltip">
              <Activity />
            </a>
            <UncontrolledTooltip
              target="AnalyticsDashboardTooltip"
              container=".app-sidebar--footer">
              Analytics Dashboard
            </UncontrolledTooltip>
          </li>
          <li>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn btn-sm btn-transition-none px-2 mx-2"
              id="CryptoTooltip">
              <Bell />
            </a>
            <UncontrolledTooltip
              target="CryptoTooltip"
              container=".app-sidebar--footer">
              Crypto Components
            </UncontrolledTooltip>
          </li>
          <li>
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="btn btn-sm btn-transition-none px-2 mx-2"
              id="ButtonsPageTooltip">
              <Calendar />
            </a>
            <UncontrolledTooltip
              target="ButtonsPageTooltip"
              container=".app-sidebar--footer">
              Buttons
            </UncontrolledTooltip>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarFooter;
