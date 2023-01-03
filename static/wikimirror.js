/*!
 * @author 安忆 i@anyi.in
 * @file wikimirror.js
 *
 * Copyright (c) 2019-present, 安忆.
 *
 * This source code is licensed under the GPL v3 license.
 */
'use strict';
if ((function() {try {return !!new Function('a => a')} catch(e) {}})()) {
document.html = document.documentElement;
const [d, w, h, o, isZhwiki] = [document, window, 'example.org', 'wikimedia.org', /^zh(?:\.m)?\.wikipedia/.test(location.host)],
AnYiMirrorPrivateMethod = new function() {
	const AnYi = this;
	AnYi.getConf = item => {
		if (typeof w.mw === 'object' && typeof mw.config.get === 'function') return mw.config.get(item);
		if (typeof w.RLCONF === 'object' && w.RLCONF[item] !== void 0) return w.RLCONF[item];
		return null;
	}
	AnYi.getLocate = method => {
		const [originHash, originHost, originUrl] = [AnYi.getRealText(w.location.hash), AnYi.getRealText(w.location.host), AnYi.getRealText(w.location.href)];
		switch (method) {
		case 'originHash':
			return originHash;
		case 'originHost':
			return originHost;
		case 'originUrl':
			return originUrl;
		default:
			return originUrl;
		}
	}
	AnYi.getRealText = (value, method) => {
		const [reg1, reg2, reg3] = [/example\.org/gi, /(wiki(?:books|data|news|pedia|quote|source|versity|voyage)|wiktionary|mediawiki|planet)\.example\.org/gi, /latex-(png|svg)\.example\.org/gi],
			[reg4, reg5, reg6] = [/\\\.wikipedia\\\.\(example\\\.\)\?org/g, /background(-image)?:url\(('|")?(https?:)?\/\/upload\.wikimedia\.org/gi, /([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030)/g],
			[wBox, wDom, u] = [d.getElementById('wpTextbox1'), d.querySelectorAll(`${AnYi.hasClass('diff', 'table')?'.mw-parser-output,.mw-parser-output *':'.mw-body,.mw-body *'}`), `//upload.${h}`],
			wTex = (nodeArr = []) => {
					if (!wDom || (AnYi.hasClass('mw-special-AbuseFilter') || AnYi.hasClass('mw-special-EditWatchlist') || AnYi.hasClass('mw-special-Search')) && (typeof w.AnYiMirror === 'object' && (typeof w.AnYiMirror.getRealText === 'function' && (typeof w.AnYiMirror.getRealText.initCount === 'number' && w.AnYiMirror.getRealText.initCount < 1 || typeof w.AnYiMirror.getRealText.initCount === 'undefined') || typeof w.AnYiMirror.getRealText === 'undefined') || typeof w.AnYiMirror === 'undefined') && !AnYi.hasClass('action-history')) return;
					for (const dom of wDom) {
						for (const node of dom.childNodes) {
							node.nodeType === 3 && nodeArr.push(node);
						}
					}
					for (const node of nodeArr) {
						let text = node.nodeValue;
						(text.match(reg1) || text.match(reg4)) && (text = AnYi.getRealText(text));
						text.match(reg5) && AnYi.hasClass('action-view') && (text = text.replace(reg5, `background$1:url($2$3${u}`));
						node.nodeValue !== text && (node.nodeValue = text);
						if (text.match(reg6) && !(AnYi.hasClass('action-edit') || AnYi.hasClass('action-submit')) && (typeof w.AnYiMirror === 'object' && (typeof w.AnYiMirror.getRealText === 'function' && (typeof w.AnYiMirror.getRealText.initCount === 'number' && w.AnYiMirror.getRealText.initCount < 1 || typeof w.AnYiMirror.getRealText.initCount === 'undefined') || typeof w.AnYiMirror.getRealText === 'undefined') || typeof w.AnYiMirror === 'undefined')) {
							const el = d.createElement('anyi-emoji-line');
							el.innerHTML = node.nodeValue.replace(reg6, '<anyi-emoji class="mw-no-invert">$1</anyi-emoji>');
							node.parentNode.insertBefore(el, node.nextSibling);
							node.remove();
						}
					}
					for (const dom of d.querySelectorAll('a[href*="archive."]')) {
						reg1.test(dom.href) && (dom.href = AnYi.getRealText(dom.href));
					}
					for (const dom of d.querySelectorAll(`a[href$="${h}/"]`)) {
						if (!/(?:analytics|annual|bugzilla|config-master|dbtree|design|developer|doc|grafana|horizon|id-internal(?:\.m)?|il|integration|logstash|noc|office(?:\.m)?|performance|phabricator|research|schema|secure|static-bugzilla|svn|ticket|toolsadmin|transparency)\./.test(dom.href)) dom.href = `${dom.href}w`;
					}
					for (const dom of d.querySelectorAll('input[name="clientUrl"],input[name="intendedWikitext"]')) {
						reg1.test(dom.value) && (dom.value = AnYi.getRealText(dom.value));
					}
					const dom = d.querySelector('#ca-fileExporter a'),
						url = dom ? dom.href.match(/clientUrl=(\S+?)&/)[1] : '';
					if (dom) dom.href = dom.href.replace(url, AnYi.getRealText(url));
				};
		if (method === 'emoji') return value.match(reg6) ? value.replace(reg6, '<anyi-emoji class="mw-no-invert">$1</anyi-emoji>') : value;
		if (method === 'wiki') {
			wTex();
			if (wBox) {
				typeof w.wikEd === 'object' && w.wikEd.useWikEd && w.wikEd.UpdateTextarea();
				typeof w.jQuery === 'function' ? value = w.jQuery('#wpTextbox1').val() : value = wBox.value;
			}
		}
		if (value !== null && value !== void 0) Object.prototype.toString.call(value) === '[object String]' ? value = value.replace(reg3, `${o}/api/rest_v1/media/math/render/$1`).replace(reg2, '$1.org').replace(reg1, o).replace(reg4, '\\.wikipedia\\.org').replace(/r-e-p-l-a-c-e\.org/g, h) : (Object.prototype.toString.call(value) === '[object Boolean]' || Object.prototype.toString.call(value) === '[object BigInt]' || Object.prototype.toString.call(value) === '[object Number]') ? void 0 : value = Object.prototype.toString.call(value);
		if (value && value !== true && wBox && method === 'wiki') {
			typeof w.jQuery === 'function' ? w.jQuery('#wpTextbox1').val(value) : wBox.value = value;
			typeof w.wikEd === 'object' && w.wikEd.useWikEd && w.wikEd.UpdateFrame();
		}
		return value;
	}
	AnYi.decodeURIComponent = value => decodeURIComponent((v => {
		try {
			return decodeURIComponent(v);
		} catch(e) {
			return v.replace(/%(?!\d+)/g, '%25');
		}
	})(value).replace(/\+/g, '%20'));
	AnYi.hasClass = (name, selector = 'body') => {
		if (!name || !d.querySelector(selector)) return;
		for (const dom of d.querySelectorAll(selector)) {
			if (dom.classList.contains(name)) return true;
		}
	}
	AnYi.setCss = (value, method = 'css', id) => {
		switch (method) {
		case 'add':
			value && !d.getElementById(value) && !!AnYi.extraCss(value) && AnYi.setCss(AnYi.extraCss(value), 'css', value);
			break;
		case 'remove':
			value && d.getElementById(value) && d.getElementById(value).remove();
			break;
		case 'css':
			if (!value || id && d.getElementById(id)) return;
			const style = d.createElement('style');
			id && (style.id = id);
			style.append(d.createTextNode(value));
			d.head.append(style);
			break;
		case 'url':
			return new Promise((s, e) => {
				if (!value) e();
				const link = d.createElement('link');
				id && (link.id = id);
				link.href = value;
				link.rel = 'stylesheet';
				link.onload = () => s();
				link.onerror = () => e();
				d.head.append(link);
			});
		}
	}
	AnYi.setJs = (url, method) => {
		return new Promise((s, e) => {
			const script = d.createElement('script');
			url ? script.src = url : e();
			method === 'async' && (script.async = true);
			method === 'defer' && (script.defer = true);
			script.onload  = () => s();
			script.onerror = () => e();
			d.head.append(script);
		})
	}
	AnYi.showRedirect = id => {
		if (d.getElementById(id)) return;
		const [text1, text2] = [`${AnYi.wgUVS('将当', '將當')}前${AnYi.wgUVS('镜', '鏡')}像站${AnYi.wgUVS('页', '頁')}面重${AnYi.wgUVS('定', '新導')}向至官方相${AnYi.wgUVS('页面', '頁')}`, `${AnYi.wgULS('访问', '造訪')}官方${AnYi.wgULS('页面', '頁')}`],
			[AnYiRedirect, AnYiRedirectMinerva] = [`<li id="${id}"><a href="${AnYi.getLocate('originUrl')}" target="_blank" title="${text1}">${text2}</a></li>`, `<li id="${id}"><a class="mw-ui-icon mw-ui-icon-before mw-ui-icon-minerva-logOut" href="${AnYi.getLocate('originUrl')}" target="_blank" title="${text1}"><span>${text2}</span></a></li>`];
		AnYi.hasClass('skin-apioutput') && d.querySelector('.apihelp-flags>ul') ? d.querySelector('.apihelp-flags>ul').insertAdjacentHTML('beforeEnd', AnYiRedirect)
		: AnYi.hasClass('skin-cologneblue') && d.getElementById('titlelinks') ? d.getElementById('titlelinks').insertAdjacentHTML('beforeEnd', AnYiRedirect.replace('<li', '<span').replace('li>', 'span>'))
		: AnYi.hasClass('skin-contenttranslation') && d.getElementById('p-tb') ? d.getElementById('p-tb').insertAdjacentHTML('beforeEnd', AnYiRedirect)
		: AnYi.hasClass('skin-minerva') && d.getElementById('p-donation') ? d.getElementById('p-donation').insertAdjacentHTML('beforeEnd', AnYiRedirectMinerva)
		: AnYi.hasClass('skin-modern') && d.getElementById('footer-info') ? d.getElementById('footer-info').insertAdjacentHTML('beforeEnd', AnYiRedirect)
		: AnYi.hasClass('skin-monobook') && d.getElementById('f-list') ? d.getElementById('f-list').insertAdjacentHTML('beforeEnd', AnYiRedirect)
		: AnYi.hasClass('skin-nostalgia') && d.getElementById('searchform') ? d.getElementById('searchform').insertAdjacentHTML('beforebegin', AnYiRedirect.replace('<li', '<span').replace('li>', 'span>'))
		: (AnYi.hasClass('skin-timeless') || AnYi.hasClass('skin-vector')) && d.getElementById('footer-places') ? d.getElementById('footer-places').insertAdjacentHTML('beforeEnd', AnYiRedirect) : void 0;
	}
	AnYi.articleInfo = (id, dom) => {
		if (d.getElementById(id)) return;
		(AnYi.hasClass('skin-cologneblue') || AnYi.hasClass('skin-nostalgia')) ? dom = d.getElementById('mw-content-text')
		: AnYi.hasClass('skin-minerva') && !AnYi.hasClass('page-Main_Page') ? dom = d.querySelector('.minerva__subtitle')
		: dom = d.getElementById('contentSub');
		if (d.getElementById(id) || !dom || AnYi.getConf('wgCurRevisionId') === 0 || AnYi.getConf('wgRevisionId') === 0 || AnYi.getConf('wgCurRevisionId') !== AnYi.getConf('wgRevisionId') || !AnYi.getConf('wgIsArticle') || !AnYi.getConf('wgUserName') || !AnYi.hasClass('action-view')) return;
		const e = `<span style="line-height:20px;margin-left:19px">ArticleInfo${AnYi.wgUVS('加载', '載入')}失${AnYi.wgUVS('败', '敗')}</span>`;
		w.fetch(`//articleinfo.${h}/${AnYi.getConf('wgDBname')}/${AnYi.getConf('wgPageName').replace(/["%&?+\\]/g, escape)}?format=html&uselang=${AnYi.getConf('wgUserLanguage')}`).then(data => {
			if (data.status === 200) return data.text()
			else return e;
		}).catch(() => e).then(data => {
			dom.insertAdjacentHTML('beforebegin', `<div class="noprint" id="${id}"><span id="${id}_result"></span></div>`);
			d.getElementById(`${id}_result`).insertAdjacentHTML('afterbegin', data.replace(/\/\/([a-z-]+(?:\.m)?)\.wikimedia\.org/g, `//$1.${h}`).replace(/\/\/([a-z-]+)?(\.wiki(?:books|data|news|pedia|quote|versity|voyage)|\.?wikisource|\.wiktionary|\.mediawiki)\.org/g, `//$1$2.${h}`));
		});
	}
	AnYi.collapsibleSidebar = () => AnYi.hasClass('ltr') && AnYi.hasClass('skin-vector-legacy') && !isZhwiki && !['bo', 'dz'].includes(AnYi.getConf('wgContentLanguage')) && mw.loader.using('mediawiki.storage').then(() => AnYi.setJs(`//zh.wikipedia.${h}/wiki/MediaWiki:Gadget-CollapsibleSidebar.js?action=raw&ctype=text/javascript`, 'defer').then(() => console.log('AnYiMirror collapsibleSidebar.js load succeeded.')).catch(() => console.log('AnYiMirror collapsibleSidebar.js load failed.')));
	AnYi.confirmLogout = () => {
		const dom = d.querySelector('#topbar>a[href*="UserLogout"]') || d.querySelector('#ca-cb-logout>a') || d.querySelector('.menu__item--logout') || d.querySelector('#pt-logout>a');
		if (!dom || !AnYi.getConf('wgUserName') || isZhwiki) return;
		const newDom = d.createElement('a');
		dom.className && (newDom.className = dom.className);
		newDom.href = dom.href;
		newDom.innerHTML = dom.innerHTML;
		dom.parentNode.append(newDom);
		dom.remove();
		newDom.addEventListener('click', async (e, token) => {
			e.preventDefault();
			e.stopPropagation();
			await mw.loader.using('oojs-ui-windows');
			OO.ui.confirm(w.jQuery(`<div class="AnYiNotice AnYiTip"><span style="font-size:1.2rem">您${AnYi.wgUVS('确', '確')}定要${AnYi.wgUVS('退', '登')}出${AnYi.wgUVS('吗', '嗎')}？</span></div>`)).then(async confirmed => {
				if (!confirmed) return;
				await mw.loader.using('mediawiki.notification');
				const notice = `<span>${mw.message('logging-out-notify')}</span>`;
				typeof w.bldkDingExposedInterface === 'function' ? w.bldkDingExposedInterface(notice, 'default', 'long') : mw.notification.notify([`<div class="AnYiNotice">${notice}<button>了解</button></div>`], {autoHide: false});
				await w.fetch('/w/api.php?action=query&format=json&meta=tokens&type=csrf').then(data => data.json()).then(data => data.query && data.query.tokens && (token = data.query.tokens.csrftoken.replace('+', '%2B')));
				w.fetch('/w/api.php', {
					body: `action=logout&format=json&token=${token}`,
					headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
					method: 'POST',
				}).then(() => w.location.reload());
			});
		});
	}
	AnYi.darkMode = (method, item, value) => {
		if (!AnYi.localStorage(void 0, void 0, 'check')) return;
		const [id, name] = ['anyi-darkmode', 'AnYiDarkMode'],
			isDarkMode = w.matchMedia('(prefers-color-scheme:dark)').matches,
			modeObserver = {
					dark: mediaQueryList => {
						if (mediaQueryList.matches && AnYi.localStorage(name) === '0') {
							modeSwitcher();
							AnYi.darkMode('insert');
						}
					},
					light: mediaQueryList => {
						if (mediaQueryList.matches && AnYi.localStorage(name) === '1') {
							modeSwitcher();
							AnYi.darkMode('insert');
						}
					}
				},
			modeSwitcher = () => AnYi.localStorage(name) === '0' ? AnYi.localStorage(name, '1', 'set') : AnYi.localStorage(name, '0', 'set');
		switch (method) {
		case 'add':
			d.html.classList.add(id);
			d.html.style.filter = '';
			isZhwiki && (AnYi.hasClass('skin-monobook') || AnYi.hasClass('skin-vector-legacy')) && AnYi.setCss('anyi-css-darkmode-logo-zhwiki', 'add');
			if (!/^(?!zh\.)\S+?(?:\.m)?\.wikipedia/.test(w.location.host)) return;
			AnYi.hasClass('skin-monobook') && AnYi.setCss('anyi-css-darkmode-logo-wiki-monobook', 'add');
			AnYi.hasClass('skin-vector-legacy') && AnYi.setCss('anyi-css-darkmode-logo-wiki-vector-legacy', 'add');
			break;
		case 'remove':
			d.html.classList.remove(id);
			AnYi.setCss('anyi-css-darkmode-logo-zhwiki', 'remove');
			AnYi.setCss('anyi-css-darkmode-logo-wiki-monobook', 'remove');
			AnYi.setCss('anyi-css-darkmode-logo-wiki-vector-legacy', 'remove');
			break;
		case 'check':
			if (!AnYi.localStorage(name)) isDarkMode ? AnYi.localStorage(name, '1', 'set') : AnYi.localStorage(name, '0', 'set');
			if (AnYi.localStorage(name) === '1') return true;
			break;
		case 'init':
			w.matchMedia('(prefers-color-scheme:dark)').addListener(modeObserver.dark);
			w.matchMedia('(prefers-color-scheme:light)').addListener(modeObserver.light);
			w.addEventListener('storage', e => e.key === name ? AnYi.darkMode('insert') : void 0);
			const dc = () => {
					/^(?!zh\.)\S+?(?:\.m)?\.wikipedia/.test(w.location.host) && (AnYi.hasClass('skin-monobook') || AnYi.hasClass('skin-vector-legacy')) && d.getElementById('p-logo') && (d.getElementById('p-logo').style.transition = 'background-size,height .5s ease-in-out');
					d.removeEventListener('DOMContentLoaded', dc);
				};
			d.readyState !== 'loading' ? dc() : d.addEventListener('DOMContentLoaded', dc);
			AnYi.darkMode('insert');
			if (!AnYi.hasClass('skin-vector-legacy')) return;
			let timer;
			const debounce = ms => {
					const fn = () => {
							d.html.style.height = 'auto';
							d.html.style.height = `${d.html.scrollHeight}px`;
						};
					if (timer) {
						w.clearTimeout(timer);
						timer = w.setTimeout(() => fn(), ms);
					} else {
						timer = w.setTimeout(() => fn(), ms);
					}
				},
				mo = new MutationObserver(() => debounce(500)),
				ro = new ResizeObserver(() => debounce(1000));
			mo.observe(d.body, {attributes: true, childList: true, subtree: true});
			ro.observe(d.body);
			break;
		case 'insert':
			d.html.style.transition = 'filter .5s ease-in-out';
			AnYi.hasClass('skin-cologneblue') ? d.html.style.backgroundColor = '#ffffec'
			: AnYi.hasClass('skin-contenttranslation') ? d.html.style.backgroundColor = '#eaecf0'
			: AnYi.hasClass('skin-minerva') ? d.querySelector('.main-menu-mask').style.transition = 'background .5s ease-in-out,opacity 100ms ease-in-out,visibility 0s linear 100ms'
			: AnYi.hasClass('skin-modern') ? d.html.style.backgroundColor = '#f0f0f0'
			: AnYi.hasClass('skin-monobook') ? d.html.style.backgroundColor = '#f9f9f9'
			: AnYi.hasClass('skin-vector-2022') ? d.html.style.backgroundColor = '#f8f9fa'
			: AnYi.hasClass('skin-vector-legacy') ? d.html.style.backgroundColor = '#f6f6f6' : void 0;
			if (AnYi.hasClass('skin-apioutput')) {
				d.html.style.backgroundColor = '#fff';
				d.html.style.color = '#000';
			}
			if (AnYi.hasClass('skin-timeless')) {
				d.body.style.transition = 'background-color .5s ease-in-out';
				d.html.style.height = '100%';
			}
			const dom = d.querySelector(`#${id}>a`);
			if (AnYi.localStorage(name) === '1') {
				AnYi.darkMode('add');
				AnYi.darkMode('meta', 'color-scheme', 'dark');
				AnYi.hasClass('skin-minerva') ? AnYi.darkMode('meta', 'theme-color', '#27292c') : AnYi.darkMode('meta', 'theme-color', '#191919');
				if (!dom) return;
				dom.innerHTML = dom.innerHTML.replace(AnYi.darkMode('text', 'dark'), AnYi.darkMode('text', 'light'));
				dom.setAttribute('title', AnYi.darkMode('text', 'lightTip'));
			} else if (AnYi.localStorage(name) === '0') {
				AnYi.darkMode('remove');
				AnYi.darkMode('meta', 'color-scheme', 'remove');
				AnYi.hasClass('skin-cologneblue') ? AnYi.darkMode('meta', 'theme-color', '#68a')
				: AnYi.hasClass('skin-minerva') ? AnYi.darkMode('meta', 'theme-color', '#eaecf0')
				: AnYi.hasClass('skin-modern') ? AnYi.darkMode('meta', 'theme-color', '#036')
				: AnYi.hasClass('skin-monobook') ? AnYi.darkMode('meta', 'theme-color', '#e6e6e6')
				: AnYi.darkMode('meta', 'theme-color', 'remove');
				if (!dom) return;
				dom.innerHTML = dom.innerHTML.replace(AnYi.darkMode('text', 'light'), AnYi.darkMode('text', 'dark'));
				dom.setAttribute('title', AnYi.darkMode('text', 'darkTip'));
			}
			break;
		case 'meta':
			const [meta, metaId, metaName] = [d.createElement('meta'), `anyi-meta-${item}`, item],
				[old, tag] = [d.querySelector(`meta[name='${metaName}']`), d.getElementById(metaId)];
			meta.content = value;
			meta.id = metaId;
			meta.name = metaName;
			old && !old.id && old.remove();
			value === 'remove' ? tag && tag.remove() : tag ? tag.content = value : d.head.append(meta);
			break;
		case 'normal':
			if (d.getElementById(id)) return;
			const click = button => (button ? button.firstElementChild : d.getElementById(id)).addEventListener('click', e => {
						e.preventDefault();
						modeSwitcher();
						AnYi.darkMode('insert');
					}),
				[pos, set, unset] = [d.getElementById('pt-preferences') || d.getElementById('p-personal'), AnYi.localStorage(name) === '1', AnYi.localStorage(name) === '0'];
			if (pos && AnYi.hasClass('skin-minerva')) {
				set && pos.insertAdjacentHTML('beforeEnd', `${AnYi.darkMode('text', 'comHead')}${AnYi.darkMode('text', 'lightTip')}"><span>${AnYi.darkMode('text', 'light')}</span></a></li>`);
				unset && pos.insertAdjacentHTML('beforeEnd', `${AnYi.darkMode('text', 'comHead')}${AnYi.darkMode('text', 'darkTip')}"><span>${AnYi.darkMode('text', 'dark')}</span></a></li>`);
				click();
			} else if (d.getElementById('p-tb') || AnYi.hasClass('skin-apioutput') || AnYi.hasClass('skin-nostalgia')) {
				const pos = (AnYi.hasClass('skin-apioutput') || AnYi.hasClass('skin-nostalgia')) ? 'mw-content-text' : 'p-tb';
				mw.loader.using('mediawiki.util').then(() => {
					set && click(mw.util.addPortletLink(pos, '#', AnYi.darkMode('text', 'light'), id, AnYi.darkMode('text', 'lightTip')));
					unset && click(mw.util.addPortletLink(pos, '#', AnYi.darkMode('text', 'dark'), id, AnYi.darkMode('text', 'darkTip')));
				});
			}
			break;
		case 'text':
			if (item === 'comHead') return `<li id="${id}"><a class="mw-ui-icon mw-ui-icon-before" title="`;
			if (item === 'dark') return `深色主${AnYi.wgUVS('题', '題')}`;
			if (item === 'light') return `${AnYi.wgUVS('浅', '淺')}色主${AnYi.wgUVS('题', '題')}`;
			if (item === 'darkTip') return `${AnYi.wgUVS('将镜', '將鏡')}像站的主${AnYi.wgUVS('题', '題')}色切${AnYi.wgUVS('换', '換')}至深色`;
			if (item === 'lightTip') return `${AnYi.wgUVS('将镜', '將鏡')}像站的主${AnYi.wgUVS('题', '題')}色切${AnYi.wgUVS('换', '換')}至${AnYi.wgUVS('浅', '淺')}色`;
			break;
		}
	}
	AnYi.diffLink = (id, diffId, oldId, revisionId, pos) => {
		if (d.getElementById(id) || !(d.getElementById('p-cactions') || d.getElementById('p-tb') || AnYi.hasClass('skin-nostalgia') || AnYi.hasClass('mw-special-MobileDiff')) || !(d.getElementById('mw-revision-nav') || AnYi.hasClass('diff', 'table')) || /^(?:wuu|zh)(?:\.m)?\.wikipedia/.test(w.location.host)) return;
		AnYi.hasClass('mw-special-MobileDiff') ? pos = 'mw-mf-diffarea'
		: AnYi.hasClass('skin-nostalgia') ? pos = 'mw-content-text'
		: AnYi.hasClass('skin-minerva') ? pos = 'p-tb'
		: pos = 'p-cactions';
		const ins = async (tex, dec, link, prema, dom = d.getElementById(id)) => {
					await mw.loader.using(['mediawiki.util', 'mediawiki.widgets', 'oojs-ui-windows']);
					if (dom === null) {
						dom = mw.util.addPortletLink(pos, '#', tex, id, dec);
						pos === 'mw-mf-diffarea' && AnYi.setCss(`#${id}{float:right}#${id}>a>span:first-child{vertical-align:text-bottom}`, 'css', `anyi-css-difflink`);
					}
					(pos !== 'mw-mf-diffarea' && AnYi.hasClass('skin-minerva') ? dom : dom.firstElementChild).onclick = e => {
						e.preventDefault();
						const $dom = w.jQuery('<div>');
						[link, `[[${link}${prema?AnYi.decodeURIComponent(AnYi.getLocate('originHash')):''}]]`].forEach(value => $dom.append(new mw.widgets.CopyTextLayout({align: 'top', copyText: value}).$element));
						/(?:Android|iPhone|Mobile)/i.test(navigator.userAgent) ? OO.ui.alert($dom) : OO.ui.alert($dom, {size: 'medium'});
					}
				};
		if (diffId) {
			const buildLink = (oldId, link = 'Special:Diff/') => {
						oldId && (link += `${oldId}/`);
						link += diffId;
						ins(`${AnYi.wgUVS('当', '當')}前差${AnYi.wgUVS('异链接', '異連結')}`, `${AnYi.wgUVS('复制链接', '複製連結')}到${AnYi.wgUVS('当前', '當前')}差${AnYi.wgUVS('异', '異')}版本的${AnYi.wgUVS('维', '維')}基${AnYi.wgUVS('语', '語')}法`, link);
					};
			buildLink(oldId);
			oldId && w.fetch(`/w/api.php?action=compare&format=json&fromrev=${diffId}&prop=ids&torelative=prev`).then(data => data.json()).then(data => diffId === AnYi.getConf('wgDiffNewId') && data.compare && data.compare.fromrevid === AnYi.getConf('wgDiffOldId') && buildLink(false));
		} else if ((d.getElementById('contentSub').querySelectorAll('#mw-revision-nav').length === 1 || d.querySelectorAll('main#content>.pre-content #mw-revision-nav').length === 1) && revisionId) {
			ins(`${AnYi.wgUVS('当', '當')}前修${AnYi.wgUVS('订链接', '訂連結')}`, `${AnYi.wgUVS('复制链接', '複製連結')}到${AnYi.wgUVS('当', '當')}前修${AnYi.wgUVS('订', '訂')}版本的${AnYi.wgUVS('维', '維')}基${AnYi.wgUVS('语', '語')}法`, `Special:PermaLink/${revisionId}`, true);
		}
	}
	AnYi.disableAnonEdit = () => {
		if (AnYi.getConf('wgUserName')) return;
		mw.hook('wikipage.editform').add($dom => {
			$dom.find('#wpSummary').prop('readonly', true);
			$dom.find('#wpTextbox1').prop('readonly', true);
		});
		mw.hook('mobileFrontend.editorOpened').add(() => w.jQuery('#wikitext-editor').prop('readonly', true));
		mw.hook('ve.activationComplete').add((surface = w.ve.init.target.getSurface()) => surface && surface.setReadOnly(true));
	}
	AnYi.displayAnonHide = id => {
		const [tag, isLogin] = [d.getElementsByTagName('noscript'), AnYi.getConf('wgUserName')];
		isLogin && AnYi.setCss(id, 'remove');
		!isLogin && AnYi.hasClass('mw-special-CreateAccount') && w.location.replace('/wiki/Special:Userlogin');
	}
	AnYi.extraCss = id => {
		const [c, u] = ['.mw-wiki-logo{background-image:url(/static/images/mobile/copyright/wikipedia.png)!important;background-size:100px;filter:invert(.9)}', `//upload.${h}/wikimirror/zh/darkmode/zhwiki`];
		if (id === 'anyi-css-darkmode-logo-wiki-monobook') return `${c}@media only screen and (min-width:551px){body.skin--responsive #column-one{padding-top: 110px}body.skin--responsive #p-logo a,body.skin--responsive #p-logo a:hover{background-position:50% 15%!important}}`;
		if (id === 'anyi-css-darkmode-logo-wiki-vector-legacy') return `${c}#p-logo{height:100px}#p-logo a{height:125px}`;
		if (id === 'anyi-css-darkmode-logo-zhwiki') return `.mw-wiki-logo{background-image:url(${u}.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans.png)}@media(-webkit-min-device-pixel-ratio:1.5),(min--moz-device-pixel-ratio:1.5),(min-resolution:1.5dppx),(min-resolution:144dpi){.mw-wiki-logo{background-image:url(${u}-1.5x.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans-1.5x.png)}}@media(-webkit-min-device-pixel-ratio:2),(min--moz-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.mw-wiki-logo{background-image:url(${u}-2x.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans-2x.png)}}`;
	}
	AnYi.scrollUpButton = () => !isZhwiki && AnYi.setJs(`//zh.wikipedia.${h}/wiki/MediaWiki:Gadget-scrollUpButton.js?action=raw&ctype=text/javascript`, 'async').then(() => console.log('AnYiMirror scrollUpButton.js load succeeded.')).catch(() => console.log('AnYiMirror scrollUpButton.js load failed.'));
	AnYi.wgUXS = (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) => {
		let _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ret$wg;
		const ret = {
			'zh': (_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_ref8 = zh !== null && zh !== void 0 ? zh : hans) !== null && _ref8 !== void 0 ? _ref8 : hant) !== null && _ref7 !== void 0 ? _ref7 : cn) !== null && _ref6 !== void 0 ? _ref6 : tw) !== null && _ref5 !== void 0 ? _ref5 : hk) !== null && _ref4 !== void 0 ? _ref4 : sg) !== null && _ref3 !== void 0 ? _ref3 : mo) !== null && _ref2 !== void 0 ? _ref2 : my) !== null && _ref !== void 0 ? _ref : '',
			'zh-hans': (_ref8 = (_ref9 = (_ref10 = hans !== null && hans !== void 0 ? hans : cn) !== null && _ref10 !== void 0 ? _ref10 : sg) !== null && _ref9 !== void 0 ? _ref9 : my) !== null && _ref8 !== void 0 ? _ref8 : '',
			'zh-hant': (_ref11 = (_ref12 = (_ref13 = hant !== null && hant !== void 0 ? hant : tw) !== null && _ref13 !== void 0 ? _ref13 : hk) !== null && _ref12 !== void 0 ? _ref12 : mo) !== null && _ref11 !== void 0 ? _ref11 : '',
			'zh-cn': (_ref14 = (_ref15 = (_ref16 = cn !== null && cn !== void 0 ? cn : hans) !== null && _ref16 !== void 0 ? _ref16 : sg) !== null && _ref15 !== void 0 ? _ref15 : my) !== null && _ref14 !== void 0 ? _ref14 : '',
			'zh-hk': (_ref17 = (_ref18 = (_ref19 = hk !== null && hk !== void 0 ? hk : hant) !== null && _ref19 !== void 0 ? _ref19 : mo) !== null && _ref18 !== void 0 ? _ref18 : tw) !== null && _ref17 !== void 0 ? _ref17 : '',
			'zh-mo': (_ref20 = (_ref21 = (_ref22 = mo !== null && mo !== void 0 ? mo : hant) !== null && _ref22 !== void 0 ? _ref22 : hk) !== null && _ref21 !== void 0 ? _ref21 : tw) !== null && _ref20 !== void 0 ? _ref20 : '',
			'zh-sg': (_ref23 = (_ref24 = (_ref25 = sg !== null && sg !== void 0 ? sg : hans) !== null && _ref25 !== void 0 ? _ref25 : cn) !== null && _ref24 !== void 0 ? _ref24 : my) !== null && _ref23 !== void 0 ? _ref23 : '',
			'zh-tw': (_ref26 = (_ref27 = (_ref28 = tw !== null && tw !== void 0 ? tw : hant) !== null && _ref28 !== void 0 ? _ref28 : hk) !== null && _ref27 !== void 0 ? _ref27 : mo) !== null && _ref26 !== void 0 ? _ref26 : '',
		};
		return (_ref29 = (_ref30 = (_ref31 = (_ref32 = (_ref33 = (_ref34 = (_ref35 = (_ref36 = (_ref37 = (_ret$wg = ret[wg]) !== null && _ret$wg !== void 0 ? _ret$wg : zh) !== null && _ref37 !== void 0 ? _ref37 : hans) !== null && _ref36 !== void 0 ? _ref36 : hant) !== null && _ref35 !== void 0 ? _ref35 : cn) !== null && _ref34 !== void 0 ? _ref34 : tw) !== null && _ref33 !== void 0 ? _ref33 : hk) !== null && _ref32 !== void 0 ? _ref32 : sg) !== null && _ref31 !== void 0 ? _ref31 : mo) !== null && _ref30 !== void 0 ? _ref30 : my) !== null && _ref29 !== void 0 ? _ref29 : '';
	}
	AnYi.wgULS = (hans, hant, cn, tw, hk, sg, zh, mo, my) => AnYi.wgUXS(AnYi.getConf('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
	AnYi.wgUVS = (hans, hant, cn, tw, hk, sg, zh, mo, my) => AnYi.wgUXS(AnYi.getConf('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
	AnYi.localStorage = (name, value, method = 'get', storage = w.localStorage) => {
		const check = (s => {
					try {
						s.setItem('_', '_');
						s.removeItem('_');
						return true;
					} catch(e) {
						return false;
					}
				})(storage);
		switch (method) {
		case 'check':
			if (check) return true;
			break;
		case 'get':
			if (check && name) return storage.getItem(name);
			break;
		case 'remove':
			if (check && name) storage.removeItem(name);
			break;
		case 'set':
			if (check && name && value) storage.setItem(name, value);
			break;
		}
	}
},
AnYiMirrorPrivateHolder = (time = 0) => {
	return new Promise((s, e) => {
		const AnYiMirrorPrivateHoldTimer = w.setInterval(async () => {
					time++;
					if (d.body && d.body.classList.contains('mediawiki') && typeof w.mw === 'object' && typeof mw.config.get === 'function' && typeof mw.hook === 'function' && typeof mw.loader.using === 'function' && typeof mw.message === 'function') {
						w.clearInterval(AnYiMirrorPrivateHoldTimer);
						s('AnYiMirror dependencies load succeeded.');
						console.log(await AnYiMirrorPrivateLoader());
					} else if (time > 3000) {
						w.clearInterval(AnYiMirrorPrivateHoldTimer);
						e('AnYiMirror dependencies load failed.');
						d.getElementsByTagName('noscript').length > 0 && AnYiMirrorPrivateMethod.setCss(d.getElementsByTagName('noscript')[0].innerHTML.replace(/<\/?style>/g, ''), 'css');
					}
				}, 10);
	});
},
AnYiMirrorPrivateLoader = () => {
	return new Promise(s => {
		AnYiMirrorPrivateMethod.darkMode('normal');
		AnYiMirrorPrivateMethod.disableAnonEdit();
		AnYiMirrorPrivateMethod.showRedirect('anyi-redirect');
		AnYiMirrorPrivateMethod.articleInfo('anyi-articleinfo');
		AnYiMirrorPrivateMethod.collapsibleSidebar();
		AnYiMirrorPrivateMethod.confirmLogout();
		AnYiMirrorPrivateMethod.scrollUpButton();
		d.addEventListener('copy', e => {
			let value = w.getSelection(0).toString();
			if (/example\.org/gi.test(value)) {
				e.preventDefault();
				value = AnYiMirrorPrivateMethod.getRealText(value);
				if (e.clipboardData) {
					e.clipboardData.setData('text/plain', value);
				} else if (w.clipboardData) {
					return w.clipboardData.setData('text/plain', value);
				}
			}
		});
		w.AnYiMirror.getRealText.initCount = 0;
		w.AnYiMirror.getRealText.isAceInit = false;
		mw.hook('codeEditor.configure').add(editor => {
			if (w.AnYiMirror.getRealText.isAceInit) return;
			w.AnYiMirror.getRealText.isAceInit = true;
			const button = d.getElementById('wpSave');
			button && button.addEventListener('click', () => editor.setValue(AnYiMirrorPrivateMethod.getRealText(editor.getValue())));
		});
		mw.hook('wikipage.content').add(item => {
			if (!item[0] || !(item[0] && ['mw-content-text', 'mw-watchlist-options'].includes(item[0].id))) return;
			w.AnYiMirror.getRealText.initCount > 0 && AnYiMirrorPrivateMethod.getRealText(void 0, 'wiki');
			w.AnYiMirror.getRealText.initCount++;
			AnYiMirrorPrivateMethod.diffLink('anyi-difflink', AnYiMirrorPrivateMethod.getConf('wgDiffNewId'), AnYiMirrorPrivateMethod.getConf('wgDiffOldId'), AnYiMirrorPrivateMethod.getConf('wgRevisionId'));
		});
		s('AnYiMirror load succeeded.');
	});
},
AnYiMirrorPrivateMain = () => {
	return new Promise(s => {
		AnYiMirrorPrivateMethod.darkMode('check') && (d.html.style.filter = 'invert(.9) hue-rotate(.5turn)');
		AnYiMirrorPrivateMethod.setCss('/wikimirror.css?date=20221108', 'url').then(() => console.log('AnYiMirror basic stylesheet load succeeded.')).catch(() => console.log('AnYiMirror basic stylesheet load failed.'));
		const dc = () => {
					const button = d.getElementById('wpSave'),
						fn = () => {
								event.preventDefault();
								AnYiMirrorPrivateMethod.getRealText(void 0, 'wiki');
								button.removeEventListener('click', fn);
								button.click();
							},
						mo = new MutationObserver(mutations => {
								for (const mutation of mutations) {
									for (const node of mutation.addedNodes) {
										if (!(node instanceof HTMLElement)) continue;
										for (const dom of node.querySelectorAll('.ext-related-articles-card-list h3 a')) {
											dom.innerHTML = AnYiMirrorPrivateMethod.getRealText(dom.innerHTML, 'emoji');
										}
									}
								}
							});
					AnYiMirrorPrivateMethod.getRealText(void 0, 'wiki');
					if (button) {
						button.addEventListener('click', fn);
						!AnYiMirrorPrivateMethod.getConf('wgUserName') && button.removeAttribute('accesskey');
					}
					mo.observe(d.body, {childList: true, subtree: true});
					const [cx, pv, st, wa, xt] = [d.querySelector('.cx-skin-menu-content-list'), d.querySelector('#histlegend a[href*="pageviews"]'), d.querySelector('#footer-places-statslink a') || d.querySelector('#statslink a'), d.querySelector('.wb-langlinks-edit.wb-langlinks-link>a'), d.querySelector('.mw-page-info+h2+ul a[href*="xtools"]')];
					cx && (cx.id = 'p-tb');
					pv && (pv.href = AnYiMirrorPrivateMethod.getRealText(pv.href));
					st && (st.href = AnYiMirrorPrivateMethod.getRealText(st.href));
					wa && (wa.target = '_blank');
					xt && (xt.href = AnYiMirrorPrivateMethod.getRealText(xt.href));
					w.addEventListener('beforeprint', () => {
						AnYiMirrorPrivateMethod.darkMode('meta', 'color-scheme', 'remove');
						for (const dom of d.querySelectorAll('a')) {
							dom.href = AnYiMirrorPrivateMethod.getRealText(dom.href);
						}
					});
					w.addEventListener('afterprint', () => w.location.reload());
					d.removeEventListener('DOMContentLoaded', dc);
				};
		d.readyState !== 'loading' ? dc() : d.addEventListener('DOMContentLoaded', dc);
		const AnYiMirrorPrivateMainTimer = w.setInterval(() => {
					if (d.body && d.body.classList.contains('mediawiki')) {
						w.clearInterval(AnYiMirrorPrivateMainTimer);
						AnYiMirrorPrivateMethod.darkMode('init');
						AnYiMirrorPrivateMethod.displayAnonHide('anyi-css-anon-hide');
						s('AnYiMirror basic methods load succeeded.');
					}
				}, 10);
	});
};
(async () => {
	/*! ajax-hook 2.1.3 https://github.com/wendux/ajax-hook @license MIT */
	!function(t,e){for(var n in e)t[n]=e[n]}(window,function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)n[r]=t[r];return n.target=n.currentTarget=e,n}function o(t,e){function n(e){return function(){var n=this.hasOwnProperty(e+"_")?this[e+"_"]:this.xhr[e],r=(t[e]||{}).getter;return r&&r(n,this)||n}}function o(e){return function(n){var o=this.xhr,i=this,s=t[e];if("on"===e.substring(0,2))i[e+"_"]=n,o[e]=function(s){s=r(s,i),t[e]&&t[e].call(i,o,s)||n.call(i,s)};else{var u=(s||{}).setter;n=u&&u(n,i)||n,this[e+"_"]=n;try{o[e]=n}catch(t){}}}}function i(e){return function(){var n=[].slice.call(arguments);if(t[e]){var r=t[e].call(this,n,this.xhr);if(r)return r}return this.xhr[e].apply(this.xhr,n)}}return e=e||window,e[u]=e[u]||e.XMLHttpRequest,e.XMLHttpRequest=function(){for(var t=new e[u],r=0;r<a.length;++r){var c="on"+a[r];void 0===t[c]&&(t[c]=null)}for(var f in t){var h="";try{h=s(t[f])}catch(t){}"function"===h?this[f]=i(f):Object.defineProperty(this,f,{get:n(f),set:o(f),enumerable:!0})}var d=this;t.getProxy=function(){return d},this.xhr=t},Object.assign(e.XMLHttpRequest,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4}),e[u]}function i(t){t=t||window,t[u]&&(t.XMLHttpRequest=t[u]),t[u]=void 0}Object.defineProperty(e,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.configEvent=r,e.hook=o,e.unHook=i;var u="__xhr",a=e.events=["load","loadend","timeout","error","readystatechange","abort"]},function(t,e,n){"use strict";function r(t,e){if(e=e||window,e.__xhr)throw"Ajax is already hooked.";return f(t,e)}function o(t){(0,h.unHook)(t)}function i(t){return t.replace(/^\s+|\s+$/g,"")}function s(t){return t.watcher||(t.watcher=document.createElement("a"))}function u(t,e){var n=t.getProxy(),r="on"+e+"_",o=(0,h.configEvent)({type:e},n);n[r]&&n[r](o);var i;"function"==typeof Event?i=new Event(e,{bubbles:!1}):(i=document.createEvent("Event"),i.initEvent(e,!1,!0)),s(t).dispatchEvent(i)}function a(t){this.xhr=t,this.xhrProxy=t.getProxy()}function c(t){function e(t){a.call(this,t)}return e[g]=Object.create(a[g]),e[g].next=t,e}function f(t,e){function n(t,e){var n=new w(t),r={response:e.response||e.responseText,status:e.status,statusText:e.statusText,config:t.config,headers:t.resHeader||t.getAllResponseHeaders().split("\r\n").reduce(function(t,e){if(""===e)return t;var n=e.split(":");return t[n.shift()]=i(n.join(":")),t},{})};if(!d)return n.resolve(r);d(r,n)}function r(t,e,n,r){var o=new E(t);n={config:t.config,error:n,type:r},v?v(n,o):o.next(n)}function o(){return!0}function a(t){return function(e,n){return r(e,this,n,t),!0}}function c(t,e){return 4===t.readyState&&0!==t.status?n(t,e):4!==t.readyState&&u(t,y),!0}var f=t.onRequest,d=t.onResponse,v=t.onError;return(0,h.hook)({onload:o,onloadend:o,onerror:a(p),ontimeout:a(l),onabort:a(x),onreadystatechange:function(t){return c(t,this)},open:function(t,e){var n=this,r=e.config={headers:{}};r.method=t[0],r.url=t[1],r.async=t[2],r.user=t[3],r.password=t[4],r.xhr=e;var o="on"+y;if(e[o]||(e[o]=function(){return c(e,n)}),f)return!0},send:function(t,e){var n=e.config;if(n.withCredentials=e.withCredentials,n.body=t[0],f){var r=function(){f(n,new b(e))};return!1===n.async?r():setTimeout(r),!0}},setRequestHeader:function(t,e){if(e.config.headers[t[0].toLowerCase()]=t[1],f)return!0},addEventListener:function(t,e){var n=this;if(-1!==h.events.indexOf(t[0])){var r=t[1];return s(e).addEventListener(t[0],function(e){var o=(0,h.configEvent)(e,n);o.type=t[0],o.isTrusted=!0,r.call(n,o)}),!0}},getAllResponseHeaders:function(t,e){var n=e.resHeader;if(n){var r="";for(var o in n)r+=o+": "+n[o]+"\r\n";return r}},getResponseHeader:function(t,e){var n=e.resHeader;if(n)return n[(t[0]||"").toLowerCase()]}},e)}Object.defineProperty(e,"__esModule",{value:!0}),e.proxy=r,e.unProxy=o;var h=n(0),d=h.events[0],v=h.events[1],l=h.events[2],p=h.events[3],y=h.events[4],x=h.events[5],g="prototype";a[g]=Object.create({resolve:function(t){var e=this.xhrProxy,n=this.xhr;e.readyState=4,n.resHeader=t.headers,e.response=e.responseText=t.response,e.statusText=t.statusText,e.status=t.status,u(n,y),u(n,d),u(n,v)},reject:function(t){this.xhrProxy.status=0,u(this.xhr,t.type),u(this.xhr,v)}});var b=c(function(t){var e=this.xhr;t=t||e.config,e.withCredentials=t.withCredentials,e.open(t.method,t.url,!1!==t.async,t.user,t.password);for(var n in t.headers)e.setRequestHeader(n,t.headers[n]);e.send(t.body)}),w=c(function(t){this.resolve(t)}),E=c(function(t){this.reject(t)})},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ah=void 0;var r=n(0),o=n(1);e.ah={proxy:o.proxy,unProxy:o.unProxy,hook:r.hook,unHook:r.unHook}}]));
	/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
	!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),l=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),o=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function b(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let g,p,m;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,l=0;for(n=1;n<=s;n++)i[n]=l=l+a[n-1]<<1;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,o,h,d=0;if(0!==t.last_lit)do{n=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],s=t.pending_buf[t.l_buf+d],d++,0===n?z(t,s,e):(o=c[s],z(t,o+a+1,e),h=r[o],0!==h&&(s-=u[o],x(t,s,h)),n--,o=v(n),z(t,o,i),h=l[o],0!==h&&(n-=w[o],x(t,n,h)))}while(d<t.last_lit);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let l,o,h,d=-1;for(t.heap_len=0,t.heap_max=573,l=0;l<r;l++)0!==a[2*l]?(t.heap[++t.heap_len]=d=l,t.depth[l]=0):a[2*l+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,l=t.heap_len>>1;l>=1;l--)S(t,a,l);h=r;do{l=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),o=t.heap[1],t.heap[--t.heap_max]=l,t.heap[--t.heap_max]=o,a[2*h]=a[2*l]+a[2*o],t.depth[h]=(t.depth[l]>=t.depth[o]?t.depth[l]:t.depth[o])+1,a[2*l+1]=a[2*o+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,l=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,b=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,b++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=o&&(u=l[_-o]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==b){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,b-=2}while(b>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++l<o&&n===r||(l<h?t.bl_tree[2*n]+=l:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):l<=10?t.bl_tree[34]++:t.bl_tree[36]++,l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],l=0,o=7,h=4;for(0===r&&(o=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++l<o&&n===r)){if(l<h)do{z(t,n,t.bl_tree)}while(0!=--l);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),l--),z(t,16,t.bl_tree),x(t,l-3,2)):l<=10?(z(t,17,t.bl_tree),x(t,l-3,3)):(z(t,18,t.bl_tree),x(t,l-11,7));l=0,s=n,0===r?(o=138,h=3):n===r?(o=6,h=3):(o=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),((t,e,a,i)=>{Z(t),i&&(y(t,a),y(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a})(t,e,a,!0)};var N={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<l[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<l[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);g=new b(d,r,257,i,s),p=new b(_,l,0,n,s),m=new b(new Array(0),o,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,g),t.d_desc=new k(t.dyn_dtree,p),t.bl_desc=new k(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:(t,e,i,n)=>{let s,r,l=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),l=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,l+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},_tr_tally:(t,e,i)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&i,t.last_lit++,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var B=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const C=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var M=(t,e,a,i)=>{const n=C,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},H={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:K,_tr_stored_block:P,_tr_flush_block:Y,_tr_tally:G,_tr_align:X}=N,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:q,Z_FULL_FLUSH:J,Z_FINISH:Q,Z_BLOCK:V,Z_OK:$,Z_STREAM_END:tt,Z_STREAM_ERROR:et,Z_DATA_ERROR:at,Z_BUF_ERROR:it,Z_DEFAULT_COMPRESSION:nt,Z_FILTERED:st,Z_HUFFMAN_ONLY:rt,Z_RLE:lt,Z_FIXED:ot,Z_DEFAULT_STRATEGY:ht,Z_UNKNOWN:dt,Z_DEFLATED:_t}=j,ft=258,ct=262,ut=103,wt=113,bt=666,gt=(t,e)=>(t.msg=H[e],e),pt=t=>(t<<1)-(t>4?9:0),mt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let kt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const vt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},yt=(t,e)=>{Y(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,vt(t.strm)},xt=(t,e)=>{t.pending_buf[t.pending++]=e},zt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},At=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=B(t.adler,e,n,a):2===t.state.wrap&&(t.adler=M(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Et=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,l=t.nice_match;const o=t.strstart>t.w_size-ct?t.strstart-(t.w_size-ct):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ft;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),l>t.lookahead&&(l=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ft-(f-s),s=f-ft,i>r){if(t.match_start=e,r=i,i>=l)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>o&&0!=--n);return r<=t.lookahead?r:t.lookahead},Rt=t=>{const e=t.w_size;let a,i,n,s,r;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ct)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,i=t.hash_size,a=i;do{n=t.head[--a],t.head[a]=n>=e?n-e:0}while(--i);i=e,a=i;do{n=t.prev[--a],t.prev[a]=n>=e?n-e:0}while(--i);s+=e}if(0===t.strm.avail_in)break;if(i=At(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=i,t.lookahead+t.insert>=3)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=kt(t,t.ins_h,t.window[r+1]);t.insert&&(t.ins_h=kt(t,t.ins_h,t.window[r+3-1]),t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ct&&0!==t.strm.avail_in)},Zt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a)),t.match_length>=3)if(i=G(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=kt(t,t.ins_h,t.window[t.strstart+1]);else i=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2},Ut=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ct&&(t.match_length=Et(t,a),t.match_length<=5&&(t.strategy===st||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=G(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=kt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(yt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=G(t,0,t.window[t.strstart-1]),i&&yt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=G(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2};function St(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const Dt=[new St(0,0,0,0,((t,e)=>{let a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Rt(t),0===t.lookahead&&e===W)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,yt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-ct&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(yt(t,!1),t.strm.avail_out),1)})),new St(4,4,8,4,Zt),new St(4,5,16,8,Zt),new St(4,6,32,32,Zt),new St(4,4,16,16,Ut),new St(8,16,32,32,Ut),new St(8,16,128,128,Ut),new St(8,32,128,256,Ut),new St(32,128,258,1024,Ut),new St(32,258,258,4096,Ut)];function Tt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_t,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),mt(this.dyn_ltree),mt(this.dyn_dtree),mt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),mt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),mt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Ot=t=>{if(!t||!t.state)return gt(t,et);t.total_in=t.total_out=0,t.data_type=dt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:wt,t.adler=2===e.wrap?0:1,e.last_flush=W,K(e),$},It=t=>{const e=Ot(t);var a;return e===$&&((a=t.state).window_size=2*a.w_size,mt(a.head),a.max_lazy_match=Dt[a.level].max_lazy,a.good_match=Dt[a.level].good_length,a.nice_match=Dt[a.level].nice_length,a.max_chain_length=Dt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ft=(t,e,a,i,n,s)=>{if(!t)return et;let r=1;if(e===nt&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==_t||i<8||i>15||e<0||e>9||s<0||s>ot)return gt(t,et);8===i&&(i=9);const l=new Tt;return t.state=l,l.strm=t,l.wrap=r,l.gzhead=null,l.w_bits=i,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=n+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+3-1)/3),l.window=new Uint8Array(2*l.w_size),l.head=new Uint16Array(l.hash_size),l.prev=new Uint16Array(l.w_size),l.lit_bufsize=1<<n+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new Uint8Array(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,It(t)};var Lt={deflateInit:(t,e)=>Ft(t,e,_t,15,8,ht),deflateInit2:Ft,deflateReset:It,deflateResetKeep:Ot,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?et:(t.state.gzhead=e,$):et,deflate:(t,e)=>{let a,i;if(!t||!t.state||e>V||e<0)return t?gt(t,et):et;const n=t.state;if(!t.output||!t.input&&0!==t.avail_in||n.status===bt&&e!==Q)return gt(t,0===t.avail_out?it:et);n.strm=t;const s=n.last_flush;if(n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,xt(n,31),xt(n,139),xt(n,8),n.gzhead?(xt(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),xt(n,255&n.gzhead.time),xt(n,n.gzhead.time>>8&255),xt(n,n.gzhead.time>>16&255),xt(n,n.gzhead.time>>24&255),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(xt(n,255&n.gzhead.extra.length),xt(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=M(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,0),xt(n,9===n.level?2:n.strategy>=rt||n.level<2?4:0),xt(n,3),n.status=wt);else{let e=_t+(n.w_bits-8<<4)<<8,a=-1;a=n.strategy>=rt||n.level<2?0:n.level<6?1:6===n.level?2:3,e|=a<<6,0!==n.strstart&&(e|=32),e+=31-e%31,n.status=wt,zt(n,e),0!==n.strstart&&(zt(n,t.adler>>>16),zt(n,65535&t.adler)),t.adler=1}if(69===n.status)if(n.gzhead.extra){for(a=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending!==n.pending_buf_size));)xt(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,xt(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){a=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),vt(t),a=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,xt(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>a&&(t.adler=M(t.adler,n.pending_buf,n.pending-a,a)),0===i&&(n.status=ut)}else n.status=ut;if(n.status===ut&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&vt(t),n.pending+2<=n.pending_buf_size&&(xt(n,255&t.adler),xt(n,t.adler>>8&255),t.adler=0,n.status=wt)):n.status=wt),0!==n.pending){if(vt(t),0===t.avail_out)return n.last_flush=-1,$}else if(0===t.avail_in&&pt(e)<=pt(s)&&e!==Q)return gt(t,it);if(n.status===bt&&0!==t.avail_in)return gt(t,it);if(0!==t.avail_in||0!==n.lookahead||e!==W&&n.status!==bt){let a=n.strategy===rt?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Rt(t),0===t.lookahead)){if(e===W)return 1;break}if(t.match_length=0,a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):n.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ft){if(Rt(t),t.lookahead<=ft&&e===W)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ft;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ft-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=G(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(yt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(yt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(yt(t,!1),0===t.strm.avail_out)?1:2})(n,e):Dt[n.level].func(n,e);if(3!==a&&4!==a||(n.status=bt),1===a||3===a)return 0===t.avail_out&&(n.last_flush=-1),$;if(2===a&&(e===q?X(n):e!==V&&(P(n,0,0,!1),e===J&&(mt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),vt(t),0===t.avail_out))return n.last_flush=-1,$}return e!==Q?$:n.wrap<=0?tt:(2===n.wrap?(xt(n,255&t.adler),xt(n,t.adler>>8&255),xt(n,t.adler>>16&255),xt(n,t.adler>>24&255),xt(n,255&t.total_in),xt(n,t.total_in>>8&255),xt(n,t.total_in>>16&255),xt(n,t.total_in>>24&255)):(zt(n,t.adler>>>16),zt(n,65535&t.adler)),vt(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?$:tt)},deflateEnd:t=>{if(!t||!t.state)return et;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==ut&&e!==wt&&e!==bt?gt(t,et):(t.state=null,e===wt?gt(t,at):$)},deflateSetDictionary:(t,e)=>{let a=e.length;if(!t||!t.state)return et;const i=t.state,n=i.wrap;if(2===n||1===n&&42!==i.status||i.lookahead)return et;if(1===n&&(t.adler=B(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(mt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Rt(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=kt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Rt(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=l,t.avail_in=s,i.wrap=n,$},deflateInfo:"pako deflate (from Nodeca project)"};const Nt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Bt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Nt(a,e)&&(t[e]=a[e])}}return t},Ct=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Mt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Mt=!1}const Ht=new Uint8Array(256);for(let t=0;t<256;t++)Ht[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Ht[254]=Ht[254]=1;var jt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,l=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(l),s=0,n=0;s<l;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Kt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Ht[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Mt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Pt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Ht[t[a]]>e?a:e};var Yt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Gt=Object.prototype.toString,{Z_NO_FLUSH:Xt,Z_SYNC_FLUSH:Wt,Z_FULL_FLUSH:qt,Z_FINISH:Jt,Z_OK:Qt,Z_STREAM_END:Vt,Z_DEFAULT_COMPRESSION:$t,Z_DEFAULT_STRATEGY:te,Z_DEFLATED:ee}=j;function ae(t){this.options=Bt({level:$t,method:ee,chunkSize:16384,windowBits:15,memLevel:8,strategy:te},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Lt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==Qt)throw new Error(H[a]);if(e.header&&Lt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?jt(e.dictionary):"[object ArrayBuffer]"===Gt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Lt.deflateSetDictionary(this.strm,t),a!==Qt)throw new Error(H[a]);this._dict_set=!0}}function ie(t,e){const a=new ae(e);if(a.push(t,!0),a.err)throw a.msg||H[a.err];return a.result}ae.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Jt:Xt,"string"==typeof t?a.input=jt(t):"[object ArrayBuffer]"===Gt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Wt||s===qt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Lt.deflate(a,s),n===Vt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Lt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===Qt;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},ae.prototype.onData=function(t){this.chunks.push(t)},ae.prototype.onEnd=function(t){t===Qt&&(this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var ne={Deflate:ae,deflate:ie,deflateRaw:function(t,e){return(e=e||{}).raw=!0,ie(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,ie(t,e)},constants:j};var se=function(t,e){let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),l=E.dmax,o=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,b=(1<<E.lenbits)-1,g=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=u[f&b];e:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,0===m)A[n++]=65535&p;else{if(!(16&m)){if(0==(64&m)){p=u[(65535&p)+(f&(1<<m)-1)];continue e}if(32&m){E.mode=12;break t}t.msg="invalid literal/length code",E.mode=30;break t}k=65535&p,m&=15,m&&(c<m&&(f+=z[a++]<<c,c+=8),k+=f&(1<<m)-1,f>>>=m,c-=m),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),p=w[f&g];a:for(;;){if(m=p>>>24,f>>>=m,c-=m,m=p>>>16&255,!(16&m)){if(0==(64&m)){p=w[(65535&p)+(f&(1<<m)-1)];continue a}t.msg="invalid distance code",E.mode=30;break t}if(v=65535&p,m&=15,c<m&&(f+=z[a++]<<c,c+=8,c<m&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<m)-1,v>l){t.msg="invalid distance too far back",E.mode=30;break t}if(f>>>=m,c-=m,m=n-s,v>m){if(m=v-m,m>h&&E.sane){t.msg="invalid distance too far back",E.mode=30;break t}if(y=0,x=_,0===d){if(y+=o-m,m<k){k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}}else if(d<m){if(y+=o+d-m,m-=d,m<k){k-=m;do{A[n++]=_[y++]}while(--m);if(y=0,d<k){m=d,k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}}}else if(y+=d-m,m<k){k-=m;do{A[n++]=_[y++]}while(--m);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const re=15,le=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),oe=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),he=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),de=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var _e=(t,e,a,i,n,s,r,l)=>{const o=l.bits;let h,d,_,f,c,u,w=0,b=0,g=0,p=0,m=0,k=0,v=0,y=0,x=0,z=0,A=null,E=0;const R=new Uint16Array(16),Z=new Uint16Array(16);let U,S,D,T=null,O=0;for(w=0;w<=re;w++)R[w]=0;for(b=0;b<i;b++)R[e[a+b]]++;for(m=o,p=re;p>=1&&0===R[p];p--);if(m>p&&(m=p),0===p)return n[s++]=20971520,n[s++]=20971520,l.bits=1,0;for(g=1;g<p&&0===R[g];g++);for(m<g&&(m=g),y=1,w=1;w<=re;w++)if(y<<=1,y-=R[w],y<0)return-1;if(y>0&&(0===t||1!==p))return-1;for(Z[1]=0,w=1;w<re;w++)Z[w+1]=Z[w]+R[w];for(b=0;b<i;b++)0!==e[a+b]&&(r[Z[e[a+b]]++]=b);if(0===t?(A=T=r,u=19):1===t?(A=le,E-=257,T=oe,O-=257,u=256):(A=he,T=de,u=-1),z=0,b=0,w=g,c=s,k=m,v=0,_=-1,x=1<<m,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){U=w-v,r[b]<u?(S=0,D=r[b]):r[b]>u?(S=T[O+r[b]],D=A[E+r[b]]):(S=96,D=0),h=1<<w-v,d=1<<k,g=d;do{d-=h,n[c+(z>>v)+d]=U<<24|S<<16|D|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,b++,0==--R[w]){if(w===p)break;w=e[a+r[b]]}if(w>m&&(z&f)!==_){for(0===v&&(v=m),c+=g,k=w-v,y=1<<k;k+v<p&&(y-=R[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=m<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),l.bits=m,0};const{Z_FINISH:fe,Z_BLOCK:ce,Z_TREES:ue,Z_OK:we,Z_STREAM_END:be,Z_NEED_DICT:ge,Z_STREAM_ERROR:pe,Z_DATA_ERROR:me,Z_MEM_ERROR:ke,Z_BUF_ERROR:ve,Z_DEFLATED:ye}=j,xe=12,ze=30,Ae=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Ee(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Re=t=>{if(!t||!t.state)return pe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=1,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,we},Ze=t=>{if(!t||!t.state)return pe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Re(t)},Ue=(t,e)=>{let a;if(!t||!t.state)return pe;const i=t.state;return e<0?(a=0,e=-e):(a=1+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?pe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,Ze(t))},Se=(t,e)=>{if(!t)return pe;const a=new Ee;t.state=a,a.window=null;const i=Ue(t,e);return i!==we&&(t.state=null),i};let De,Te,Oe=!0;const Ie=t=>{if(Oe){De=new Int32Array(512),Te=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(_e(1,t.lens,0,288,De,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;_e(2,t.lens,0,32,Te,0,t.work,{bits:5}),Oe=!1}t.lencode=De,t.lenbits=9,t.distcode=Te,t.distbits=5},Fe=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Le={inflateReset:Ze,inflateReset2:Ue,inflateResetKeep:Re,inflateInit:t=>Se(t,15),inflateInit2:Se,inflate:(t,e)=>{let a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return pe;a=t.state,a.mode===xe&&(a.mode=13),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,_=l,f=o,x=we;t:for(;;)switch(a.mode){case 1:if(0===a.wrap){a.mode=13;break}for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0),h=0,d=0,a.mode=2;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=ze;break}if((15&h)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits)a.wbits=y;else if(y>a.wbits){t.msg="invalid window size",a.mode=ze;break}a.dmax=1<<a.wbits,t.adler=a.check=1,a.mode=512&h?10:xe,h=0,d=0;break;case 2:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==ye){t.msg="unknown compression method",a.mode=ze;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=ze;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=3;case 3:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=M(a.check,A,4,0)),h=0,d=0,a.mode=4;case 4:for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0,a.mode=5;case 5:if(1024&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&(A[0]=255&h,A[1]=h>>>8&255,a.check=M(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=6;case 6:if(1024&a.flags&&(c=a.length,c>l&&(c=l),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=7;case 7:if(2048&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=8;case 8:if(4096&a.flags){if(0===l)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<l);if(512&a.flags&&(a.check=M(a.check,i,c,s)),l-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=9;case 9:if(512&a.flags){for(;d<16;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=ze;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=xe;break;case 10:for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ae(h),h=0,d=0,a.mode=11;case 11:if(0===a.havedict)return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,ge;t.adler=a.check=1,a.mode=xe;case xe:if(e===ce||e===ue)break t;case 13:if(a.last){h>>>=7&d,d-=7&d,a.mode=27;break}for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=14;break;case 1:if(Ie(a),a.mode=20,e===ue){h>>>=2,d-=2;break t}break;case 2:a.mode=17;break;case 3:t.msg="invalid block type",a.mode=ze}h>>>=2,d-=2;break;case 14:for(h>>>=7&d,d-=7&d;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=ze;break}if(a.length=65535&h,h=0,d=0,a.mode=15,e===ue)break t;case 15:a.mode=16;case 16:if(c=a.length,c){if(c>l&&(c=l),c>o&&(c=o),0===c)break t;n.set(i.subarray(s,s+c),r),l-=c,s+=c,o-=c,r+=c,a.length-=c;break}a.mode=xe;break;case 17:for(;d<14;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=ze;break}a.have=0,a.mode=18;case 18:for(;a.have<a.ncode;){for(;d<3;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=_e(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=ze;break}a.have=0,a.mode=19;case 19:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(p<16)h>>>=b,d-=b,a.lens[a.have++]=p;else{if(16===p){for(R=b+2;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h>>>=b,d-=b,0===a.have){t.msg="invalid bit length repeat",a.mode=ze;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===p){for(R=b+3;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=b,d-=b,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=b+7;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=b,d-=b,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=ze;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===ze)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=ze;break}if(a.lenbits=9,E={bits:a.lenbits},x=_e(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=ze;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=_e(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=ze;break}if(a.mode=20,e===ue)break t;case 20:a.mode=21;case 21:if(l>=6&&o>=258){t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,se(t,f),r=t.next_out,n=t.output,o=t.avail_out,s=t.next_in,i=t.input,l=t.avail_in,h=a.hold,d=a.bits,a.mode===xe&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(g&&0==(240&g)){for(m=b,k=g,v=p;z=a.lencode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,a.back+=m}if(h>>>=b,d-=b,a.back+=b,a.length=p,0===g){a.mode=26;break}if(32&g){a.back=-1,a.mode=xe;break}if(64&g){t.msg="invalid literal/length code",a.mode=ze;break}a.extra=15&g,a.mode=22;case 22:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=23;case 23:for(;z=a.distcode[h&(1<<a.distbits)-1],b=z>>>24,g=z>>>16&255,p=65535&z,!(b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(0==(240&g)){for(m=b,k=g,v=p;z=a.distcode[v+((h&(1<<m+k)-1)>>m)],b=z>>>24,g=z>>>16&255,p=65535&z,!(m+b<=d);){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,a.back+=m}if(h>>>=b,d-=b,a.back+=b,64&g){t.msg="invalid distance code",a.mode=ze;break}a.offset=p,a.extra=15&g,a.mode=24;case 24:if(a.extra){for(R=a.extra;d<R;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=ze;break}a.mode=25;case 25:if(0===o)break t;if(c=f-o,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=ze;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>o&&(c=o),o-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=21);break;case 26:if(0===o)break t;n[r++]=a.length,o--,a.mode=21;break;case 27:if(a.wrap){for(;d<32;){if(0===l)break t;l--,h|=i[s++]<<d,d+=8}if(f-=o,t.total_out+=f,a.total+=f,f&&(t.adler=a.check=a.flags?M(a.check,n,f,r-f):B(a.check,n,f,r-f)),f=o,(a.flags?h:Ae(h))!==a.check){t.msg="incorrect data check",a.mode=ze;break}h=0,d=0}a.mode=28;case 28:if(a.wrap&&a.flags){for(;d<32;){if(0===l)break t;l--,h+=i[s++]<<d,d+=8}if(h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=ze;break}h=0,d=0}a.mode=29;case 29:x=be;break t;case ze:x=me;break t;case 31:return ke;case 32:default:return pe}return t.next_out=r,t.avail_out=o,t.next_in=s,t.avail_in=l,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<ze&&(a.mode<27||e!==fe))&&Fe(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,a.wrap&&f&&(t.adler=a.check=a.flags?M(a.check,n,f,t.next_out-f):B(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===xe?128:0)+(20===a.mode||15===a.mode?256:0),(0===_&&0===f||e===fe)&&x===we&&(x=ve),x},inflateEnd:t=>{if(!t||!t.state)return pe;let e=t.state;return e.window&&(e.window=null),t.state=null,we},inflateGetHeader:(t,e)=>{if(!t||!t.state)return pe;const a=t.state;return 0==(2&a.wrap)?pe:(a.head=e,e.done=!1,we)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return t&&t.state?(i=t.state,0!==i.wrap&&11!==i.mode?pe:11===i.mode&&(n=1,n=B(n,e,a,0),n!==i.check)?me:(s=Fe(t,e,a,a),s?(i.mode=31,ke):(i.havedict=1,we))):pe},inflateInfo:"pako inflate (from Nodeca project)"};var Ne=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Be=Object.prototype.toString,{Z_NO_FLUSH:Ce,Z_FINISH:Me,Z_OK:He,Z_STREAM_END:je,Z_NEED_DICT:Ke,Z_STREAM_ERROR:Pe,Z_DATA_ERROR:Ye,Z_MEM_ERROR:Ge}=j;function Xe(t){this.options=Bt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Yt,this.strm.avail_out=0;let a=Le.inflateInit2(this.strm,e.windowBits);if(a!==He)throw new Error(H[a]);if(this.header=new Ne,Le.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=jt(e.dictionary):"[object ArrayBuffer]"===Be.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=Le.inflateSetDictionary(this.strm,e.dictionary),a!==He)))throw new Error(H[a])}function We(t,e){const a=new Xe(e);if(a.push(t),a.err)throw a.msg||H[a.err];return a.result}Xe.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,l;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Me:Ce,"[object ArrayBuffer]"===Be.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=Le.inflate(a,r),s===Ke&&n&&(s=Le.inflateSetDictionary(a,n),s===He?s=Le.inflate(a,r):s===Ye&&(s=Ke));a.avail_in>0&&s===je&&a.state.wrap>0&&0!==t[a.next_in];)Le.inflateReset(a),s=Le.inflate(a,r);switch(s){case Pe:case Ye:case Ke:case Ge:return this.onEnd(s),this.ended=!0,!1}if(l=a.avail_out,a.next_out&&(0===a.avail_out||s===je))if("string"===this.options.to){let t=Pt(a.output,a.next_out),e=a.next_out-t,n=Kt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==He||0!==l){if(s===je)return s=Le.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},Xe.prototype.onData=function(t){this.chunks.push(t)},Xe.prototype.onEnd=function(t){t===He&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Ct(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var qe={Inflate:Xe,inflate:We,inflateRaw:function(t,e){return(e=e||{}).raw=!0,We(t,e)},ungzip:We,constants:j};const{Deflate:Je,deflate:Qe,deflateRaw:Ve,gzip:$e}=ne,{Inflate:ta,inflate:ea,inflateRaw:aa,ungzip:ia}=qe;var na=Je,sa=Qe,ra=Ve,la=$e,oa=ta,ha=ea,da=aa,_a=ia,fa=j,ca={Deflate:na,deflate:sa,deflateRaw:ra,gzip:la,Inflate:oa,inflate:ha,inflateRaw:da,ungzip:_a,constants:fa};t.Deflate=na,t.Inflate=oa,t.constants=fa,t.default=ca,t.deflate=sa,t.deflateRaw=ra,t.gzip=la,t.inflate=ha,t.inflateRaw=da,t.ungzip=_a,Object.defineProperty(t,"__esModule",{value:!0})}));
	const base64ToUint8Array = value => {
				const base64Data = (value + '='.repeat((4 - value.length % 4) % 4)).replace(/\-/g, '+').replace(/_/g, '/'),
					rawData = w.atob(base64Data);
				let outputArray = new Uint8Array(rawData.length);
				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i);
				}
				return outputArray;
			},
		uint8arrayToBase64 = value => {
				const chunk = 0x8000;
				let [index, result, slice] = [0, '', void 0];
				while (index < value.length) {
					slice = value.subarray(index, Math.min(index + chunk, value.length));
					result += String.fromCharCode.apply(null, slice);
					index += chunk;
				}
				return w.btoa(result);
			};
	console.log(await AnYiMirrorPrivateMain());
	function AnYiMirrorPublicMethod() {console.log(this)}
	AnYiMirrorPublicMethod.prototype.getRealText = AnYiMirrorPrivateMethod.getRealText;
	AnYiMirrorPublicMethod.prototype.deflate = value => {
		return 'rawdeflate,' + uint8arrayToBase64(w.pako.deflateRaw(value, {
			to: 'string',
			level: 5
		}));
	};
	AnYiMirrorPublicMethod.prototype.inflate = value => {
		value = value.replace('rawdeflate,', '');
		return w.pako.inflateRaw(base64ToUint8Array(value), {
			to: 'string',
			level: 5
		});
	};
	AnYiMirrorPublicMethod.prototype.ahCallback_Request = config => {
		try {
			const [textArr, urlObj] = [['appendtext', 'claim', 'content', 'ehcontent', 'epcontent', 'etcontent', 'etssummary', 'html', 'ntcontent', 'nttopic', 'prependtext', 'repcontent', 'summary', 'text', 'url', 'wikitext'], new mw.Uri(`/w/api.php?${config.body}`)];
			delete urlObj.query.md5;
			for (const item in urlObj.query) {
				if (!textArr.includes(item)) continue;
				urlObj.query[item] = AnYiMirror.getRealText(urlObj.query[item]);
			}
			try {
				const bodyObj = JSON.parse(config.body);
				delete bodyObj.md5;
				for (const item in bodyObj) {
					if (!textArr.includes(item)) continue;
					bodyObj[item] = AnYiMirror.getRealText(bodyObj[item]);
				}
				config.body = JSON.stringify(bodyObj);
			} catch(e) {}
			if (/\?(?:%5Bobject\+FormData%5D|null)/.test(urlObj.toString())) {
				config.body.delete('md5');
				switch (config.body.get('action')) {
				case 'discussiontoolsedit':
					const tags = config.body.get('dttags').split(',');
					tags.includes('discussiontools-source') && config.body.set('wikitext', AnYiMirror.getRealText(config.body.get('wikitext')));
					tags.includes('discussiontools-visual') && config.body.set('html', AnYiMirror.getRealText(config.body.get('html')));
					break;
				case 'visualeditoredit':
					if (config.body.get('html')) {
						const inflateRaw = AnYiMirror.inflate(config.body.get('html'));
						config.body.set('html', AnYiMirror.deflate(AnYiMirror.getRealText(inflateRaw)));
					} else if (config.body.get('wikitext')) {
						config.body.set('wikitext', AnYiMirror.getRealText(config.body.get('wikitext')));
					}
					break;
				default:
					for (const text of textArr) {
						config.body.get(text) && config.body.set(text, AnYiMirror.getRealText(config.body.get(text)));
					}
					break;
				}
			} else {
				for (const text of textArr) {
					urlObj.query && urlObj.query[text] && (urlObj.query[text] = AnYiMirror.getRealText(urlObj.query[text]));
				}
				config.body = urlObj.toString().replace(`${location.origin}/w/api.php?`, '');
			}
		} catch (e) {}
		return config;
	};
	AnYiMirrorPublicMethod.prototype.ahCallback_Response = response => {
		const veParse = htmlStr => {
					const docFrag = w.ve.parseXhtml(htmlStr);
					for (const dom of docFrag.children[0].querySelectorAll('audio,img,source,video')) {
						for (const attr of ['poster', 'src', 'srcset']) {
							dom[attr] && (dom[attr] = dom[attr].replace(/example\.org/g, 'r-e-p-l-a-c-e.org'));
						}
					}
					return docFrag.children[0];
				};
		try {
			const responseObj = JSON.parse(response.response);
			if (responseObj.discussiontoolspreview && responseObj.discussiontoolspreview.parse && responseObj.discussiontoolspreview.parse.text) {
				const htmlDom = veParse(responseObj.discussiontoolspreview.parse.text);
				responseObj.discussiontoolspreview.parse.text = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
			}
			if (responseObj.visualeditor || responseObj.visualeditoredit) {
				const mode = responseObj.visualeditor ? 'visualeditor' : 'visualeditoredit';
				if (responseObj[mode].content) {
					if (responseObj[mode].etag) {
						const htmlDom = veParse(responseObj[mode].content);
						responseObj[mode].content = `<!DOCTYPE html>\n${AnYiMirror.getRealText(htmlDom.outerHTML)}`;
					} else if (/^<\S+?\sid=\S+?>/.test(responseObj[mode].content)) {
						const htmlDom = veParse(responseObj[mode].content);
						responseObj[mode].content = AnYiMirror.getRealText(htmlDom.querySelector('body').innerHTML);
					} else {
						responseObj[mode].content = AnYiMirror.getRealText(responseObj[mode].content);
					}
				}
			}
			if (responseObj.expandtemplates) {
				responseObj.expandtemplates['*'] = AnYiMirror.getRealText(responseObj.expandtemplates['*']);
			}
			if (responseObj.html) {
				const htmlDom = veParse(responseObj.html);
				responseObj.html = AnYiMirror.getRealText(htmlDom.querySelector('div').outerHTML);
			}
			if (responseObj.parse && (responseObj.parse.parsedsummary || responseObj.parse.text || responseObj.parse.wikitext)) {
				if (typeof responseObj.parse.parsedsummary === 'object' || typeof responseObj.parse.text === 'object' || typeof responseObj.parse.wikitext === 'object') {
					const text = responseObj.parse.parsedsummary ? 'parsedsummary' : responseObj.parse.text ? 'text' : 'wikitext';
					for (const item in responseObj.parse[text]) {
						if (['parsedsummary', 'text'].includes(text)) {
							const htmlDom = veParse(responseObj.parse[text][item]);
							responseObj.parse[text][item] = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
						} else {
							responseObj.parse.wikitext[item] = AnYiMirror.getRealText(responseObj.parse.wikitext[item]);
						}
					}
				} else {
					if (responseObj.parse.parsedsummary || responseObj.parse.text) {
						const htmlDom = veParse(responseObj.parse.text);
						responseObj.parse.text = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
					} else if (responseObj.parse.wikitext) {
						responseObj.parse.wikitext = AnYiMirror.getRealText(responseObj.parse.wikitext);
					}
				}
			}
			if (responseObj.query) {
				for (const id in responseObj.query.pages) {
					const page = responseObj.query.pages[id];
					for (const item in page.revisions) {
						const revision = page.revisions[item];
						for (const index in revision) {
							if (typeof revision[index] === 'object') {
								for (const i in revision[index].slots) {
									for (const j in revision[index].slots[i]) {
										if (j !== 'content') continue;
										const slot = revision[index].slots[i];
										responseObj.query.pages[id].revisions[item][index].slots[i][j] = AnYiMirror.getRealText(slot[j]);
									}
								}
							} else if (index === 'content') {
								responseObj.query.pages[id].revisions[item][index] = AnYiMirror.getRealText(revision[index]);
							}
						}
					}
				}
			}
			responseObj[0] && responseObj[0].url && (responseObj[0].url = AnYiMirror.getRealText(responseObj[0].url));
			response.response = JSON.stringify(responseObj);
		} catch (e) {
			const url = response.config.url;
			if (response.response.includes('<?xml version="1.0"?>')) {
				const xmlDom = response.config.xhr.responseXML;
				for (const dom of xmlDom.querySelectorAll('rev')) {
					dom.innerHTML = AnYiMirror.getRealText(dom.innerHTML);
				}
				response.response = `<?xml version="1.0"?>${xmlDom.querySelector('*').outerHTML}`;
			} else if (url.includes('/w/index.php') && !url.includes('ctype=')) {
				if (url.includes('action=render')) {
					const htmlDom = veParse(response.response);
					response.response = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
				} else if (typeof response.response === 'string') {
					response.response = AnYiMirror.getRealText(response.response);
				}
			} else if ((url.includes('/api/rest_v1/page/html/') || url.includes('/api/rest_v1/transform/wikitext/to/html/')) && response.response.includes('<!DOCTYPE html>')) {
				const htmlDom = veParse(response.response);
				response.response = `<!DOCTYPE html>\n${AnYiMirror.getRealText(htmlDom.outerHTML)}`;
			}
		}
		return response;
	};
	w.AnYiMirror = new AnYiMirrorPublicMethod();
	Object.seal(w.AnYiMirror);
	console.log(await AnYiMirrorPrivateHolder());
	await mw.loader.using(['mediawiki.Uri', 'ext.visualEditor.ve', 'ext.visualEditor.core.utils.parsing']);
	w.ah.proxy({
		onRequest: (config, handler) => {
			config = AnYiMirror.ahCallback_Request(config);
			handler.next(config);
		},
		onResponse: (response, handler) => {
			response = AnYiMirror.ahCallback_Response(response);
			handler.next(response);
		}
	});
	const {fetch: origFetch} = w;
	w.fetch = async (url, options) => {
		const urlObj = new URL(url);
		urlObj.search && (urlObj.search = AnYiMirror.ahCallback_Request({body: urlObj.search}).body.replace('%3F', ''));
		options && options.body && (options.body = AnYiMirror.ahCallback_Request(options).body);
		const response = await origFetch(urlObj.href, options);
		if (!/html|json|plain|text|xml/i.test(response.headers.get('content-type'))) return response;
		let responseOptions = {};
		for (const item of ['headers', 'status', 'statusText']) {
			responseOptions[item] = response[item];
		}
		return new Response((AnYiMirror.ahCallback_Response({config: {url, options}, response: await response.text()})).response, responseOptions);
	}
})();
} else {document.documentElement.style.display = 'none'}