import PropTypes from 'prop-types';
import React, { useReducer, useEffect } from 'react';

interface ToggleProps {
  status: 'off' | 'on';
  className?: string;
  ellipse?: string;
  onChange?: (status: 'off' | 'on') => void;
}

interface State {
  status: 'off' | 'on';
}

interface Action {
  type: 'click';
}

export const Toggle: React.FC<ToggleProps> = ({
  status,
  className,
  onChange,
}: ToggleProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, { status });

  useEffect(() => {
    if (onChange) {
      onChange(state.status);
    }
  }, [state.status, onChange]);

  const handleClick = () => {
    const newStatus = state.status === 'off' ? 'on' : 'off';
    dispatch({ type: 'click' });
    if (onChange) {
      onChange(newStatus);
    }
  };

  return (
    <div
      className={`w-[85px] h-[33px] relative ${state.status === 'on' ? 'bg-[100%_100%]' : ''} ${
        state.status === 'on' ? 'bg-[url(assets/icons/toggle-on.svg)]' : ''
      } ${state.status === 'off' ? 'rounded-[100px]' : ''} ${state.status === 'off' ? 'bg-[#8c929d]' : ''} ${className}`}
      onClick={handleClick}
    >
      <div
        className={`top-0.5 h-[29px] absolute ${state.status === 'on' ? 'w-[38px]' : 'w-8'} ${
          state.status === 'on' ? 'left-11' : 'left-0.5'
        }`}
      >
        {state.status === 'off' && (
          <div className='absolute w-[29px] h-[29px] top-0 left-0 bg-white rounded-[14.35px]' />
        )}
        {state.status === 'on' && (
          <img className='absolute w-[29px] h-[29px] top-0 left-[9px] rounded-[14.35px]' />
        )}
      </div>
      <div
        className={`font-kor-subtitle-subtitle1 tracking-[var(--kor-subtitle-subtitle1-letter-spacing)] [font-style:var(--kor-subtitle-subtitle1-font-style)] text-[length:var(--kor-subtitle-subtitle1-font-size)] top-[7px] text-white h-[17px] font-[number:var(--kor-subtitle-subtitle1-font-weight)] leading-[var(--kor-subtitle-subtitle1-line-height)] whitespace-nowrap absolute ${
          state.status === 'on' ? 'w-[22px]' : 'w-7'
        } ${state.status === 'on' ? 'left-1.5' : 'left-12'}`}
      >
        {state.status === 'off' && <>OFF</>}
        {state.status === 'on' && <>ON</>}
      </div>
    </div>
  );
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'click':
      return { status: state.status === 'off' ? 'on' : 'off' };
    default:
      return state;
  }
}

Toggle.propTypes = {
  status: PropTypes.oneOf(['off', 'on']) as PropTypes.Validator<'off' | 'on'>,
  className: PropTypes.string,
  ellipse: PropTypes.string,
  onChange: PropTypes.func,
};
