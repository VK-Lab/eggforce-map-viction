import React from 'react';
import Worldmap from '@/screens/Worldmap';

export interface IRoute {
  // key?: number
  to: string;
  label: string;
  component: React.ComponentType; // HERE
  enabled: boolean;
  visible: boolean;
}

const routes = [
  {
    to: '/home',
    label: 'Callista',
    enabled: true,
    visible: false,
    component: Worldmap,
  },
];

export default routes;
