import { HTMLAttributes, Component } from 'react';
import { CommonProps } from '../common';

declare module '@atlastix/eui' {
  export class EuiErrorBoundary extends Component<
    CommonProps & HTMLAttributes<HTMLDivElement>
    > {}
}
