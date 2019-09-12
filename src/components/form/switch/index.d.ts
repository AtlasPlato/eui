import { CommonProps } from '../../common';

import { SFC, InputHTMLAttributes, ReactNode } from 'react';

declare module '@atlastix/eui' {
  /**
   * @see './switch.js'
   */
  export type EuiSwitchProps = CommonProps &
    InputHTMLAttributes<HTMLInputElement> & {
      label?: ReactNode;
    };

  export const EuiSwitch: SFC<EuiSwitchProps>;
}
