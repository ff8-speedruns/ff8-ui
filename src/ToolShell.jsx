import PropTypes from 'prop-types';
import { Anchor, AppShell, Container, Group, ScrollArea, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SiteHeader } from './SiteHeader';
import { ToolFooter } from './ToolFooter';
import { NAVBAR_BREAKPOINT, NAVBAR_WIDTH } from './constants';

/**
 * The frame every tool renders inside. Pass the tool's identity in, put the
 * tool's actual body in `children`, and the chrome comes out identical
 * everywhere.
 *
 * `navbar` adds an optional sidebar. Pass a node, or a function receiving
 * `{ closeNavbar }` so links inside it can close the mobile drawer. Without
 * it the shell renders exactly as it always has.
 */
export function ToolShell({
  title,
  status,
  repo,
  intro,
  links = [],
  credits,
  size = 'lg',
  navbar,
  children,
}) {
  const [isNavbarOpen, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false);
  const hasPreamble = Boolean(intro) || links.length > 0;
  const hasNavbar = Boolean(navbar);
  const navbarConfig = hasNavbar
    ? {
        width: NAVBAR_WIDTH,
        breakpoint: NAVBAR_BREAKPOINT,
        collapsed: { mobile: !isNavbarOpen },
      }
    : undefined;
  const navbarContent = typeof navbar === 'function' ? navbar({ closeNavbar }) : navbar;

  return (
    <AppShell header={{ height: 60 }} navbar={navbarConfig} padding="md">
      <AppShell.Header>
        <SiteHeader
          title={title}
          status={status}
          repo={repo}
          isNavbarOpen={isNavbarOpen}
          onNavbarToggle={hasNavbar ? toggleNavbar : undefined}
        />
      </AppShell.Header>

      {hasNavbar && (
        <AppShell.Navbar>
          <AppShell.Section grow component={ScrollArea} p="md">
            {navbarContent}
          </AppShell.Section>
        </AppShell.Navbar>
      )}

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
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  credits: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  navbar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
};
