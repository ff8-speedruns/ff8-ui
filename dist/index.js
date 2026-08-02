import { ActionIcon as e, Anchor as t, AppShell as n, Badge as r, Box as i, Container as a, Divider as o, Group as s, MantineProvider as c, Stack as l, Text as u, Title as d, Tooltip as f, createTheme as p, localStorageColorSchemeManager as m, useComputedColorScheme as h, useMantineColorScheme as g } from "@mantine/core";
import _ from "prop-types";
import { useHotkeys as v } from "@mantine/hooks";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
import { IconArrowDown as S, IconArrowLeft as C, IconArrowNarrowLeft as w, IconArrowRight as T, IconArrowUp as E, IconAsterisk as D, IconBrandGithub as O, IconMoonStars as k, IconSun as A } from "@tabler/icons-react";
import { useEffect as j } from "react";
//#region src/theme.js
var M = {
	from: "blue",
	to: "cyan",
	deg: 45
}, N = p({
	primaryColor: "blue",
	defaultRadius: "md",
	defaultGradient: M,
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
}), P = "/", F = "https://github.com/ff8-speedruns", I = "ff8-color-scheme", L = {
	working: {
		label: "Working",
		color: "green"
	},
	needsTesters: {
		label: "Needs Testers",
		color: "yellow"
	},
	development: {
		label: "Development",
		color: "orange"
	},
	external: {
		label: "External Link",
		color: "gray"
	}
};
function R(e) {
	return e?.startsWith("http") ? e : `${F}/${e}`;
}
//#endregion
//#region src/FF8Provider.jsx
var z = m({ key: I });
function B() {
	let { setColorScheme: e } = g(), t = h("light", { getInitialValueInEffect: !1 });
	return v([["mod+J", () => e(t === "dark" ? "light" : "dark")]]), null;
}
function V({ children: e, defaultColorScheme: t = "auto" }) {
	return /* @__PURE__ */ x(c, {
		theme: N,
		colorSchemeManager: z,
		defaultColorScheme: t,
		children: [/* @__PURE__ */ b(B, {}), e]
	});
}
V.propTypes = {
	children: _.node,
	defaultColorScheme: _.oneOf([
		"light",
		"dark",
		"auto"
	])
};
//#endregion
//#region src/ColorSchemeToggle.jsx
function H({ size: t = "lg", variant: n = "default" }) {
	let { setColorScheme: r } = g(), i = h("light", { getInitialValueInEffect: !1 }) === "dark";
	return /* @__PURE__ */ b(f, {
		label: i ? "Switch to light mode" : "Switch to dark mode",
		children: /* @__PURE__ */ b(e, {
			size: t,
			variant: n,
			color: i ? "yellow" : "blue",
			onClick: () => r(i ? "light" : "dark"),
			"aria-label": "Toggle color scheme",
			children: b(i ? A : k, { size: "1.1rem" })
		})
	});
}
H.propTypes = {
	size: _.string,
	variant: _.string
};
//#endregion
//#region src/StatusBadge.jsx
function U({ status: e, ...t }) {
	let n = L[e];
	return n ? /* @__PURE__ */ b(r, {
		color: n.color,
		variant: "filled",
		...t,
		children: n.label
	}) : null;
}
U.propTypes = { status: _.oneOf(Object.keys(L)) };
//#endregion
//#region src/SiteHeader.jsx
function W({ title: t, status: n, repo: r, withBackLink: i = !0 }) {
	return /* @__PURE__ */ x(s, {
		h: "100%",
		px: "md",
		justify: "space-between",
		wrap: "nowrap",
		children: [/* @__PURE__ */ x(s, {
			gap: "xs",
			wrap: "nowrap",
			children: [
				i && /* @__PURE__ */ b(f, {
					label: "Back to Garden",
					children: /* @__PURE__ */ b(e, {
						size: "lg",
						variant: "default",
						component: "a",
						href: "/",
						"aria-label": "Back to Garden",
						children: /* @__PURE__ */ b(w, { size: "1.1rem" })
					})
				}),
				/* @__PURE__ */ b(d, {
					order: 3,
					lineClamp: 1,
					children: t
				}),
				/* @__PURE__ */ b(U, {
					status: n,
					visibleFrom: "sm"
				})
			]
		}), /* @__PURE__ */ x(s, {
			gap: "xs",
			wrap: "nowrap",
			children: [r && /* @__PURE__ */ b(f, {
				label: "Source on GitHub",
				children: /* @__PURE__ */ b(e, {
					size: "lg",
					variant: "default",
					component: "a",
					href: R(r),
					target: "_blank",
					rel: "noreferrer",
					"aria-label": "Source on GitHub",
					children: /* @__PURE__ */ b(O, { size: "1.1rem" })
				})
			}), /* @__PURE__ */ b(H, {})]
		})]
	});
}
W.propTypes = {
	title: _.node.isRequired,
	status: _.string,
	repo: _.string,
	withBackLink: _.bool
};
//#endregion
//#region src/ToolFooter.jsx
function G({ credits: e, repo: n }) {
	return /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ b(o, { my: "xl" }), /* @__PURE__ */ x(s, {
		justify: "space-between",
		align: "flex-start",
		gap: "md",
		mb: "xl",
		children: [/* @__PURE__ */ b(u, {
			size: "sm",
			c: "dimmed",
			className: "ff8-footer-credits",
			children: e ? /* @__PURE__ */ x(y, { children: ["Credit: ", e] }) : null
		}), /* @__PURE__ */ x(s, {
			gap: "md",
			wrap: "nowrap",
			children: [/* @__PURE__ */ b(t, {
				size: "sm",
				href: "/",
				children: "Back to Garden"
			}), n && /* @__PURE__ */ b(t, {
				size: "sm",
				href: R(n),
				target: "_blank",
				rel: "noreferrer",
				children: "Source"
			})]
		})]
	})] });
}
G.propTypes = {
	credits: _.node,
	repo: _.string
};
//#endregion
//#region src/ToolShell.jsx
function K({ title: e, status: r, repo: i, intro: o, links: c = [], credits: d, size: f = "lg", children: p }) {
	let m = !!o || c.length > 0;
	return /* @__PURE__ */ x(n, {
		header: { height: 60 },
		padding: "md",
		children: [/* @__PURE__ */ b(n.Header, { children: /* @__PURE__ */ b(W, {
			title: e,
			status: r,
			repo: i
		}) }), /* @__PURE__ */ b(n.Main, {
			className: "ff8-shell-main",
			children: /* @__PURE__ */ x(a, {
				size: f,
				px: 0,
				children: [
					m && /* @__PURE__ */ x(l, {
						gap: "xs",
						mb: "lg",
						children: [o && /* @__PURE__ */ b(u, {
							size: "sm",
							c: "dimmed",
							children: o
						}), c.length > 0 && /* @__PURE__ */ b(s, {
							gap: "md",
							children: c.map((e) => /* @__PURE__ */ b(t, {
								size: "sm",
								href: e.href,
								target: e.href.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								children: e.label
							}, e.href))
						})]
					}),
					p,
					/* @__PURE__ */ b(G, {
						credits: d,
						repo: i
					})
				]
			})
		})]
	});
}
K.propTypes = {
	title: _.node.isRequired,
	status: _.string,
	repo: _.string,
	intro: _.node,
	links: _.arrayOf(_.shape({
		label: _.node.isRequired,
		href: _.string.isRequired
	})),
	credits: _.node,
	size: _.oneOfType([_.string, _.number]),
	children: _.node
};
//#endregion
//#region src/DPad.jsx
var q = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right"
}, J = {
	w: "up",
	s: "down",
	a: "left",
	d: "right"
}, Y = /* @__PURE__ */ new Set([
	"INPUT",
	"TEXTAREA",
	"SELECT"
]);
function X(e) {
	return !!e && (Y.has(e.tagName) || e.isContentEditable);
}
var Z = {
	width: "65%",
	height: "65%"
};
function Q({ onPress: t, withWild: n = !1, keyboard: r = !0, keys: a = "all" }) {
	j(() => {
		if (!r) return;
		let e = (e) => {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			let n = X(e.target), r = a === "all" && !n ? J[e.key?.toLowerCase()] : void 0, i = q[e.key] ?? r;
			i && (e.preventDefault(), t(i));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		r,
		a
	]);
	let o = (e) => () => t(e);
	return /* @__PURE__ */ x(i, {
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
			/* @__PURE__ */ b(e, {
				style: { gridArea: "up" },
				size: "xl",
				variant: "default",
				onClick: o("up"),
				"aria-label": "Up",
				children: /* @__PURE__ */ b(E, { style: Z })
			}),
			/* @__PURE__ */ b(e, {
				style: { gridArea: "left" },
				size: "xl",
				variant: "default",
				onClick: o("left"),
				"aria-label": "Left",
				children: /* @__PURE__ */ b(C, { style: Z })
			}),
			n && /* @__PURE__ */ b(e, {
				style: { gridArea: "center" },
				size: "xl",
				variant: "default",
				onClick: o("wild"),
				"aria-label": "Wild",
				children: /* @__PURE__ */ b(D, { style: Z })
			}),
			/* @__PURE__ */ b(e, {
				style: { gridArea: "right" },
				size: "xl",
				variant: "default",
				onClick: o("right"),
				"aria-label": "Right",
				children: /* @__PURE__ */ b(T, { style: Z })
			}),
			/* @__PURE__ */ b(e, {
				style: { gridArea: "down" },
				size: "xl",
				variant: "default",
				onClick: o("down"),
				"aria-label": "Down",
				children: /* @__PURE__ */ b(S, { style: Z })
			})
		]
	});
}
Q.propTypes = {
	onPress: _.func.isRequired,
	withWild: _.bool,
	keyboard: _.bool,
	keys: _.oneOf(["all", "arrows"])
};
//#endregion
export { M as BRAND_GRADIENT, I as COLOR_SCHEME_KEY, H as ColorSchemeToggle, Q as DPad, V as FF8Provider, P as GARDEN_URL, F as ORG_URL, L as STATUSES, W as SiteHeader, U as StatusBadge, G as ToolFooter, K as ToolShell, R as repoUrl, N as theme };
