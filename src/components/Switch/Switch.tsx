import React from 'react';
import { SwitchWrapper, SwitchKnob, SwitchContainer, LabelText, KnobSpinner, KnobIcon } from './Switch.styles';

export interface SwitchProps {
  /**
   * Toggles the on/off state of the switch.
   */
  checked: boolean;
  /**
   * Callback function to handle the state change.
   */
  onChange: (checked: boolean) => void;
  /**
   * How large should the switch be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If `true`, the switch will be non-interactive.
   */
  disabled?: boolean;
  /**
   * Optional text label for the switch.
   */
  label?: string;
  /**
   * Position of the label relative to the switch.
   */
  labelPosition?: 'left' | 'right';
  /**
   * If `true`, a spinner is shown and the switch is disabled.
   */
  loading?: boolean;
  /**
   * Icon to display inside the knob when the switch is ON.
   */
  onIcon?: React.ReactNode;
  /**
   * Icon to display inside the knob when the switch is OFF.
   */
  offIcon?: React.ReactNode;
}

/**
 * An advanced neomorphic switch with loading states and custom icons.
 */
export const Switch = ({
  checked,
  onChange,
  size = 'medium',
  disabled = false,
  label = '',
  labelPosition = 'right',
  loading = false,
  onIcon,
  offIcon,
}: SwitchProps) => {
  const isDisabled = disabled || loading;

  const toggleSwitch = () => {
    if (!isDisabled) {
      onChange(!checked);
    }
  };

  const KnobContent = () => {
    if (loading) return <KnobSpinner />;
    if (checked && onIcon) return <KnobIcon>{onIcon}</KnobIcon>;
    if (!checked && offIcon) return <KnobIcon>{offIcon}</KnobIcon>;
    return null;
  };

  const SwitchControl = (
    <SwitchWrapper size={size} data-checked={checked} onClick={toggleSwitch} disabled={isDisabled}>
      <SwitchKnob size={size} layout transition={{ type: 'spring', stiffness: 700, damping: 30 }}>
        <KnobContent />
      </SwitchKnob>
    </SwitchWrapper>
  );

  return (
    <SwitchContainer onClick={toggleSwitch} disabled={isDisabled}>
      {label && labelPosition === 'left' && <LabelText>{label}</LabelText>}
      {SwitchControl}
      {label && labelPosition === 'right' && <LabelText>{label}</LabelText>}
    </SwitchContainer>
  );
};