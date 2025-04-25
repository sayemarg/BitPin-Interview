import type { CSSProperties } from 'react';
import { SkeletonLoading } from '../../../SkeletonLoading';

export const LoadingRow = () => {
  const style: CSSProperties = { height: '3rem', borderRadius: '10px' };

  return (
    <tr>
      <td>
        <SkeletonLoading style={style} />
      </td>

      <td>
        <SkeletonLoading style={style} />
      </td>

      <td>
        <SkeletonLoading style={style} />
      </td>

      <td>
        <SkeletonLoading style={style} />
      </td>

      <td>
        <SkeletonLoading style={style} />
      </td>

      <td>
        <SkeletonLoading style={style} />
      </td>
    </tr>
  );
};
