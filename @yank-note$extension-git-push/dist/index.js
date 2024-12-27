!(function () {
    "use strict";
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ const t =
        "@yank-note/extension-git-push";
    var n;
    (n = {
        name: t,
        register(n) {
            const e = n.i18n.createI18n({
                en: {
                    "git-push": "Git Push",
                    "git-pull": "Git Pull",
                    "not-support":
                        "Yank Note downloaded from the Mac Apple Store does not support this extension.",
                },
                "zh-CN": {
                    "git-push": "Git 推送",
                    "git-pull": "Git 拉取",
                    "not-support": "从 Mac Apple Store 中下载的应用不支持此拓展。",
                },
            });
            async function i(t) {
                if (n.args.FLAG_MAS)
                    return void (
                        (await n.ui.useModal().confirm({ content: e.t("not-support") })) &&
                        window.open(
                            "https://github.com/purocean/yn/issues/65#issuecomment-1065799677"
                        )
                    );
                const i = n.store.state.currentRepo,
                    s = i && i.path;
                if (s) {
                    let e = `pushd "${s}" && ${t}`;
                    n.store.state.showXterm || (e += " && exit"),
                        n.action.getActionHandler("xterm.run")(e);
                }
            }
            function s() {
                i("git pull && git add . && git commit -m update && git push");
            }
            function o() {
                i("git pull");
            }
            n.action.registerAction({
                name: t + ".push",
                description: e.t("git-push"),
                forUser: !0,
                handler: s,
            }),
                n.action.registerAction({
                    name: t + ".pull",
                    description: e.t("git-pull"),
                    forUser: !0,
                    handler: o,
                });
            const { h: r } = n.lib.vue;
            n.statusBar.tapMenus((i) => {
                i[t] = {
                    id: t,
                    position: "left",
                    title: r("div", { class: "extension-git-push-menu" }, [
                        r(
                            "span",
                            {
                                style: "padding-left: 4px;",
                                onClick: s,
                                title: e.t("git-push"),
                            },
                            [
                                "Git 同步"
                            ]
                        )
                    ]),
                };
            }),
                n.theme.addStyles(
                    '\n      .custom-title[data-id="@yank-note/extension-git-push"]:hover {\n        background: unset;\n      }\n\n      .extension-git-push-menu,\n      .extension-git-push-menu > span {\n        display: flex;\n        align-items: center;\n      }\n\n      .extension-git-push-menu > span {\n        cursor: pointer;\n      }\n\n      .extension-git-push-menu > span > .svg-icon {\n        margin: 0 2px;\n      }\n\n      .extension-git-push-menu > span:hover  {\n        background: rgba(255, 255, 255, 0.1);\n      }\n    '
                );
        },
    }),
        globalThis.registerPlugin(n);
})();
