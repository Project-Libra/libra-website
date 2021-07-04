import React, { useEffect, useState } from 'react';

import { Score } from '../types';
import { getScores } from '../api';

export interface AppProps {
  children: React.ReactNode
}

export const App = ({ children }: AppProps) => {
  const [scores, setScores] = useState<Score[]>([]);

  const rows: Array<keyof Score> = [
    '_id',
    'user_id',
    'accuracy',
    'mods',
    'score',
    'max_combo',
    'created_at',
    'beatmap_id',
    'beatmapset_id'
  ];

  useEffect(() => {
    getScores().then(setScores);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {rows.map(row => (
            <th key={row}>
              {row}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scores.map(score => (
          <tr key={score._id}>
            {rows.map(row => (
              <td key={row}>
                {score[row]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
