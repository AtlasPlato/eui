
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import dateMath from '@elastic/datemath';

import { EuiButtonIcon } from '../../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiToolTip } from '../../../tool_tip';
import { EuiHorizontalRule } from '../../../horizontal_rule';

const LAST = 'last';
const NEXT = 'next';

export class EuiQuickSelect extends Component {
  constructor(props) {
    super(props);

    const { timeTense, timeValue, timeUnits } = this.props.prevQuickSelect;
    this.state = {
      timeTense: timeTense ? timeTense : LAST,
      timeValue: timeValue ? timeValue : 15,
      timeUnits: timeUnits ? timeUnits : 'm',
    };
  }

  onTimeTenseChange = (evt) => {
    this.setState({
      timeTense: evt.target.value,
    });
  }

  onTimeValueChange = (evt) => {
    const sanitizedValue = parseInt(evt.target.value, 10);
    this.setState({
      timeValue: isNaN(sanitizedValue) ? '' : sanitizedValue,
    });
  }

  onTimeUnitsChange = (evt) => {
    this.setState({
      timeUnits: evt.target.value,
    });
  }

  applyQuickSelect = () => {
    const {
      timeTense,
      timeValue,
      timeUnits,
    } = this.state;

    if (timeTense === NEXT) {
      this.props.applyTime({
        start: 'now',
        end: `now+${timeValue}${timeUnits}`,
        quickSelect: { ...this.state },
      });
      return;
    }

    this.props.applyTime({
      start: `now-${timeValue}${timeUnits}`,
      end: 'now',
      quickSelect: { ...this.state },
    });
  }

  getBounds = () => {
    const startMoment = dateMath.parse(this.props.start);
    const endMoment = dateMath.parse(this.props.end, { roundUp: true });
    return {
      min: startMoment && startMoment.isValid() ? startMoment : moment().subtract(15, 'minute'),
      max: endMoment && endMoment.isValid() ? endMoment : moment(),
    };
  }

  stepForward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(max).add(1, 'ms').toISOString(),
      end: moment(max).add(diff + 1, 'ms').toISOString(),
      keepPopoverOpen: true,
    });
  }

  stepBackward = () => {
    const { min, max } = this.getBounds();
    const diff = max.diff(min);
    this.props.applyTime({
      start: moment(min).subtract(diff + 1, 'ms').toISOString(),
      end: moment(min).subtract(1, 'ms').toISOString(),
      keepPopoverOpen: true,
    });
  }

  render() {
    return (
      <Fragment>
        <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s">
          <EuiFlexItem>
            <EuiTitle size="xxxs"><span>Quick select</span></EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Previous time window">
              <EuiButtonIcon
                aria-label="Previous time window"
                iconType="arrowLeft"
                onClick={this.stepBackward}
              />
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiToolTip content="Next time window">
              <EuiButtonIcon
                aria-label="Next time window"
                iconType="arrowRight"
                onClick={this.stepForward}
              />
            </EuiToolTip>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        <EuiHorizontalRule margin="s" />
      </Fragment>
    );
  }
}

EuiQuickSelect.propTypes = {
  applyTime: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  prevQuickSelect: PropTypes.object,
};

EuiQuickSelect.defaultProps = {
  prevQuickSelect: {},
};
