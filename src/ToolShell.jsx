import PropTypes from 'prop-types';
import { Anchor, AppShell, Container, Group, Stack, Text } from '@mantine/core';
import { SiteHeader } from './SiteHeader';
import { ToolFooter } from './ToolFooter';

/**
 * The frame every tool renders inside. Pass the tool's identity in, put the
 * tool's actual body in `children`, and the chrome comes out identical
 * everywhere.
 */
export function ToolShell({
  title,
  status,
  repo,
  intro,
  links = [],
  credits,
  size = 'lg',
  children,
}) {
  const hasPreamble = Boolean(intro) || links.length > 0;

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <SiteHeader title={title} status={status} repo={repo} />
      </AppShell.Header>

      <AppShell.Main className="ff8-shell-main">
        <Container size={size} px={0}>
          {hasPreamble && (
            <Stack gap="xs" mb="lg">
              {intro && (
                <Text size="sm" c="dimmed">
                  {intro}
                </Text>
              )}
              {links.length > 0 && (
                <Group gap="md">
                  {links.map((link) => (
                    <Anchor
                      key={link.href}
                      size="sm"
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      {link.label}
                    </Anchor>
                  ))}
                </Group>
              )}
            </Stack>
          )}

          {children}

          <ToolFooter credits={credits} repo={repo} />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

ToolShell.propTypes = {
  title: PropTypes.node.isRequired,
  status: PropTypes.string,
  repo: PropTypes.string,
  intro: PropTypes.node,
  links: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.node.isRequired, href: PropTypes.string.isRequired })
  ),
  credits: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};
