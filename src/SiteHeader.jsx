import PropTypes from 'prop-types';
import { ActionIcon, Group, Title, Tooltip } from '@mantine/core';
import { IconArrowNarrowLeft, IconBrandGithub } from '@tabler/icons-react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { StatusBadge } from './StatusBadge';
import { GARDEN_URL, repoUrl } from './constants';

/**
 * The bar every tool wears. Back to the hub on the left, identity in the
 * middle, the controls that are the same everywhere on the right.
 */
export function SiteHeader({ title, status, repo, withBackLink = true }) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
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
};
