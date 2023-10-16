import React from 'react';

export type TResponses = Record<string, Record<string, string | number | boolean>>;
export type TResponsesSt = [
  Record<string, Record<string, string | number | boolean>>,
  React.Dispatch<React.SetStateAction<Record<string, Record<string, string | number | boolean>>>>,
];
