// @flow
import React from 'react';

type Props = {
  message: string,
  role: string,
  onChangeMessage: any,
};

const Hello = ({ message, role, onChangeMessage }: Props) => (
  <div className="hello" onMouseOver={() => onChangeMessage()} onFocus={() => onChangeMessage()}>
    <p className="hello__text">
      {message} {role}
    </p>
  </div>
);

export default Hello;
