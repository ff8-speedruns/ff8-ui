import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ARROW_KEYS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const WASD_KEYS = {
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

const TEXT_ENTRY = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

function isTypingTarget(target) {
  return Boolean(target) && (TEXT_ENTRY.has(target.tagName) || target.isContentEditable);
}

/**
 * The directional pad shared by the pole-skip and final-party manips. It owns
 * the widget and the key bindings; what a press *means* stays in the tool via
 * `onPress`, which receives 'up' | 'down' | 'left' | 'right' | 'wild'.
 */
export function DPad({ onPress, withWild = false, active = null, keyboard = true, keys = 'all' }) {
  useEffect(() => {
    if (!keyboard) return undefined;

    const handler = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const typing = isTypingTarget(event.target);
      // Arrows are always ours — in these tools that is the whole point. Letter
      // keys are not, or you could never type into a field on the page, and
      // some tools want the arrows only.
      const wasd = keys === 'all' && !typing ? WASD_KEYS[event.key?.toLowerCase()] : undefined;
      const direction = ARROW_KEYS[event.key] ?? wasd;
      if (!direction) return;

      // Up/down would otherwise scroll the page out from under the widget.
      event.preventDefault();
      onPress(direction);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPress, keyboard, keys]);

  const press = (direction) => (event) => {
    event.preventDefault();
    onPress(direction);
  };

  return (
    <div className="ff8-dpad-set">
      <div
        className={['ff8-dpad', active && `ff8-dpad--${active}`, withWild && 'ff8-dpad--wild']
          .filter(Boolean)
          .join(' ')}
      >
        <a className="ff8-dpad__up" href="#up" onClick={press('up')} aria-label="Up" />
        <a className="ff8-dpad__right" href="#right" onClick={press('right')} aria-label="Right" />
        <a className="ff8-dpad__down" href="#down" onClick={press('down')} aria-label="Down" />
        <a className="ff8-dpad__left" href="#left" onClick={press('left')} aria-label="Left" />
        {withWild && (
          <a className="ff8-dpad__wild" href="#wild" onClick={press('wild')} aria-label="Wild">
            ✱
          </a>
        )}
      </div>
    </div>
  );
}

DPad.propTypes = {
  onPress: PropTypes.func.isRequired,
  withWild: PropTypes.bool,
  active: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  keyboard: PropTypes.bool,
  /** 'all' binds arrows and WASD; 'arrows' binds the arrow keys only. */
  keys: PropTypes.oneOf(['all', 'arrows']),
};
