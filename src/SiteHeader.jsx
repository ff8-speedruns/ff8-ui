import PropTypes from 'prop-types';
import { ActionIcon, Burger, Group, Title, Tooltip } from '@mantine/core';
import { IconArrowNarrowLeft, IconBrandGithub } from '@tabler/icons-react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { StatusBadge } from './StatusBadge';
import { GARDEN_URL, NAVBAR_BREAKPOINT, NAVBAR_TOGGLE_LABEL, repoUrl } from './constants';

/**
 * The bar every tool wears. Back to the hub on the left, identity in the
 * middle, the controls that are the same everywhere on the right. The burger
 * only appears when the tool has a sidebar (`onNavbarToggle`).
 */
export function SiteHeader({
  title,
  status,
  repo,
  withBackLink = true,
  isNavbarOpen = false,
  onNavbarToggle,
}) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
        {onNavbarToggle && (
          <Burger
            opened={isNavbarOpen}
            onClick={onNavbarToggle}
            hiddenFrom={NAVBAR_BREAKPOINT}
            size="sm"
            aria-label={NAVBAR_TOGGLE_LABEL}
          />
        )}
        {withBackLink && (
          <Tooltip label="Back to Garden">
            <ActionIcon
              size="lg"
              variant="default"
              component="a"
              href={GARDEN_URL}
              aria-label="Back to Garden"
            >
              <IconArrowNarrowLeft size="1.1rem" />
            </ActionIcon>
          </Tooltip>
        )}
        <Title order={3} lineClamp={1}>
          {title}
        </Title>
        <StatusBadge status={status} visibleFrom="sm" />
      </Group>

      <Group gap="xs" wrap="nowrap">
        {repo && (
          <Tooltip label="Source on GitHub">
            <ActionIcon
              size="lg"
              variant="default"
              component="a"
              href={repoUrl(repo)}
              target="_blank"
              rel="noreferrer"
              aria-label="Source on GitHub"
            >
              <IconBrandGithub size="1.1rem" />
            </ActionIcon>
          </Tooltip>
        )}
        <ColorSchemeToggle />
      </Group>
    </Group>
  );
}

SiteHeader.propTypes = {
  title: PropTypes.node.isRequired,
  status: PropTypes.string,
  repo: PropTypes.string,
  withBackLink: PropTypes.bool,
  isNavbarOpen: PropTypes.bool,
  onNavbarToggle: PropTypes.func,
};
