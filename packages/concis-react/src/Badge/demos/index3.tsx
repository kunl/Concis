import React from 'react';
import Badge from '..';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function avatarDemo1() {
  return (
    <>
      <Badge count={9} dot offset={[-2, 0]} style={{ marginRight: '25px' }}>
        <span style={{ color: '#325DFF' }}>Link</span>
      </Badge>
      <Badge count={9} dot offset={[-2, -2]}>
        <ClockCircleOutlined style={{ color: '#888', fontSize: 18, verticalAlign: -3 }} />
      </Badge>
    </>
  );
}
