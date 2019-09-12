import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps, findTestSubject } from '../../test';

import {
  EuiGlobalToastList,
  TOAST_FADE_OUT_MS,
} from './global_toast_list';

describe('EuiGlobalToastList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiGlobalToastList
        {...requiredProps}
        dismissToast={() => {}}
        toastLifeTimeMs={5}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('toasts', () => {
      test('is rendered', () => {
        const toasts = [{
          title: 'A',
          text: 'a',
          color: 'success',
          iconType: 'check',
          'data-test-subj': 'a',
          id: 'a',
        }, {
          title: 'B',
          text: 'b',
          color: 'danger',
          iconType: 'alert',
          'data-test-subj': 'b',
          id: 'b',
        }];

        const component = render(
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
          />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('dismissToast', () => {
      test('is called when a toast is clicked', done => {
        const dismissToastSpy = sinon.spy();
        const component = mount(
          <EuiGlobalToastList
            toasts={[{
              'data-test-subj': 'b',
              id: 'b',
            }]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={100}
          />
        );

        const toastB = findTestSubject(component, 'b');
        const closeButton = findTestSubject(toastB, 'toastCloseButton');
        closeButton.simulate('click');

        // The callback is invoked once the toast fades from view.
        setTimeout(() => {
          expect(dismissToastSpy.called).toBe(true);
          done();
        }, TOAST_FADE_OUT_MS + 1);
      });

    });
  });
});
