import React from 'react';
import { MainProvider } from '../features/providers/main';
import Container from '../components/container';
import { tApplication } from '../features/domain/types/t.Application';

const RokoCalendar = (props: tApplication) => (
  <MainProvider {...props}>
    <Container />
  </MainProvider>
);

export default RokoCalendar;

RokoCalendar.displayName = 'RokoCalendar';
