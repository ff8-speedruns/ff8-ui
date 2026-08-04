import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActionIcon, Box } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconArrowLeft, IconArrowRight, IconAsterisk } from '@tabler/icons-react';

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

const iconStyle = { width: '65%', height: '65%' };

/**
 * The directional pad shared by the pole-skip and final-party manips - a
 * plain grid of Mantine ActionIcons, not custom-drawn CSS. A hand-rolled
 * pseudo-element version of this lived here before; it kept surfacing CSS
 * specificity bugs (generic `.ff8-dpad a` rules silently beating the
 * per-direction overrides for width/height/color/etc.) that were tedious to
 * find and easy to reintroduce. Plain ActionIcons in a grid can't have that
 * problem - there's no cascade to fight.
 *
 * Owns the widget and the key bindings; what a press *means* stays in the
 * tool via `onPress`, which receives 'up' | 'down' | 'left' | 'right' | 'wild'.
 */
export function DPad({ onPress, withWild = false, keyboard = true, keys = 'all' }) {
  useEffect(() => {
    if (!keyboard) return undefined;

    const handler = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const typing = isTypingTarget(event.target);
      // Arrows are always ours - in these tools that is the whole point. Letter
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

  const press = (direction) => () => onPress(direction);

  return (
    <Box
      style={{
        display: 'inline-grid',
        gridTemplateAreas: `". up ." "left center right" ". down ."`,
        // Matches ActionIcon's actual xl size (--ai-size-xl: 2.75rem), so
        // there's no gap between the button and its grid cell.
        gridTemplateColumns: 'repeat(3, 2.75rem)',
        gridTemplateRows: 'repeat(3, 2.75rem)',
        gap: 'var(--mantine-spacing-xs)',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <ActionIcon style={{ gridArea: 'up' }} size="xl" variant="default" onClick={press('up')} aria-label="Up">
        <IconArrowUp style={iconStyle} />
      </ActionIcon>
      <ActionIcon style={{ gridArea: 'left' }} size="xl" variant="default" onClick={press('left')} aria-label="Left">
        <IconArrowLeft style={iconStyle} />
      </ActionIcon>
      {withWild && (
        <ActionIcon
          style={{ gridArea: 'center' }}
          size="xl"
          variant="default"
          onClick={press('wild')}
          aria-label="Wild"
        >
          <IconAsterisk style={iconStyle} />
        </ActionIcon>
      )}
      <ActionIcon style={{ gridArea: 'right' }} size="xl" variant="default" onClick={press('right')} aria-label="Right">
        <IconArrowRight style={iconStyle} />
      </ActionIcon>
      <ActionIcon style={{ gridArea: 'down' }} size="xl" variant="default" onClick={press('down')} aria-label="Down">
        <IconArrowDown style={iconStyle} />
      </ActionIcon>
    </Box>
  );
}

DPad.propTypes = {
  onPress: PropTypes.func.isRequired,
  withWild: PropTypes.bool,
  keyboard: PropTypes.bool,
  /** 'all' binds arrows and WASD; 'arrows' binds the arrow keys only. */
  keys: PropTypes.oneOf(['all', 'arrows']),
};
