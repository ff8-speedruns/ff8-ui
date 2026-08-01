import PropTypes from 'prop-types';
import { Anchor, Divider, Group, Text } from '@mantine/core';
import { GARDEN_URL, repoUrl } from './constants';

export function ToolFooter({ credits, repo }) {
  return (
    <>
      <Divider my="xl" />
      <Group justify="space-between" align="flex-start" gap="md" mb="xl">
        <Text size="sm" c="dimmed" className="ff8-footer-credits">
          {credits ? <>Credit: {credits}</> : null}
        </Text>
        <Group gap="md" wrap="nowrap">
          <Anchor size="sm" href={GARDEN_URL}>
            Back to Garden
          </Anchor>
          {repo && (
            <Anchor size="sm" href={repoUrl(repo)} target="_blank" rel="noreferrer">
              Source
            </Anchor>
          )}
        </Group>
      </Group>
    </>
  );
}

ToolFooter.propTypes = {
  credits: PropTypes.node,
  repo: PropTypes.string,
};
