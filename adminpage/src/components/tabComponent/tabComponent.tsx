// TabComponent.tsx
import React, { ReactNode } from 'react';

interface TabProps {
  activeTab: string;
  tabName: string;
  title: string;
  children: ReactNode;
}

const TabComponent: React.FC<TabProps> = ({ activeTab, tabName, title, children }) => (
  <section className={`content ${activeTab === tabName ? 'active' : ''}`}>
    <h2>{title}</h2>
    <hr style={{ margin: '20px 0' }} />
    {children}
  </section>
);

export default TabComponent;
