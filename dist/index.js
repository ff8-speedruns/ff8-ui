import { ActionIcon as e, Anchor as t, AppShell as n, Badge as r, Box as i, Burger as a, Container as o, Divider as s, Group as c, MantineProvider as l, ScrollArea as u, Stack as d, Text as f, Title as p, Tooltip as m, createTheme as h, localStorageColorSchemeManager as g, useComputedColorScheme as _, useMantineColorScheme as v } from "@mantine/core";
import y from "prop-types";
import { useDisclosure as b, useHotkeys as x } from "@mantine/hooks";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
import { IconArrowDown as T, IconArrowLeft as E, IconArrowNarrowLeft as D, IconArrowRight as O, IconArrowUp as k, IconAsterisk as A, IconBrandGithub as j, IconMoonStars as M, IconSun as N } from "@tabler/icons-react";
import { useEffect as P } from "react";
//#region src/theme.js
var F = {
	from: "blue",
	to: "cyan",
	deg: 45
}, I = h({
	primaryColor: "blue",
	defaultRadius: "md",
	defaultGradient: F,
	cursorType: "pointer",
	autoContrast: !0,
	headings: {
		fontWeight: "600",
		textWrap: "balance"
	},
	components: {
		Anchor: { defaultProps: { underline: "hover" } },
		Table: { defaultProps: {
			highlightOnHover: !0,
			verticalSpacing: "xs"
		} },
		Badge: { defaultProps: { variant: "filled" } }
	}
}), L = "/", R = "https://github.com/ff8-speedruns", z = "ff8-color-scheme", B = {
	working: {
		label: "Working",
		color: "green",
		textColor: "white"
	},
	needsTesters: {
		label: "Needs Testers",
		color: "yellow"
	},
	development: {
		label: "Development",
		color: "orange",
		textColor: "white"
	},
	external: {
		label: "External Link",
		color: "gray"
	}
};
function V(e) {
	return e?.startsWith("http") ? e : `${R}/${e}`;
}
//#endregion
//#region src/FF8Provider.jsx
var H = g({ key: z });
function U() {
	let { setColorScheme: e } = v(), t = _("light", { getInitialValueInEffect: !1 });
	return x([["mod+J", () => e(t === "dark" ? "light" : "dark")]]), null;
}
function W({ children: e, defaultColorScheme: t = "auto" }) {
	return /* @__PURE__ */ w(l, {
		theme: I,
		colorSchemeManager: H,
		defaultColorScheme: t,
		children: [/* @__PURE__ */ C(U, {}), e]
	});
}
W.propTypes = {
	children: y.node,
	defaultColorScheme: y.oneOf([
		"light",
		"dark",
		"auto"
	])
};
//#endregion
//#region src/ColorSchemeToggle.jsx
function G({ size: t = "lg", variant: n = "default" }) {
	let { setColorScheme: r } = v(), i = _("light", { getInitialValueInEffect: !1 }) === "dark";
	return /* @__PURE__ */ C(m, {
		label: i ? "Switch to light mode" : "Switch to dark mode",
		children: /* @__PURE__ */ C(e, {
			size: t,
			variant: n,
			color: i ? "yellow" : "blue",
			onClick: () => r(i ? "light" : "dark"),
			"aria-label": "Toggle color scheme",
			children: C(i ? N : M, { size: "1.1rem" })
		})
	});
}
G.propTypes = {
	size: y.string,
	variant: y.string
};
//#endregion
//#region src/StatusBadge.jsx
function K({ status: e, ...t }) {
	let n = B[e];
	return n ? /* @__PURE__ */ C(r, {
		color: n.color,
		variant: "filled",
		c: n.textColor ?? "black",
		...t,
		children: n.label
	}) : null;
}
K.propTypes = { status: y.oneOf(Object.keys(B)) };
//#endregion
//#region src/SiteHeader.jsx
function q({ title: t, status: n, repo: r, withBackLink: i = !0, isNavbarOpen: o = !1, onNavbarToggle: s }) {
	return /* @__PURE__ */ w(c, {
		h: "100%",
		px: "md",
		justify: "space-between",
		wrap: "nowrap",
		children: [/* @__PURE__ */ w(c, {
			gap: "xs",
			wrap: "nowrap",
			children: [
				s && /* @__PURE__ */ C(a, {
					opened: o,
					onClick: s,
					hiddenFrom: "sm",
					size: "sm",
					"aria-label": "Toggle navigation"
				}),
				i && /* @__PURE__ */ C(m, {
					label: "Back to Garden",
					children: /* @__PURE__ */ C(e, {
						size: "lg",
						variant: "default",
						component: "a",
						href: "/",
						"aria-label": "Back to Garden",
						children: /* @__PURE__ */ C(D, { size: "1.1rem" })
					})
				}),
				/* @__PURE__ */ C(p, {
					order: 3,
					lineClamp: 1,
					children: t
				}),
				/* @__PURE__ */ C(K, {
					status: n,
					visibleFrom: "sm"
				})
			]
		}), /* @__PURE__ */ w(c, {
			gap: "xs",
			wrap: "nowrap",
			children: [r && /* @__PURE__ */ C(m, {
				label: "Source on GitHub",
				children: /* @__PURE__ */ C(e, {
					size: "lg",
					variant: "default",
					component: "a",
					href: V(r),
					target: "_blank",
					rel: "noreferrer",
					"aria-label": "Source on GitHub",
					children: /* @__PURE__ */ C(j, { size: "1.1rem" })
				})
			}), /* @__PURE__ */ C(G, {})]
		})]
	});
}
q.propTypes = {
	title: y.node.isRequired,
	status: y.string,
	repo: y.string,
	withBackLink: y.bool,
	isNavbarOpen: y.bool,
	onNavbarToggle: y.func
};
//#endregion
//#region src/ToolFooter.jsx
function J({ credits: e, repo: n }) {
	return /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C(s, { my: "xl" }), /* @__PURE__ */ w(c, {
		justify: "space-between",
		align: "flex-start",
		gap: "md",
		mb: "xl",
		children: [/* @__PURE__ */ C(f, {
			size: "sm",
			c: "dimmed",
			className: "ff8-footer-credits",
			children: e ? /* @__PURE__ */ w(S, { children: ["Credit: ", e] }) : null
		}), /* @__PURE__ */ w(c, {
			gap: "md",
			wrap: "nowrap",
			children: [/* @__PURE__ */ C(t, {
				size: "sm",
				href: "/",
				children: "Back to Garden"
			}), n && /* @__PURE__ */ C(t, {
				size: "sm",
				href: V(n),
				target: "_blank",
				rel: "noreferrer",
				children: "Source"
			})]
		})]
	})] });
}
J.propTypes = {
	credits: y.node,
	repo: y.string
};
//#endregion
//#region src/ToolShell.jsx
function Y({ title: e, status: r, repo: i, intro: a, links: s = [], credits: l, size: p = "lg", navbar: m, children: h }) {
	let [g, { toggle: _, close: v }] = b(!1), y = !!a || s.length > 0, x = !!m, S = x ? {
		width: 240,
		breakpoint: "sm",
		collapsed: { mobile: !g }
	} : void 0, T = typeof m == "function" ? m({ closeNavbar: v }) : m;
	return /* @__PURE__ */ w(n, {
		header: { height: 60 },
		navbar: S,
		padding: "md",
		children: [
			/* @__PURE__ */ C(n.Header, { children: /* @__PURE__ */ C(q, {
				title: e,
				status: r,
				repo: i,
				isNavbarOpen: g,
				onNavbarToggle: x ? _ : void 0
			}) }),
			x && /* @__PURE__ */ C(n.Navbar, { children: /* @__PURE__ */ C(n.Section, {
				grow: !0,
				component: u,
				p: "md",
				children: T
			}) }),
			/* @__PURE__ */ C(n.Main, {
				className: "ff8-shell-main",
				children: /* @__PURE__ */ w(o, {
					size: p,
					px: 0,
					children: [
						y && /* @__PURE__ */ w(d, {
							gap: "xs",
							mb: "lg",
							children: [a && /* @__PURE__ */ C(f, {
								size: "sm",
								c: "dimmed",
								children: a
							}), s.length > 0 && /* @__PURE__ */ C(c, {
								gap: "md",
								children: s.map((e) => /* @__PURE__ */ C(t, {
									size: "sm",
									href: e.href,
									target: e.href.startsWith("http") ? "_blank" : void 0,
									rel: "noreferrer",
									children: e.label
								}, e.href))
							})]
						}),
						h,
						/* @__PURE__ */ C(J, {
							credits: l,
							repo: i
						})
					]
				})
			})
		]
	});
}
Y.propTypes = {
	title: y.node.isRequired,
	status: y.string,
	repo: y.string,
	intro: y.node,
	links: y.arrayOf(y.shape({
		label: y.node.isRequired,
		href: y.string.isRequired
	})),
	credits: y.node,
	size: y.oneOfType([y.string, y.number]),
	navbar: y.oneOfType([y.node, y.func]),
	children: y.node
};
//#endregion
//#region src/DPad.jsx
var X = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right"
}, Z = {
	w: "up",
	s: "down",
	a: "left",
	d: "right"
}, ee = /* @__PURE__ */ new Set([
	"INPUT",
	"TEXTAREA",
	"SELECT"
]);
function te(e) {
	return !!e && (ee.has(e.tagName) || e.isContentEditable);
}
var Q = {
	width: "65%",
	height: "65%"
};
function $({ onPress: t, withWild: n = !1, keyboard: r = !0, keys: a = "all" }) {
	P(() => {
		if (!r) return;
		let e = (e) => {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			let n = te(e.target), r = a === "all" && !n ? Z[e.key?.toLowerCase()] : void 0, i = X[e.key] ?? r;
			i && (e.preventDefault(), t(i));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		r,
		a
	]);
	let o = (e) => () => t(e);
	return /* @__PURE__ */ w(i, {
		style: {
			display: "inline-grid",
			gridTemplateAreas: "\". up .\" \"left center right\" \". down .\"",
			gridTemplateColumns: "repeat(3, 2.75rem)",
			gridTemplateRows: "repeat(3, 2.75rem)",
			gap: "var(--mantine-spacing-xs)",
			justifyItems: "center",
			alignItems: "center"
		},
		children: [
			/* @__PURE__ */ C(e, {
				style: { gridArea: "up" },
				size: "xl",
				variant: "default",
				onClick: o("up"),
				"aria-label": "Up",
				children: /* @__PURE__ */ C(k, { style: Q })
			}),
			/* @__PURE__ */ C(e, {
				style: { gridArea: "left" },
				size: "xl",
				variant: "default",
				onClick: o("left"),
				"aria-label": "Left",
				children: /* @__PURE__ */ C(E, { style: Q })
			}),
			n && /* @__PURE__ */ C(e, {
				style: { gridArea: "center" },
				size: "xl",
				variant: "default",
				onClick: o("wild"),
				"aria-label": "Wild",
				children: /* @__PURE__ */ C(A, { style: Q })
			}),
			/* @__PURE__ */ C(e, {
				style: { gridArea: "right" },
				size: "xl",
				variant: "default",
				onClick: o("right"),
				"aria-label": "Right",
				children: /* @__PURE__ */ C(O, { style: Q })
			}),
			/* @__PURE__ */ C(e, {
				style: { gridArea: "down" },
				size: "xl",
				variant: "default",
				onClick: o("down"),
				"aria-label": "Down",
				children: /* @__PURE__ */ C(T, { style: Q })
			})
		]
	});
}
$.propTypes = {
	onPress: y.func.isRequired,
	withWild: y.bool,
	keyboard: y.bool,
	keys: y.oneOf(["all", "arrows"])
};
//#endregion
export { F as BRAND_GRADIENT, z as COLOR_SCHEME_KEY, G as ColorSchemeToggle, $ as DPad, W as FF8Provider, L as GARDEN_URL, R as ORG_URL, B as STATUSES, q as SiteHeader, K as StatusBadge, J as ToolFooter, Y as ToolShell, V as repoUrl, I as theme };
