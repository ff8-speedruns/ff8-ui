import { ActionIcon as e, Anchor as t, AppShell as n, Badge as r, Container as i, Divider as a, Group as o, MantineProvider as s, Stack as c, Text as l, Title as u, Tooltip as d, createTheme as f, localStorageColorSchemeManager as p, useComputedColorScheme as m, useMantineColorScheme as h } from "@mantine/core";
import g from "prop-types";
import { useHotkeys as _ } from "@mantine/hooks";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { IconArrowNarrowLeft as x, IconBrandGithub as S, IconMoonStars as C, IconSun as w } from "@tabler/icons-react";
import { useEffect as T } from "react";
//#region src/theme.js
var E = {
	from: "blue",
	to: "cyan",
	deg: 45
}, D = f({
	primaryColor: "blue",
	defaultRadius: "md",
	defaultGradient: E,
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
}), O = "/", k = "https://github.com/ff8-speedruns", A = "ff8-color-scheme", j = {
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
function M(e) {
	return e?.startsWith("http") ? e : `${k}/${e}`;
}
//#endregion
//#region src/FF8Provider.jsx
var N = p({ key: A });
function P() {
	let { setColorScheme: e } = h(), t = m("light", { getInitialValueInEffect: !1 });
	return _([["mod+J", () => e(t === "dark" ? "light" : "dark")]]), null;
}
function F({ children: e, defaultColorScheme: t = "auto" }) {
	return /* @__PURE__ */ b(s, {
		theme: D,
		colorSchemeManager: N,
		defaultColorScheme: t,
		children: [/* @__PURE__ */ y(P, {}), e]
	});
}
F.propTypes = {
	children: g.node,
	defaultColorScheme: g.oneOf([
		"light",
		"dark",
		"auto"
	])
};
//#endregion
//#region src/ColorSchemeToggle.jsx
function I({ size: t = "lg", variant: n = "default" }) {
	let { setColorScheme: r } = h(), i = m("light", { getInitialValueInEffect: !1 }) === "dark";
	return /* @__PURE__ */ y(d, {
		label: i ? "Switch to light mode" : "Switch to dark mode",
		children: /* @__PURE__ */ y(e, {
			size: t,
			variant: n,
			color: i ? "yellow" : "blue",
			onClick: () => r(i ? "light" : "dark"),
			"aria-label": "Toggle color scheme",
			children: y(i ? w : C, { size: "1.1rem" })
		})
	});
}
I.propTypes = {
	size: g.string,
	variant: g.string
};
//#endregion
//#region src/StatusBadge.jsx
function L({ status: e, ...t }) {
	let n = j[e];
	return n ? /* @__PURE__ */ y(r, {
		color: n.color,
		variant: "filled",
		...t,
		children: n.label
	}) : null;
}
L.propTypes = { status: g.oneOf(Object.keys(j)) };
//#endregion
//#region src/SiteHeader.jsx
function R({ title: t, status: n, repo: r, withBackLink: i = !0 }) {
	return /* @__PURE__ */ b(o, {
		h: "100%",
		px: "md",
		justify: "space-between",
		wrap: "nowrap",
		children: [/* @__PURE__ */ b(o, {
			gap: "xs",
			wrap: "nowrap",
			children: [
				i && /* @__PURE__ */ y(d, {
					label: "Back to Garden",
					children: /* @__PURE__ */ y(e, {
						size: "lg",
						variant: "default",
						component: "a",
						href: "/",
						"aria-label": "Back to Garden",
						children: /* @__PURE__ */ y(x, { size: "1.1rem" })
					})
				}),
				/* @__PURE__ */ y(u, {
					order: 3,
					lineClamp: 1,
					children: t
				}),
				/* @__PURE__ */ y(L, {
					status: n,
					visibleFrom: "sm"
				})
			]
		}), /* @__PURE__ */ b(o, {
			gap: "xs",
			wrap: "nowrap",
			children: [r && /* @__PURE__ */ y(d, {
				label: "Source on GitHub",
				children: /* @__PURE__ */ y(e, {
					size: "lg",
					variant: "default",
					component: "a",
					href: M(r),
					target: "_blank",
					rel: "noreferrer",
					"aria-label": "Source on GitHub",
					children: /* @__PURE__ */ y(S, { size: "1.1rem" })
				})
			}), /* @__PURE__ */ y(I, {})]
		})]
	});
}
R.propTypes = {
	title: g.node.isRequired,
	status: g.string,
	repo: g.string,
	withBackLink: g.bool
};
//#endregion
//#region src/ToolFooter.jsx
function z({ credits: e, repo: n }) {
	return /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y(a, { my: "xl" }), /* @__PURE__ */ b(o, {
		justify: "space-between",
		align: "flex-start",
		gap: "md",
		mb: "xl",
		children: [/* @__PURE__ */ y(l, {
			size: "sm",
			c: "dimmed",
			className: "ff8-footer-credits",
			children: e ? /* @__PURE__ */ b(v, { children: ["Credit: ", e] }) : null
		}), /* @__PURE__ */ b(o, {
			gap: "md",
			wrap: "nowrap",
			children: [/* @__PURE__ */ y(t, {
				size: "sm",
				href: "/",
				children: "Back to Garden"
			}), n && /* @__PURE__ */ y(t, {
				size: "sm",
				href: M(n),
				target: "_blank",
				rel: "noreferrer",
				children: "Source"
			})]
		})]
	})] });
}
z.propTypes = {
	credits: g.node,
	repo: g.string
};
//#endregion
//#region src/ToolShell.jsx
function B({ title: e, status: r, repo: a, intro: s, links: u = [], credits: d, size: f = "lg", children: p }) {
	let m = !!s || u.length > 0;
	return /* @__PURE__ */ b(n, {
		header: { height: 60 },
		padding: "md",
		children: [/* @__PURE__ */ y(n.Header, { children: /* @__PURE__ */ y(R, {
			title: e,
			status: r,
			repo: a
		}) }), /* @__PURE__ */ y(n.Main, {
			className: "ff8-shell-main",
			children: /* @__PURE__ */ b(i, {
				size: f,
				px: 0,
				children: [
					m && /* @__PURE__ */ b(c, {
						gap: "xs",
						mb: "lg",
						children: [s && /* @__PURE__ */ y(l, {
							size: "sm",
							c: "dimmed",
							children: s
						}), u.length > 0 && /* @__PURE__ */ y(o, {
							gap: "md",
							children: u.map((e) => /* @__PURE__ */ y(t, {
								size: "sm",
								href: e.href,
								target: e.href.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								children: e.label
							}, e.href))
						})]
					}),
					p,
					/* @__PURE__ */ y(z, {
						credits: d,
						repo: a
					})
				]
			})
		})]
	});
}
B.propTypes = {
	title: g.node.isRequired,
	status: g.string,
	repo: g.string,
	intro: g.node,
	links: g.arrayOf(g.shape({
		label: g.node.isRequired,
		href: g.string.isRequired
	})),
	credits: g.node,
	size: g.oneOfType([g.string, g.number]),
	children: g.node
};
//#endregion
//#region src/DPad.jsx
var V = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right"
}, H = {
	w: "up",
	s: "down",
	a: "left",
	d: "right"
}, U = /* @__PURE__ */ new Set([
	"INPUT",
	"TEXTAREA",
	"SELECT"
]);
function W(e) {
	return !!e && (U.has(e.tagName) || e.isContentEditable);
}
function G({ onPress: e, withWild: t = !1, active: n = null, keyboard: r = !0, keys: i = "all" }) {
	T(() => {
		if (!r) return;
		let t = (t) => {
			if (t.ctrlKey || t.metaKey || t.altKey) return;
			let n = W(t.target), r = i === "all" && !n ? H[t.key?.toLowerCase()] : void 0, a = V[t.key] ?? r;
			a && (t.preventDefault(), e(a));
		};
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [
		e,
		r,
		i
	]);
	let a = (t) => (n) => {
		n.preventDefault(), e(t);
	};
	return /* @__PURE__ */ y("div", {
		className: "ff8-dpad-set",
		children: /* @__PURE__ */ b("div", {
			className: [
				"ff8-dpad",
				n && `ff8-dpad--${n}`,
				t && "ff8-dpad--wild"
			].filter(Boolean).join(" "),
			children: [
				/* @__PURE__ */ y("a", {
					className: "ff8-dpad__up",
					href: "#up",
					onClick: a("up"),
					"aria-label": "Up"
				}),
				/* @__PURE__ */ y("a", {
					className: "ff8-dpad__right",
					href: "#right",
					onClick: a("right"),
					"aria-label": "Right"
				}),
				/* @__PURE__ */ y("a", {
					className: "ff8-dpad__down",
					href: "#down",
					onClick: a("down"),
					"aria-label": "Down"
				}),
				/* @__PURE__ */ y("a", {
					className: "ff8-dpad__left",
					href: "#left",
					onClick: a("left"),
					"aria-label": "Left"
				}),
				t && /* @__PURE__ */ y("a", {
					className: "ff8-dpad__wild",
					href: "#wild",
					onClick: a("wild"),
					"aria-label": "Wild",
					children: "✱"
				})
			]
		})
	});
}
G.propTypes = {
	onPress: g.func.isRequired,
	withWild: g.bool,
	active: g.oneOf([
		"up",
		"down",
		"left",
		"right"
	]),
	keyboard: g.bool,
	keys: g.oneOf(["all", "arrows"])
};
//#endregion
export { E as BRAND_GRADIENT, A as COLOR_SCHEME_KEY, I as ColorSchemeToggle, G as DPad, F as FF8Provider, O as GARDEN_URL, k as ORG_URL, j as STATUSES, R as SiteHeader, L as StatusBadge, z as ToolFooter, B as ToolShell, M as repoUrl, D as theme };
