import PropTypes from 'prop-types';
import { Badge } from '@mantine/core';
import { STATUSES } from './constants';

export function StatusBadge({ status, ...others }) {
  const entry = STATUSES[status];
  if (!entry) return null;

  return (
    <Badge color={entry.color} variant="filled" c={entry.textColor ?? 'black'} {...others}>
      {entry.label}
    </Badge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.keys(STATUSES)),
};
