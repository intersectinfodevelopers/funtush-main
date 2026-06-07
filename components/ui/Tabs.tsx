'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TabsProps {
  tabs: { label: string; value: string }[];
  onTabChange?: (value: string) => void;
  defaultTab?: string;
  children: React.ReactNode;
}

export function Tabs({
  tabs,
  onTabChange,
  defaultTab,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <div>
      <div className="border-b border-gray-200 flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={cn(
              'px-4 py-2 font-medium transition-colors',
              activeTab === tab.value
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

interface TabContentProps {
  value: string;
  activeTab: string;
  children: React.ReactNode;
}

export function TabContent({ value, activeTab, children }: TabContentProps) {
  if (value !== activeTab) return null;
  return <>{children}</>;
}
