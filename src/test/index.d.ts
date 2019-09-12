import { ShallowWrapper, ReactWrapper } from 'enzyme';

declare module '@atlastix/eui' {
  export function findTestSubject<T extends ShallowWrapper | ReactWrapper> (
    mountedComponent: T,
    testSubjectSelector: string
  ): ReturnType<T["find"]>;
}
