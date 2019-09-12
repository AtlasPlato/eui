import { CommonProps } from '../common';
import { SFC } from 'react';

declare module '@atlastix/eui' {
  /**
   * list group type defs
   *
   * @see './list_group.js'
   */

  type EuiListGroupProps = CommonProps & {

  };

  export const EuiListGroup: SFC<EuiListGroupProps>;
}
