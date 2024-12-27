window.registerPlugin({
  name: 'copy-plugin',
  register: ctx => {
	 
	console.log(ctx.getPremium());
	console.log(ctx.getPremium());
    console.log('example-plugin', 'register', ctx);
     ctx.statusBar.tapMenus(menus => {
            menus['plugin-copy'] = {
                id: 'plugin-copy',
                position: 'left',
                title: 'Copy',
                onClick: () => {
					let markdown = ctx.store.state.currentContent;
					markdown = markdown.replace(/https:\/\/static\.trumandu\.top\//g, "http://image.trumandu.top/");
                    ctx.utils.copyText(markdown)
                    ctx.ui.useToast().show('info', '复制成功!');
                }
            }
        })
  }
});