/*!
 * @author 安忆 i@anyi.in
 * @file wikimirror.js
 *
 * Copyright (c) 2019-present, 安忆.
 *
 * This source code is licensed under the GPL v3 license.
 */
'use strict';
if ((() => {try {return eval('({})?.a??1')} catch (e) {}})()) {
const BaseMirrorDomain = 'example.org', [BaseMirrorDomainRegex, BaseMirrorDomainSplit] = [BaseMirrorDomain.replace('.', '\\.'), BaseMirrorDomain.split('.')],
AnYiMirrorPrivateMethod = new function AnYiMirrorPrivateMethod() {
	const AnYi = this;
	AnYi.getConf = key => {
		if (typeof mw === 'object' && typeof mw.config?.get === 'function') return mw.config.get(key);
		if (typeof RLCONF === 'object' && RLCONF[key] !== void 0) return RLCONF[key];
		return null;
	};
	AnYi.getCookie = name => `; ${AnYi.decodeURIComponent(document.cookie)}`.split(`; ${name}=`).pop().split(';').shift();
	AnYi.getLocate = method => {
		const [originHash, originHost, originUrl] = [AnYi.getRealText(location.hash), AnYi.getRealText(location.host), AnYi.getRealText(location.href)];
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
	};
	AnYi.getRealText = (value, method) => {
		const [reg1, reg2, reg3] = [new RegExp(BaseMirrorDomainRegex, 'gi'), new RegExp(`(wiki(?:books|data|news|pedia|quote|source|versity|voyage)|wiktionary|mediawiki|planet)\\.${BaseMirrorDomainRegex}`, 'gi'), new RegExp(`latex-(png|svg)\\.${BaseMirrorDomainRegex}`, 'gi')],
		[reg4, reg5] = [new RegExp(`\\\\\\.wikipedia\\\\\\.\\(\\?:${BaseMirrorDomainSplit[0]}\\\\\\.\\)\\?${BaseMirrorDomainSplit[1]}`, 'g'), /background(-image)?:url\(('|")?(https?:)?\/\/upload\.wikimedia\.org/gi],
		emojiRegex = /* https://github.com/mathiasbynens/emoji-regex */ /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,
		[wBox, wDom, u] = [document.getElementById('wpTextbox1'), document.querySelectorAll(`${method==='wikiless'?'body,body *':AnYi.hasClass('diff', 'table')?'.mw-parser-output,.mw-parser-output *':'.mw-body,.mw-body *'}`), `//upload.${BaseMirrorDomain}`],
		wTex = (nodeArr = []) => {
			if (!wDom || (AnYi.hasClass('mw-special-AbuseFilter') || AnYi.hasClass('mw-special-EditWatchlist') || AnYi.hasClass('mw-special-Search')) && (typeof AnYiMirror === 'object' && (typeof AnYiMirror.getRealText === 'function' && (typeof AnYiMirror.getRealText.initCount === 'number' && AnYiMirror.getRealText.initCount < 1 || typeof AnYiMirror.getRealText.initCount === 'undefined') || typeof AnYiMirror.getRealText === 'undefined') || typeof AnYiMirror === 'undefined') && !AnYi.hasClass('action-history')) return;
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
				if (text.match(emojiRegex) && !(AnYi.hasClass('action-edit') || AnYi.hasClass('action-submit')) && (typeof AnYiMirror === 'object' && (typeof AnYiMirror.getRealText === 'function' && (typeof AnYiMirror.getRealText.initCount === 'number' && AnYiMirror.getRealText.initCount < 1 || typeof AnYiMirror.getRealText.initCount === 'undefined') || typeof AnYiMirror.getRealText === 'undefined') || typeof AnYiMirror === 'undefined')) {
					const el = document.createElement('anyi-emoji-line');
					el.innerHTML = node.nodeValue.replace(emojiRegex, '<anyi-emoji class="mw-no-invert">$&</anyi-emoji>');
					node.parentNode.insertBefore(el, node.nextSibling);
					node.remove();
				}
			}
			for (const dom of [...document.querySelectorAll('a[href*="//archive."]'), ...document.querySelectorAll('a[href*="//pageviews."]'), ...document.querySelectorAll('a[href*="//xtools."]')]) {
				const href = dom.href;
				reg1.test(href) && (dom.href = AnYi.getRealText(href));
				const XtoolsApi = 'xtools.wmflabs.org/api/';
				href.includes(XtoolsApi) && (dom.href = href.replace(XtoolsApi, `xtools-api.${BaseMirrorDomain}/`));
			}
			for (const dom of document.querySelectorAll('input[name="clientUrl"],input[name="intendedWikitext"]')) {
				const text = dom.value;
				reg1.test(text) && (dom.value = AnYi.getRealText(text));
			}
			const dom = document.querySelector('#ca-fileExporter a'),
			url = dom?.href.match(/clientUrl=(\S+?)&/)?.[1] || '';
			dom && (dom.href = dom.href.replace(url, AnYi.getRealText(url)));
		};
		if (method === 'emoji') return value.match(emojiRegex) ? value.replace(emojiRegex, '<anyi-emoji class="mw-no-invert">$&</anyi-emoji>') : value;
		if (['wiki', 'wikiless'].includes(method)) {
			wTex();
			if (wBox && method === 'wiki') {
				typeof wikEd === 'object' && wikEd.useWikEd && wikEd.UpdateTextarea();
				typeof jQuery === 'function' ? value = jQuery('#wpTextbox1').val() : value = wBox.value;
			}
		}
		if (value !== null && value !== void 0) Object.prototype.toString.call(value) === '[object String]' ? value = value.replace(new RegExp(`phab\\.${BaseMirrorDomainRegex}`, 'gi'), 'phab.wmfusercontent.org').replace(new RegExp(`xtools-api\\.${BaseMirrorDomain}\\/`, 'gi'), 'xtools.wmflabs.org/api/').replace(new RegExp(`wma\\.${BaseMirrorDomainRegex}`, 'gi'), 'wma.wmcloud.org').replace(new RegExp(`recommend\\.${BaseMirrorDomainRegex}`, 'gi'), 'recommend.wmflabs.org').replace(reg3, 'wikimedia.org/api/rest_v1/media/math/render/$1').replace(reg2, '$1.org').replace(reg1, 'wikimedia.org').replace(reg4, '\\.wikipedia\\.org').replace(/r-e-p-l-a-c-e\.org/g, BaseMirrorDomain) : (Object.prototype.toString.call(value) === '[object Boolean]' || Object.prototype.toString.call(value) === '[object BigInt]' || Object.prototype.toString.call(value) === '[object Number]') ? void 0 : value = Object.prototype.toString.call(value);
		if (value && value !== true && wBox && method === 'wiki') {
			typeof jQuery === 'function' ? jQuery('#wpTextbox1').val(value) : wBox.value = value;
			typeof wikEd === 'object' && wikEd.useWikEd && wikEd.UpdateFrame();
		}
		return value;
	};
	AnYi.decodeURIComponent = value => decodeURIComponent((v => {
		try {
			return decodeURIComponent(v);
		} catch (e) {
			return v.replace(/%(?!\d+)/g, '%25');
		}
	})(value).replace(/\+/g, '%20'));
	AnYi.encodeURIComponent = value => encodeURIComponent(value).replace(/%20/g, '+').replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%5B/g, '[').replace(/%5D/g, ']');
	AnYi.hasClass = (name, selector = 'body') => {
		if (!name || !document.querySelector(selector)) return;
		for (const dom of document.querySelectorAll(selector)) {
			if (dom.classList.contains(name)) return true;
		}
	};
	AnYi.setCookie = (name, value, time, domain = `.${BaseMirrorDomain}`, path = '/', isSecure = true) => {
		if (!name || !value || !time || !domain || !path) return;
		const [base, date] = [`${name}=${AnYi.encodeURIComponent(value)};domain=${domain};path=${path}${isSecure?';Secure':''}`, new Date()];
		if (time === 'tmp') {
			document.cookie = base;
		} else {
			date.setTime(date.getTime() + time * 3600000);
			document.cookie = `${base};expires=${date.toGMTString()}`;
		}
	};
	AnYi.setCss = (value, method = 'css', id) => {
		switch (method) {
		case 'add':
			value && !document.getElementById(value) && !!AnYi.extraCss(value) && AnYi.setCss(AnYi.extraCss(value), 'css', value);
			break;
		case 'remove':
			value && document.getElementById(value)?.remove();
			break;
		case 'css':
			if (!value || id && document.getElementById(id)) return;
			const style = document.createElement('style');
			id && (style.id = id);
			style.append(document.createTextNode(value));
			document.head.append(style);
			break;
		case 'url':
			return new Promise((resolve, reject) => {
				if (!value) reject();
				const link = document.createElement('link');
				id && (link.id = id);
				link.href = value;
				link.rel = 'stylesheet';
				link.onload = () => resolve();
				link.onerror = () => reject();
				document.head.append(link);
			});
		}
	};
	AnYi.setJs = (url, method) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			url ? script.src = url : reject();
			method === 'async' && (script.async = true);
			method === 'defer' && (script.defer = true);
			script.onload = () => resolve();
			script.onerror = () => reject();
			document.head.append(script);
		});
	};
	AnYi.notify = (msg, opt) => mw.loader.using('mediawiki.notification').then(() => mw.notification.notify(msg, opt));
	AnYi.showNotice = (value, {autoHide = false, tag} = {}) => {
		const [ComHead, ComFoot, O] = ['<div class="AnYiNotice">', '</div>', '<button>了解</button>'];
		value && autoHide ? AnYi.notify([`${ComHead}${value}${O}${ComFoot}`], {tag}) : AnYi.notify([`${ComHead}${value}${O}${ComFoot}`], {autoHide: false, tag});
	};
	AnYi.showRedirect = id => {
		if (document.getElementById(id)) return;
		const [Text, Title] = [`${AnYi.wgULS('访问', '造訪')}官方${AnYi.wgULS('页面', '頁')}`, `${AnYi.wgULS('将当', '將當')}前${AnYi.wgULS('镜', '鏡')}像${AnYi.wgULS('站', '')}${AnYi.wgULS('页面', '頁')}重${AnYi.wgULS('定', '新導')}向至官方相${AnYi.wgULS('应页面', '應頁')}`],
		[Redirect, RedirectMinerva] = [`<li id="${id}"><a href="${AnYi.getLocate('originUrl')}" target="_blank" title="${Title}">${Text}</a></li>`, `<li id="${id}"><a class="mw-ui-icon mw-ui-icon-before mw-ui-icon-minerva-logOut" href="${AnYi.getLocate('originUrl')}" target="_blank" title="${Title}"><span>${Text}</span></a></li>`];
		AnYi.hasClass('skin-apioutput') && document.querySelector('.apihelp-flags>ul') ? document.querySelector('.apihelp-flags>ul').insertAdjacentHTML('beforeEnd', Redirect)
		 : AnYi.hasClass('skin-cologneblue') && document.getElementById('titlelinks') ? document.getElementById('titlelinks').insertAdjacentHTML('beforeEnd', Redirect.replace('<li', '<span').replace('li>', 'span>'))
		 : AnYi.hasClass('skin-contenttranslation') && document.getElementById('p-tb') ? document.getElementById('p-tb').insertAdjacentHTML('beforeEnd', Redirect)
		 : AnYi.hasClass('skin-minerva') && document.getElementById('p-donation') ? document.getElementById('p-donation').insertAdjacentHTML('beforeEnd', RedirectMinerva)
		 : AnYi.hasClass('skin-modern') && document.getElementById('footer-info') ? document.getElementById('footer-info').insertAdjacentHTML('beforeEnd', Redirect)
		 : AnYi.hasClass('skin-monobook') && document.getElementById('f-list') ? document.getElementById('f-list').insertAdjacentHTML('beforeEnd', Redirect)
		 : AnYi.hasClass('skin-nostalgia') && document.getElementById('searchform') ? document.getElementById('searchform').insertAdjacentHTML('beforebegin', Redirect.replace('<li', '<span').replace('li>', 'span>'))
		 : (AnYi.hasClass('skin-timeless') || AnYi.hasClass('skin-vector')) && document.getElementById('footer-places') ? document.getElementById('footer-places').insertAdjacentHTML('beforeEnd', Redirect) : void 0;
	};
	AnYi.ajaxLogin = async(method, {username, password} = {}) => {
		if (new RegExp(`^\\S+?\\.m\\.${BaseMirrorDomainRegex}`).test(location.host)) return; // API BUG <https://phabricator.wikimedia.org/T328397>
		const [Account, Auto, Get, Error, Login, Name, Token, User, Password, Recaptcha] = [AnYi.wgULS('账号', '帳戶'), `自${AnYi.wgULS('动', '動')}`, `${AnYi.wgULS('获', '獲')}取`, AnYi.wgULS('错误', '錯誤'), `登${AnYi.wgULS('录', '入')}`, AnYi.wgULS('名', '名稱'), AnYi.wgULS('令牌', '權杖'), AnYi.wgULS(void 0, void 0, '用户', '使用者', '用戶'), AnYi.wgULS('密码', '密碼'), `2FA${AnYi.wgULS('验证码', '驗證碼')}`],
		CookiePrefix = location.host.includes('wikitech') ? 'lastLoginWikitech' : 'lastLogin';
		if (method === 'init') {
			const dom = document.getElementById('ca-cb-login') || document.querySelector('.menu__item--login') || document.querySelector('#topbar>a[href*="UserLogin"]') || document.getElementById('pt-login-2') || document.getElementById('pt-login') || document.querySelector('.vector-user-menu-login');
			dom?.addEventListener('click', e => {
				e.preventDefault();
				AnYi.ajaxLogin();
			});
			const [username, password] = [AnYi.getCookie(`${CookiePrefix}UserName`), AnYi.getCookie(`${CookiePrefix}Password`)];
			if (username && !['', 'deleted'].includes(password) && !AnYi.getConf('wgUserName')) {
				AnYi.showNotice(`<span>${AnYi.wgULS('开', '開')}始${Auto}${Login}</span>`, {
					autoHide: true,
					tag: 'login',
				});
				AnYi.ajaxLogin(void 0, {
					username,
					password: AnYiMirror.inflateRaw(password),
				});
			}
			return;
		}
		await mw.loader.using(['mediawiki.api', 'mediawiki.widgets', 'oojs-ui-core', 'oojs-ui-windows', 'oojs-ui.styles.icons-interactions', 'oojs-ui.styles.icons-user']);
		const [messageDialog, windowManager] = [new OO.ui.MessageDialog(), new OO.ui.WindowManager()];
		const nameInput = new OO.ui.TextInputWidget({
			icon: 'userAvatar',
			placeholder: `${User}${Name}`,
			validate: 'non-empty',
			value: AnYi.getCookie(`${CookiePrefix}UserName`),
		}),
		pwdInput = new OO.ui.TextInputWidget({
			icon: 'key',
			placeholder: Password,
			type: 'password',
			validate: 'non-empty',
		}),
		autoLoginCheckbox = new OO.ui.CheckboxInputWidget({
			selected: true,
		}),
		autoLoginLayout = new OO.ui.FieldLayout(autoLoginCheckbox, {
			align: 'inline',
			label: `跨${AnYi.wgULS('维', '維')}基${Auto}${Login}`,
		}),
		keepLoginCheckbox = new OO.ui.CheckboxInputWidget(),
		keepLoginLayout = new OO.ui.FieldLayout(keepLoginCheckbox, {
			align: 'inline',
			label: `保持${Login}${AnYi.wgULS('状态', '狀態')}1年（不勾${AnYi.wgULS('选则1个', '選則1個')}月）`,
		}),
		$label = jQuery('<label>').addClass('oo-ui-labelWidget oo-ui-labelElement-label').css({'font-size': 'small', 'text-align': 'justify'}),
		$autoLogin = $label.clone().append(autoLoginLayout.$element),
		$forgotPassword = $label.clone().css('float', 'right').html(`<a href="/wiki/Special:PasswordReset" title="重${AnYi.wgULS('置密码', '新設定密碼')}">忘${AnYi.wgULS('记密码', '記密碼')}？</a>`),
		$inputBox = $label.clone().css({'display': 'block', 'font-size': 'inherit', 'padding': '6px 0'}).append(nameInput.$element.css('margin-bottom', '6px')).append(pwdInput.$element),
		$rememberMe = $label.clone().append(keepLoginLayout.$element);
		let loginToken = '';
		const doLogin = async({autoLogin = false, loginContinue = false, retypePassword = false} = {}) => {
			const api = new mw.Api();
			if (!loginContinue) {
				AnYi.showNotice(`<span>正在${Get}${Login}${Token}</span>`, {
					autoHide: false,
					tag: 'token',
				});
				loginToken = await api.getToken('login');
				AnYi.showNotice(`<span>${Get}${Login}${Token}成功</span>`, {
					autoHide: true,
					tag: 'token',
				});
			}
			const params = {
				action: 'clientlogin',
				format: 'json',
				formatversion: '2',
				logintoken: loginToken,
				loginreturnurl: location.href,
				username: username || nameInput.value,
				password: password || pwdInput.value,
			};
			password = params.password;
			keepLoginCheckbox.isSelected() && (params.rememberMe = '1');
			if (loginContinue || retypePassword) {
				windowManager.clearWindows();
				delete params.loginreturnurl;
				delete params.username;
				delete params.password;
				params.logincontinue = true;
				const value = await OO.ui.prompt(jQuery(`<b class="oo-ui-messageDialog-title oo-ui-window-head">${AnYi.wgULS('请输入', '請輸入')}${retypePassword?Password:Recaptcha}</b>`), {
					textInput: {
						icon: 'key',
						placeholder: retypePassword ? `新${Password}` : `6位${AnYi.wgULS('数', '數')}字`,
						validate: 'integer',
					},
				});
				if (value === null) {
					AnYi.showNotice(`<span>${Login}取消</span>`, {
						autoHide: true,
						tag: 'login',
					});
					return;
				} else if (value === '') {
					AnYi.showNotice(`<span>${retypePassword?Password:Recaptcha}不能${AnYi.wgULS('为', '爲')}空</span>`, {
						autoHide: true,
						tag: 'login',
					});
					if (retypePassword) return doLogin({retypePassword: true})
					else return doLogin({loginContinue: true});
				}
				if (retypePassword) {
					params.password = value;
					params.retype = value;
				} else {
					params.OATHToken = value;
				}
			}
			AnYi.showNotice(`<span>正在${Login}</span>`, {
				autoHide: false,
				tag: 'login',
			});
			const response = await api.post(params);
			if (response.clientlogin?.status === 'PASS') {
				const time = params.rememberMe ? '8760' : '720';
				AnYi.showNotice(`<span>${Login}成功</span>`, {
					autoHide: false,
					tag: 'login',
				});
				AnYi.setCookie(`${CookiePrefix}UserName`, response.clientlogin.username, time);
				autoLoginCheckbox.isSelected() ? AnYi.setCookie(`${CookiePrefix}Password`, AnYiMirror.deflateRaw(password, ''), time) : !autoLogin && AnYi.setCookie(`${CookiePrefix}Password`, 'deleted', '-1');
				location.reload();
			} else if (response.clientlogin?.messagecode) {
				autoLogin && AnYi.setCookie(`${CookiePrefix}Password`, 'deleted', '-1');
				switch (response.clientlogin.messagecode) {
				case 'authmanager-authn-autocreate-failed':
					AnYi.showNotice(`<span>${Auto}${AnYi.wgULS('创', '創')}建${Account}失${AnYi.wgULS('败', '敗')}</span>`);
					windowManager.clearWindows();
					break;
				case 'centralauth-login-error-locked':
					AnYi.showNotice(`<span>${User}已被全域${AnYi.wgULS('锁定', '封鎖')}</span>`);
					windowManager.clearWindows();
					break;
				case 'login-throttled':
					AnYi.showNotice(`<span>${User}${Login}${AnYi.wgULS('过于频繁，请五分钟后再试', '過於頻繁，請五分鐘後再試')}</span>`);
					break;
				case 'oathauth-auth-ui':
					doLogin({loginContinue: true});
					break;
				case 'oathauth-login-failed':
					AnYi.showNotice(`<span>${Recaptcha}${Error}</span>`, {
						autoHide: true,
						tag: 'login',
					});
					doLogin({loginContinue: true});
					break;
				case 'resetpass-temp-emailed':
					AnYi.showNotice(`<span>需要${AnYi.wgULS('设', '設')}置新${Password}`, {
						autoHide: true,
						tag: 'login',
					});
					doLogin({retypePassword: true});
					break;
				case 'wrongpassword':
					AnYi.showNotice(`<span>${User}${Name}或${Password}${Error}</span>`, {
						autoHide: true,
						tag: 'login',
					});
					windowManager.clearWindows();
					AnYi.ajaxLogin();
					break;
				default:
					AnYi.showNotice(`<span>未定${AnYi.wgULS('义', '義')}的API${Error}</span>`);
				}
			}
		};
		if (username && password) return doLogin({autoLogin: true});
		const isValid = () => {
			const valid = ![nameInput.value, pwdInput.value].includes('');
			!valid && AnYi.showNotice(`<span>${User}${Name}或${Password}不能${AnYi.wgULS('为', '爲')}空</span>`, {
				autoHide: true,
				tag: 'login',
			});
			return valid;
		};
		pwdInput.on('enter', () => isValid() && doLogin());
		jQuery('body').append(windowManager.$element);
		messageDialog.getActionProcess = action => {
			if (action === 'login') return new OO.ui.Process(() => isValid() && doLogin())
			else return new OO.ui.Process(() => windowManager.clearWindows());
		}
		windowManager.addWindows([messageDialog]);
		windowManager.openWindow(messageDialog, {
			actions: [{
					action: 'login',
					flags: 'primary',
					label: jQuery(`<b style="color:#36c">${Login}</b>`),
				}, {
					action: 'cancle',
					label: jQuery('<b style="color:#d33">取消</b>'),
				},
			],
			message: jQuery('<div>').addClass('oo-ui-window-foot').append($inputBox, $forgotPassword, $rememberMe, $autoLogin),
			title: jQuery(`<b class="oo-ui-window-head">${Login}</b>`),
			size: 'small',
		});
	};
	AnYi.collapsibleSidebar = () => AnYi.hasClass('ltr') && AnYi.hasClass('skin-vector-legacy') && !RLPAGEMODULES?.includes('ext.gadget.CollapsibleSidebar') && !['bo', 'dz'].includes(AnYi.getConf('wgContentLanguage')) && mw.loader.using('mediawiki.storage').then(() => AnYi.setJs(`//zh.wikipedia.${BaseMirrorDomain}/wiki/MediaWiki:Gadget-CollapsibleSidebar.js?action=raw&ctype=text/javascript&debug=1`, 'defer').then(() => console.log('AnYiMirror collapsibleSidebar.js load succeeded.')).catch(() => console.log('AnYiMirror collapsibleSidebar.js load failed.')));
	AnYi.confirmLogout = () => {
		const dom = document.querySelector('#ca-cb-logout>a') || document.querySelector('.menu__item--logout') || document.querySelector('#topbar>a[href*="UserLogout"]') || document.querySelector('#pt-logout>a') || document.querySelector('.vector-user-menu-logout');
		if (!dom || !AnYi.getConf('wgUserName') || RLPAGEMODULES?.includes('ext.gadget.confirm-logout')) return;
		const newDom = document.createElement('a');
		dom.className && (newDom.className = dom.className);
		newDom.href = dom.href;
		newDom.innerHTML = dom.innerHTML;
		dom.parentNode.append(newDom);
		dom.remove();
		newDom.addEventListener('click', async(e, token) => {
			e.preventDefault();
			e.stopPropagation();
			await mw.loader.using('oojs-ui-windows');
			OO.ui.confirm(jQuery(`<div class="AnYiNotice AnYiTip"><span style="font-size:1.2rem">您${AnYi.wgULS('确', '確')}定要${AnYi.wgULS('退', '登')}出${AnYi.wgULS('吗', '嗎')}？</span></div>`)).then(async confirmed => {
				if (!confirmed) return;
				AnYi.showNotice(`<span>正在${AnYi.wgULS('获', '獲')}取API${AnYi.wgULS('令牌', '權杖')}</span>`);
				await fetch('/w/api.php?action=query&format=json&meta=tokens&type=csrf').then(data => data.json()).then(data => data.query?.tokens && (token = data.query.tokens.csrftoken.replace('+', '%2B')));
				AnYi.showNotice(`<span>${mw.message('logging-out-notify')}</span>`);
				fetch('/w/api.php', {
					body: `action=logout&format=json&token=${token}`,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					method: 'POST',
				}).then(() => location.reload());
			});
		});
	};
	AnYi.darkMode = (method, item, value) => {
		if (!AnYi.localStorage()) return;
		const [Id, Name] = ['anyi-darkmode', 'AnYiDarkMode'],
		[ComHead, ComAnd, ComFoot] = [`<li id="${Id}"><a class="mw-ui-icon mw-ui-icon-before" title="`, '"><span>', '</span></a></li>'],
		[Dark, DarkTip, Light, LightTip] = [`深色主${AnYi.wgULS('题', '題')}`, `${AnYi.wgULS('将镜', '將鏡')}像站的主${AnYi.wgULS('题', '題')}色切${AnYi.wgULS('换', '換')}至深色`, `${AnYi.wgULS('浅', '淺')}色主${AnYi.wgULS('题', '題')}`, `${AnYi.wgULS('将镜', '將鏡')}像站的主${AnYi.wgULS('题', '題')}色切${AnYi.wgULS('换', '換')}至${AnYi.wgULS('浅', '淺')}色`],
		isDarkMode = matchMedia('(prefers-color-scheme:dark)').matches,
		modeObserver = {
			dark: mediaQueryList => {
				if (mediaQueryList.matches && AnYi.localStorage(Name) === '0') {
					modeSwitcher();
					AnYi.darkMode('insert');
				}
			},
			light: mediaQueryList => {
				if (mediaQueryList.matches && AnYi.localStorage(Name) === '1') {
					modeSwitcher();
					AnYi.darkMode('insert');
				}
			}
		},
		modeSwitcher = () => AnYi.localStorage(Name) === '0' ? AnYi.localStorage(Name, '1') : AnYi.localStorage(Name, '0');
		switch (method) {
		case 'add':
			document.documentElement.classList.add(Id);
			document.documentElement.style.filter = '';
			/^zh(?:\.m)?\.wikipedia/.test(location.host) && (AnYi.hasClass('skin-monobook') || AnYi.hasClass('skin-vector-legacy')) && AnYi.setCss('anyi-css-darkmode-logo-zhwiki', 'add');
			if (!/^(?!zh\.)\S+?(?:\.m)?\.wikipedia/.test(location.host)) return;
			AnYi.hasClass('skin-monobook') && AnYi.setCss('anyi-css-darkmode-logo-wiki-monobook', 'add');
			AnYi.hasClass('skin-vector-legacy') && AnYi.setCss('anyi-css-darkmode-logo-wiki-vector-legacy', 'add');
			break;
		case 'remove':
			document.documentElement.classList.remove(Id);
			AnYi.setCss('anyi-css-darkmode-logo-zhwiki', 'remove');
			AnYi.setCss('anyi-css-darkmode-logo-wiki-monobook', 'remove');
			AnYi.setCss('anyi-css-darkmode-logo-wiki-vector-legacy', 'remove');
			break;
		case 'check':
			if (!AnYi.localStorage(Name)) isDarkMode ? AnYi.localStorage(Name, '1') : AnYi.localStorage(Name, '0');
			if (AnYi.localStorage(Name) === '1') return true;
			break;
		case 'init':
			matchMedia('(prefers-color-scheme:dark)').addListener(modeObserver.dark);
			matchMedia('(prefers-color-scheme:light)').addListener(modeObserver.light);
			window.addEventListener('storage', e => e.key === Name && AnYi.darkMode('insert'));
			const dc = () => {
				/^(?!zh\.)\S+?(?:\.m)?\.wikipedia/.test(location.host) && (AnYi.hasClass('skin-monobook') || AnYi.hasClass('skin-vector-legacy')) && document.getElementById('p-logo') && (document.getElementById('p-logo').style.transition = 'background-size,height .5s ease-in-out');
				document.removeEventListener('DOMContentLoaded', dc);
			};
			document.readyState !== 'loading' ? dc() : document.addEventListener('DOMContentLoaded', dc);
			AnYi.darkMode('insert');
			if (!AnYi.hasClass('skin-vector-legacy')) return;
			let timer;
			const debounce = ms => {
				const fn = () => {
					document.documentElement.style.height = 'auto';
					document.documentElement.style.height = `${document.documentElement.scrollHeight}px`;
				};
				if (timer) {
					clearTimeout(timer);
					timer = setTimeout(() => fn(), ms);
				} else {
					timer = setTimeout(() => fn(), ms);
				}
			},
			mo = new MutationObserver(() => debounce(500)),
			ro = new ResizeObserver(() => debounce(1000));
			mo.observe(document.body, {
				attributes: true,
				childList: true,
				subtree: true,
			});
			ro.observe(document.body);
			break;
		case 'insert':
			document.documentElement.style.transition = 'filter .5s ease-in-out';
			AnYi.hasClass('skin-cologneblue') ? document.documentElement.style.backgroundColor = '#ffffec'
			 : AnYi.hasClass('skin-contenttranslation') ? document.documentElement.style.backgroundColor = '#eaecf0'
			 : AnYi.hasClass('skin-minerva') ? document.querySelector('.main-menu-mask') && (document.querySelector('.main-menu-mask').style.transition = 'background .5s ease-in-out,opacity 100ms ease-in-out,visibility 0s linear 100ms')
			 : AnYi.hasClass('skin-modern') ? document.documentElement.style.backgroundColor = '#f0f0f0'
			 : AnYi.hasClass('skin-monobook') ? document.documentElement.style.backgroundColor = '#f9f9f9'
			 : AnYi.hasClass('skin-vector-2022') ? document.documentElement.style.backgroundColor = '#f8f9fa'
			 : AnYi.hasClass('skin-vector-legacy') ? document.documentElement.style.backgroundColor = '#f6f6f6' : void 0;
			if (AnYi.hasClass('skin-apioutput')) {
				document.documentElement.style.backgroundColor = '#fff';
				document.documentElement.style.color = '#000';
			} else if (AnYi.hasClass('skin-timeless')) {
				document.body.style.transition = 'background-color .5s ease-in-out';
				document.documentElement.style.height = '100%';
			}
			const dom = document.querySelector(`#${Id}>a`);
			if (AnYi.localStorage(Name) === '1') {
				AnYi.darkMode('add');
				AnYi.darkMode('meta', 'color-scheme', 'dark');
				AnYi.hasClass('skin-minerva') ? AnYi.darkMode('meta', 'theme-color', '#1c1e22') : AnYi.darkMode('meta', 'theme-color', '#0d0d0d');
				if (!dom) return;
				dom.innerHTML = dom.innerHTML.replace(Dark, Light);
				dom.setAttribute('title', LightTip);
			} else if (AnYi.localStorage(Name) === '0') {
				AnYi.darkMode('remove');
				AnYi.darkMode('meta', 'color-scheme', 'remove');
				AnYi.hasClass('skin-cologneblue') ? AnYi.darkMode('meta', 'theme-color', '#68a')
				 : AnYi.hasClass('skin-minerva') ? AnYi.darkMode('meta', 'theme-color', '#eaecf0')
				 : AnYi.hasClass('skin-modern') ? AnYi.darkMode('meta', 'theme-color', '#036')
				 : AnYi.hasClass('skin-monobook') ? AnYi.darkMode('meta', 'theme-color', '#e6e6e6')
				 : AnYi.darkMode('meta', 'theme-color', 'remove');
				if (!dom) return;
				dom.innerHTML = dom.innerHTML.replace(Light, Dark);
				dom.setAttribute('title', DarkTip);
			}
			break;
		case 'meta':
			const [meta, metaId, metaName] = [document.createElement('meta'), `anyi-meta-${item}`, item],
			[old, tag] = [document.querySelector(`meta[name='${metaName}']`), document.getElementById(metaId)];
			meta.content = value;
			meta.id = metaId;
			meta.name = metaName;
			old && !old.id && old.remove();
			value === 'remove' ? tag?.remove() : tag ? tag.content = value : document.head.append(meta);
			break;
		case 'normal':
			if (document.getElementById(Id)) return;
			const doClick = button => (button?.firstElementChild || document.getElementById(Id)).addEventListener('click', e => {
				e.preventDefault();
				modeSwitcher();
				AnYi.darkMode('insert');
			}),
			[pos, set, unset] = [document.getElementById('pt-preferences') || document.getElementById('p-personal'), AnYi.localStorage(Name) === '1', AnYi.localStorage(Name) === '0'];
			if (pos && AnYi.hasClass('skin-minerva')) {
				set && pos.insertAdjacentHTML('beforeEnd', `${ComHead}${LightTip}${ComAnd}${Light}${ComFoot}`);
				unset && pos.insertAdjacentHTML('beforeEnd', `${ComHead}${DarkTip}${ComAnd}${Dark}${ComFoot}`);
				doClick();
			} else if (document.getElementById('p-tb') || AnYi.hasClass('skin-apioutput') || AnYi.hasClass('skin-nostalgia')) {
				const pos = (AnYi.hasClass('skin-apioutput') || AnYi.hasClass('skin-nostalgia')) ? 'mw-content-text' : 'p-tb';
				mw.loader.using('mediawiki.util').then(() => {
					set && doClick(mw.util.addPortletLink(pos, '#', Light, Id, LightTip));
					unset && doClick(mw.util.addPortletLink(pos, '#', Dark, Id, DarkTip));
				});
			}
			break;
		}
	};
	AnYi.diffLink = async(id, diffId, oldId, revisionId, pos) => {
		if (document.getElementById(id) || !(document.getElementById('p-cactions') || document.getElementById('p-tb') || AnYi.hasClass('skin-nostalgia') || AnYi.hasClass('mw-special-MobileDiff')) || !(document.getElementById('mw-revision-nav') || AnYi.hasClass('diff', 'table')) || RLPAGEMODULES?.includes('ext.gadget.Difflink')) return;
		AnYi.hasClass('mw-special-MobileDiff') ? pos = 'mw-mf-diffarea'
		 : AnYi.hasClass('skin-nostalgia') ? pos = 'mw-content-text'
		 : AnYi.hasClass('skin-minerva') ? pos = 'p-tb'
		 : pos = 'p-cactions';
		await mw.loader.using(['mediawiki.util', 'mediawiki.widgets', 'oojs-ui-windows']);
		const doIns = (tex, dec, link, prema, dom = document.getElementById(id)) => {
			if (dom === null) {
				dom = mw.util.addPortletLink(pos, '#', tex, id, dec);
				pos === 'mw-mf-diffarea' && AnYi.setCss(`#${id}{float:right}#${id}>a>span:first-child{vertical-align:text-bottom}`, 'css', `anyi-css-difflink`);
			}
			(pos !== 'mw-mf-diffarea' && AnYi.hasClass('skin-minerva') ? dom : dom.firstElementChild).onclick = e => {
				e.preventDefault();
				const $dom = jQuery('<div>');
				[link, `[[${link}${prema?AnYi.decodeURIComponent(AnYi.getLocate('originHash')):''}]]`].forEach(value => $dom.append(new mw.widgets.CopyTextLayout({align: 'top', copyText: value}).$element));
				/(?:Android|iPhone|Mobile)/i.test(navigator.userAgent) ? OO.ui.alert($dom) : OO.ui.alert($dom, {size: 'medium'});
			}
		};
		if (diffId) {
			const buildLink = (oldId, link = 'Special:Diff/') => {
				oldId && (link += `${oldId}/`);
				link += diffId;
				doIns(`${AnYi.wgULS('当', '當')}前差${AnYi.wgULS('异链接', '異連結')}`, `${AnYi.wgULS('复制链接', '複製連結')}到${AnYi.wgULS('当前', '當前')}差${AnYi.wgULS('异', '異')}版本的${AnYi.wgULS('维', '維')}基${AnYi.wgULS('语', '語')}法`, link);
			};
			buildLink(oldId);
			oldId && fetch(`/w/api.php?action=compare&format=json&fromrev=${diffId}&prop=ids&torelative=prev`).then(data => data.json()).then(data => diffId === AnYi.getConf('wgDiffNewId') && data.compare?.fromrevid === AnYi.getConf('wgDiffOldId') && buildLink(false));
		} else if ([document.getElementById('contentSub').querySelectorAll('#mw-revision-nav').length, document.querySelectorAll('main#content>.pre-content #mw-revision-nav').length].includes(1) && revisionId) {
			doIns(`${AnYi.wgULS('当', '當')}前修${AnYi.wgULS('订链接', '訂連結')}`, `${AnYi.wgULS('复制链接', '複製連結')}到${AnYi.wgULS('当', '當')}前修${AnYi.wgULS('订', '訂')}版本的${AnYi.wgULS('维', '維')}基${AnYi.wgULS('语', '語')}法`, `Special:PermaLink/${revisionId}`, true);
		}
	};
	AnYi.disableAnonEdit = () => {
		if (AnYi.getConf('wgUserName')) return;
		mw.hook('wikipage.editform').add($dom => {
			$dom.find('#wpSummary').prop('readonly', true);
			$dom.find('#wpTextbox1').prop('readonly', true);
		});
		mw.hook('mobileFrontend.editorOpened').add(() => jQuery('#wikitext-editor').prop('readonly', true));
		mw.hook('ve.activationComplete').add(($surface = ve.init.target.getSurface()) => $surface && $surface.setReadOnly(true));
	};
	AnYi.displayAnonHide = id => {
		const isLogin = AnYi.getConf('wgUserName');
		isLogin && AnYi.setCss(id, 'remove');
		!isLogin && AnYi.hasClass('mw-special-CreateAccount') && location.replace('/wiki/Special:Userlogin');
	};
	AnYi.extraCss = id => {
		const [c, u] = ['.mw-wiki-logo{background-image:url(/static/images/mobile/copyright/wikipedia.png)!important;background-size:100px;filter:invert(.9)}', `//upload.${BaseMirrorDomain}/wikimirror/zh/darkmode/zhwiki`];
		if (id === 'anyi-css-darkmode-logo-wiki-monobook') return `${c}@media only screen and (min-width:551px){body.skin--responsive #column-one{padding-top: 110px}body.skin--responsive #p-logo a,body.skin--responsive #p-logo a:hover{background-position:50% 15%!important}}`;
		if (id === 'anyi-css-darkmode-logo-wiki-vector-legacy') return `${c}#p-logo{height:100px}#p-logo a{height:125px}`;
		if (id === 'anyi-css-darkmode-logo-zhwiki') return `.mw-wiki-logo{background-image:url(${u}.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans.png)}@media(-webkit-min-device-pixel-ratio:1.5),(min--moz-device-pixel-ratio:1.5),(min-resolution:1.5dppx),(min-resolution:144dpi){.mw-wiki-logo{background-image:url(${u}-1.5x.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans-1.5x.png)}}@media(-webkit-min-device-pixel-ratio:2),(min--moz-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.mw-wiki-logo{background-image:url(${u}-2x.png)}.mw-wiki-logo:lang(zh-hans),.mw-wiki-logo:lang(zh-cn),.mw-wiki-logo:lang(zh-my),.mw-wiki-logo:lang(zh-sg){background-image:url(${u}-hans-2x.png)}}`;
	};
	AnYi.scrollUpButton = () => !RLPAGEMODULES?.includes('ext.gadget.scrollUpButton') && AnYi.setJs(`//zh.wikipedia.${BaseMirrorDomain}/wiki/MediaWiki:Gadget-scrollUpButton.js?action=raw&ctype=text/javascript&debug=1`, 'async').then(() => console.log('AnYiMirror scrollUpButton.js load succeeded.')).catch(() => console.log('AnYiMirror scrollUpButton.js load failed.'));
	AnYi.wgUXS = (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) => {
		const ret = {
			'zh': zh ?? hans ?? hant ?? cn ?? tw ?? hk ?? sg ?? mo ?? my,
			'zh-hans': hans ?? cn ?? sg ?? my,
			'zh-hant': hant ?? tw ?? hk ?? mo,
			'zh-cn': cn ?? hans ?? sg ?? my,
			'zh-hk': hk ?? hant ?? mo ?? tw,
			'zh-mo': mo ?? hant ?? hk ?? tw,
			'zh-sg': sg ?? hans ?? cn ?? my,
			'zh-tw': tw ?? hant ?? hk ?? mo,
		};
		return ret[wg] ?? zh ?? hans ?? hant ?? cn ?? tw ?? hk ?? sg ?? mo ?? my ?? '';
	};
	AnYi.wgULS = (hans, hant, cn, tw, hk, sg, zh, mo, my) => AnYi.wgUXS(AnYi.getConf('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
	AnYi.localStorage = (name, value) => {
		const check = (s => {
			try {
				s.setItem('_', '_');
				s.removeItem('_');
				return true;
			} catch (e) {
				return false;
			}
		})(localStorage);
		if (check && name) {
			if (value) localStorage.setItem(name, value)
			else return localStorage.getItem(name);
		} else {
			return check;
		}
	};
},
AnYiMirrorPrivateHolder = (time = 0) => {
	return new Promise((resolve, reject) => {
		const AnYiMirrorPrivateHoldTimer = setInterval(async() => {
			time++;
			if (document.body?.classList.contains('mediawiki') && typeof mw === 'object' && typeof mw.config.get === 'function' && typeof mw.hook === 'function' && typeof mw.loader.using === 'function' && typeof mw.message === 'function') {
				clearInterval(AnYiMirrorPrivateHoldTimer);
				resolve('AnYiMirror dependencies load succeeded.');
				console.log(await AnYiMirrorPrivateLoader());
			} else if (time > 3000) {
				clearInterval(AnYiMirrorPrivateHoldTimer);
				reject('AnYiMirror dependencies load failed.');
				AnYiMirrorPrivateMethod.setCss(document.getElementsByTagName('noscript')?.[0].innerHTML.replace(/<\/?style>/g, ''), 'css');
			}
		}, 10);
	});
},
AnYiMirrorPrivateLoader = () => {
	return new Promise(resolve => {
		AnYiMirrorPrivateMethod.darkMode('normal');
		AnYiMirrorPrivateMethod.disableAnonEdit();
		AnYiMirrorPrivateMethod.showRedirect('anyi-redirect');
		AnYiMirrorPrivateMethod.ajaxLogin('init');
		AnYiMirrorPrivateMethod.collapsibleSidebar();
		AnYiMirrorPrivateMethod.confirmLogout();
		AnYiMirrorPrivateMethod.scrollUpButton();
		document.addEventListener('copy', e => {
			let value = getSelection(0).toString();
			if (new RegExp(BaseMirrorDomainRegex, 'gi').test(value)) {
				e.preventDefault();
				value = AnYiMirrorPrivateMethod.getRealText(value);
				if (e.clipboardData) {
					e.clipboardData.setData('text/plain', value);
				} else if (clipboardData) {
					clipboardData.setData('text/plain', value);
				}
			}
		});
		AnYiMirror.getRealText.initCount = 0;
		AnYiMirror.getRealText.isAceInit = false;
		mw.hook('codeEditor.configure').add(editor => {
			if (AnYiMirror.getRealText.isAceInit) return;
			AnYiMirror.getRealText.isAceInit = true;
			document.getElementById('wpSave')?.addEventListener('click', () => editor.setValue(AnYiMirrorPrivateMethod.getRealText(editor.getValue())));
		});
		mw.hook('wikipage.content').add(item => {
			if (!item[0] || !['mw-content-text', 'mw-watchlist-options'].includes(item?.[0].id)) return;
			AnYiMirror.getRealText.initCount > 0 && AnYiMirrorPrivateMethod.getRealText(void 0, 'wiki');
			AnYiMirror.getRealText.initCount++;
			AnYiMirrorPrivateMethod.diffLink('anyi-difflink', AnYiMirrorPrivateMethod.getConf('wgDiffNewId'), AnYiMirrorPrivateMethod.getConf('wgDiffOldId'), AnYiMirrorPrivateMethod.getConf('wgRevisionId'));
		});
		resolve('AnYiMirror load succeeded.');
	});
},
AnYiMirrorPrivateMain = (time = 0) => {
	return new Promise(resolve => {
		const isBanSite = /developer|techblog/.test(location.host);
		!isBanSite && AnYiMirrorPrivateMethod.darkMode('check') && (document.documentElement.style.filter = 'invert(.95) hue-rotate(.5turn)');
		AnYiMirrorPrivateMethod.setCss('/wikimirror.css?date=20230225', 'url').then(() => console.log('AnYiMirror basic stylesheet load succeeded.')).catch(() => console.log('AnYiMirror basic stylesheet load failed.'));
		const dc = () => {
			const buttonDom = document.getElementById('wpSave'),
			doClick = () => {
				event.preventDefault();
				AnYiMirrorPrivateMethod.getRealText(void 0, 'wiki');
				buttonDom.removeEventListener('click', doClick);
				buttonDom.click();
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
			buttonDom?.addEventListener('click', doClick);
			!AnYiMirrorPrivateMethod.getConf('wgUserName') && buttonDom?.removeAttribute('accesskey');
			mo.observe(document.body, {
				childList: true,
				subtree: true,
			});
			const [cx, st] = [document.querySelector('.cx-skin-menu-content-list'), document.querySelector('#footer-places-statslink a') || document.querySelector('#statslink a')];
			cx && (cx.id = 'p-tb');
			st && (st.href = AnYiMirrorPrivateMethod.getRealText(st.href));
			window.addEventListener('beforeprint', () => {
				AnYiMirrorPrivateMethod.darkMode('meta', 'color-scheme', 'remove');
				for (const dom of document.querySelectorAll('a')) {
					dom.href = AnYiMirrorPrivateMethod.getRealText(dom.href);
				}
			});
			window.addEventListener('afterprint', () => location.reload());
			document.removeEventListener('DOMContentLoaded', dc);
		};
		document.readyState !== 'loading' ? dc() : document.addEventListener('DOMContentLoaded', dc);
		const AnYiMirrorPrivateMainTimer = setInterval(() => {
			time++;
			if (document.body?.classList.contains('mediawiki')) {
				clearInterval(AnYiMirrorPrivateMainTimer);
				AnYiMirrorPrivateMethod.darkMode('init');
				AnYiMirrorPrivateMethod.displayAnonHide('anyi-css-anon-hide');
				resolve('AnYiMirror basic methods load succeeded.');
			} else if (time > 50) {
				clearInterval(AnYiMirrorPrivateMainTimer);
				!isBanSite && AnYiMirrorPrivateMethod.darkMode('init');
				const fn = () => {
					document.querySelector('.pure-form#search-form')?.action.replace(/org\//, BaseMirrorDomain);
					window.portalSearchDomain && (window.portalSearchDomain = portalSearchDomain.replace(/org$/, BaseMirrorDomain));
					AnYiMirrorPrivateMethod.getRealText(void 0, 'wikiless');
				};
				document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
				resolve('AnYiMirror non-wiki mode.');
			}
		}, 0);
	});
};
(async() => {
	const AnYiMirrorPrivateMainMessage = await AnYiMirrorPrivateMain(),
	isWiki = !/non-wiki/.test(AnYiMirrorPrivateMainMessage);
	console.log(AnYiMirrorPrivateMainMessage);
	if (!isWiki) return;
	/*! ajax-hook 2.1.3 https://github.com/wendux/ajax-hook @license MIT */
	!function(t,e){for(var n in e)t[n]=e[n]}(window,function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)n[r]=t[r];return n.target=n.currentTarget=e,n}function o(t,e){function n(e){return function(){var n=this.hasOwnProperty(e+"_")?this[e+"_"]:this.xhr[e],r=(t[e]||{}).getter;return r&&r(n,this)||n}}function o(e){return function(n){var o=this.xhr,i=this,s=t[e];if("on"===e.substring(0,2))i[e+"_"]=n,o[e]=function(s){s=r(s,i),t[e]&&t[e].call(i,o,s)||n.call(i,s)};else{var u=(s||{}).setter;n=u&&u(n,i)||n,this[e+"_"]=n;try{o[e]=n}catch(t){}}}}function i(e){return function(){var n=[].slice.call(arguments);if(t[e]){var r=t[e].call(this,n,this.xhr);if(r)return r}return this.xhr[e].apply(this.xhr,n)}}return e=e||window,e[u]=e[u]||e.XMLHttpRequest,e.XMLHttpRequest=function(){for(var t=new e[u],r=0;r<a.length;++r){var c="on"+a[r];void 0===t[c]&&(t[c]=null)}for(var f in t){var h="";try{h=s(t[f])}catch(t){}"function"===h?this[f]=i(f):Object.defineProperty(this,f,{get:n(f),set:o(f),enumerable:!0})}var d=this;t.getProxy=function(){return d},this.xhr=t},Object.assign(e.XMLHttpRequest,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4}),e[u]}function i(t){t=t||window,t[u]&&(t.XMLHttpRequest=t[u]),t[u]=void 0}Object.defineProperty(e,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.configEvent=r,e.hook=o,e.unHook=i;var u="__xhr",a=e.events=["load","loadend","timeout","error","readystatechange","abort"]},function(t,e,n){"use strict";function r(t,e){if(e=e||window,e.__xhr)throw"Ajax is already hooked.";return f(t,e)}function o(t){(0,h.unHook)(t)}function i(t){return t.replace(/^\s+|\s+$/g,"")}function s(t){return t.watcher||(t.watcher=document.createElement("a"))}function u(t,e){var n=t.getProxy(),r="on"+e+"_",o=(0,h.configEvent)({type:e},n);n[r]&&n[r](o);var i;"function"==typeof Event?i=new Event(e,{bubbles:!1}):(i=document.createEvent("Event"),i.initEvent(e,!1,!0)),s(t).dispatchEvent(i)}function a(t){this.xhr=t,this.xhrProxy=t.getProxy()}function c(t){function e(t){a.call(this,t)}return e[g]=Object.create(a[g]),e[g].next=t,e}function f(t,e){function n(t,e){var n=new w(t),r={response:e.response||e.responseText,status:e.status,statusText:e.statusText,config:t.config,headers:t.resHeader||t.getAllResponseHeaders().split("\r\n").reduce(function(t,e){if(""===e)return t;var n=e.split(":");return t[n.shift()]=i(n.join(":")),t},{})};if(!d)return n.resolve(r);d(r,n)}function r(t,e,n,r){var o=new E(t);n={config:t.config,error:n,type:r},v?v(n,o):o.next(n)}function o(){return!0}function a(t){return function(e,n){return r(e,this,n,t),!0}}function c(t,e){return 4===t.readyState&&0!==t.status?n(t,e):4!==t.readyState&&u(t,y),!0}var f=t.onRequest,d=t.onResponse,v=t.onError;return(0,h.hook)({onload:o,onloadend:o,onerror:a(p),ontimeout:a(l),onabort:a(x),onreadystatechange:function(t){return c(t,this)},open:function(t,e){var n=this,r=e.config={headers:{}};r.method=t[0],r.url=t[1],r.async=t[2],r.user=t[3],r.password=t[4],r.xhr=e;var o="on"+y;if(e[o]||(e[o]=function(){return c(e,n)}),f)return!0},send:function(t,e){var n=e.config;if(n.withCredentials=e.withCredentials,n.body=t[0],f){var r=function(){f(n,new b(e))};return!1===n.async?r():setTimeout(r),!0}},setRequestHeader:function(t,e){if(e.config.headers[t[0].toLowerCase()]=t[1],f)return!0},addEventListener:function(t,e){var n=this;if(-1!==h.events.indexOf(t[0])){var r=t[1];return s(e).addEventListener(t[0],function(e){var o=(0,h.configEvent)(e,n);o.type=t[0],o.isTrusted=!0,r.call(n,o)}),!0}},getAllResponseHeaders:function(t,e){var n=e.resHeader;if(n){var r="";for(var o in n)r+=o+": "+n[o]+"\r\n";return r}},getResponseHeader:function(t,e){var n=e.resHeader;if(n)return n[(t[0]||"").toLowerCase()]}},e)}Object.defineProperty(e,"__esModule",{value:!0}),e.proxy=r,e.unProxy=o;var h=n(0),d=h.events[0],v=h.events[1],l=h.events[2],p=h.events[3],y=h.events[4],x=h.events[5],g="prototype";a[g]=Object.create({resolve:function(t){var e=this.xhrProxy,n=this.xhr;e.readyState=4,n.resHeader=t.headers,e.response=e.responseText=t.response,e.statusText=t.statusText,e.status=t.status,u(n,y),u(n,d),u(n,v)},reject:function(t){this.xhrProxy.status=0,u(this.xhr,t.type),u(this.xhr,v)}});var b=c(function(t){var e=this.xhr;t=t||e.config,e.withCredentials=t.withCredentials,e.open(t.method,t.url,!1!==t.async,t.user,t.password);for(var n in t.headers)e.setRequestHeader(n,t.headers[n]);e.send(t.body)}),w=c(function(t){this.resolve(t)}),E=c(function(t){this.reject(t)})},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ah=void 0;var r=n(0),o=n(1);e.ah={proxy:o.proxy,unProxy:o.unProxy,hook:r.hook,unHook:r.unHook}}]));
	/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
	!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),o=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function m(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let b,g,p;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,o=0;for(n=1;n<=s;n++)o=o+a[n-1]<<1,i[n]=o;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,l,h,d=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+d++],n+=(255&t.pending_buf[t.sym_buf+d++])<<8,s=t.pending_buf[t.sym_buf+d++],0===n?z(t,s,e):(l=c[s],z(t,l+a+1,e),h=r[l],0!==h&&(s-=u[l],x(t,s,h)),n--,l=v(n),z(t,l,i),h=o[l],0!==h&&(n-=w[l],x(t,n,h)))}while(d<t.sym_next);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let o,l,h,d=-1;for(t.heap_len=0,t.heap_max=573,o=0;o<r;o++)0!==a[2*o]?(t.heap[++t.heap_len]=d=o,t.depth[o]=0):a[2*o+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,o=t.heap_len>>1;o>=1;o--)S(t,a,o);h=r;do{o=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=o,t.heap[--t.heap_max]=l,a[2*h]=a[2*o]+a[2*l],t.depth[h]=(t.depth[o]>=t.depth[l]?t.depth[o]:t.depth[l])+1,a[2*o+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,o=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,m=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,m++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=l&&(u=o[_-l]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==m){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,m-=2}while(m>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),x(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),x(t,o-3,3)):(z(t,18,t.bl_tree),x(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),Z(t),y(t,a),y(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var N=(t,e,i,n)=>{let s,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),o=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},B={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<o[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<o[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);b=new m(d,r,257,i,s),g=new m(_,o,0,n,s),p=new m(new Array(0),l,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,b),t.d_desc=new k(t.dyn_dtree,g),t.bl_desc=new k(t.bl_tree,p),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:N,_tr_tally:(t,e,i)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=i,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const M=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,i)=>{const n=M,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},j={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},K={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:P,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=B,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:it,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:st,Z_FILTERED:rt,Z_HUFFMAN_ONLY:ot,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:dt,Z_UNKNOWN:_t,Z_DEFLATED:ft}=K,ct=258,ut=262,wt=42,mt=113,bt=666,gt=(t,e)=>(t.msg=j[e],e),pt=t=>2*t-(t>4?9:0),kt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let yt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const xt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,xt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=C(t.adler,e,n,a):2===t.state.wrap&&(t.adler=H(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Zt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ct;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ct-(f-s),s=f-ct,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},Ut=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ut)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),i+=e),0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=yt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=yt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ut&&0!==t.strm.avail_in)},St=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==V||e===q||a!==i+t.strm.avail_in))break;r=e===V&&a===i+t.strm.avail_in?1:0,Y(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,xt(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(Rt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Rt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===V)&&e!==q&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===V&&0===t.strm.avail_in&&a===i?1:0,Y(t,t.block_start,a,r),t.block_start+=a,xt(t.strm)),r?3:1)},Dt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a)),t.match_length>=3)if(i=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=yt(t,t.ins_h,t.window[t.strstart+1]);else i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a),t.match_length<=5&&(t.strategy===rt||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=X(t,0,t.window[t.strstart-1]),i&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2};function Ot(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const It=[new Ot(0,0,0,0,St),new Ot(4,4,8,4,Dt),new Ot(4,5,16,8,Dt),new Ot(4,6,32,32,Dt),new Ot(4,4,16,16,Tt),new Ot(8,16,32,32,Tt),new Ot(8,16,128,128,Tt),new Ot(8,32,128,256,Tt),new Ot(32,128,258,1024,Tt),new Ot(32,258,258,4096,Tt)];function Ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ft,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Lt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==wt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==mt&&e.status!==bt?1:0},Nt=t=>{if(Lt(t))return gt(t,at);t.total_in=t.total_out=0,t.data_type=_t;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?wt:mt,t.adler=2===e.wrap?0:1,e.last_flush=-2,P(e),tt},Bt=t=>{const e=Nt(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,kt(a.head),a.max_lazy_match=It[a.level].max_lazy,a.good_match=It[a.level].good_length,a.nice_match=It[a.level].nice_length,a.max_chain_length=It[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ct=(t,e,a,i,n,s)=>{if(!t)return at;let r=1;if(e===st&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ft||i<8||i>15||e<0||e>9||s<0||s>ht||8===i&&1!==r)return gt(t,at);8===i&&(i=9);const o=new Ft;return t.state=o,o.strm=t,o.status=wt,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Bt(t)};var Mt={deflateInit:(t,e)=>Ct(t,e,ft,15,8,dt),deflateInit2:Ct,deflateReset:Bt,deflateResetKeep:Nt,deflateSetHeader:(t,e)=>Lt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Lt(t)||e>$||e<0)return t?gt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===bt&&e!==V)return gt(t,0===t.avail_out?nt:at);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(xt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&pt(e)<=pt(i)&&e!==V)return gt(t,nt);if(a.status===bt&&0!==t.avail_in)return gt(t,nt);if(a.status===wt&&0===a.wrap&&(a.status=mt),a.status===wt){let e=ft+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=ot||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=H(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,3),a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,xt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(xt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==bt){let i=0===a.level?St(a,e):a.strategy===ot?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ct){if(Ut(t),t.lookahead<=ct&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ct;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ct-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):It[a.level].func(a,e);if(3!==i&&4!==i||(a.status=bt),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===i&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(kt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),xt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),xt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Lt(t))return at;const e=t.state.status;return t.state=null,e===mt?gt(t,it):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Lt(t))return at;const i=t.state,n=i.wrap;if(2===n||1===n&&i.status!==wt||i.lookahead)return at;if(1===n&&(t.adler=C(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(kt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=yt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Ut(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Ht=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var jt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Ht(a,e)&&(t[e]=a[e])}}return t},Kt=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Pt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Pt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Xt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Yt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Pt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Wt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Yt[t[a]]>e?a:e};var qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Jt=Object.prototype.toString,{Z_NO_FLUSH:Qt,Z_SYNC_FLUSH:Vt,Z_FULL_FLUSH:$t,Z_FINISH:te,Z_OK:ee,Z_STREAM_END:ae,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ne,Z_DEFLATED:se}=K;function re(t){this.options=jt({level:ie,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ne},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=Mt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==ee)throw new Error(j[a]);if(e.header&&Mt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Jt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Mt.deflateSetDictionary(this.strm,t),a!==ee)throw new Error(j[a]);this._dict_set=!0}}function oe(t,e){const a=new re(e);if(a.push(t,!0),a.err)throw a.msg||j[a.err];return a.result}re.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?te:Qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Jt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Vt||s===$t)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Mt.deflate(a,s),n===ae)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Mt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===ee;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===ee&&(this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var le={Deflate:re,deflate:oe,deflateRaw:function(t,e){return(e=e||{}).raw=!0,oe(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,oe(t,e)},constants:K};const he=16209;var de=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=he;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=he;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=he;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=he;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const _e=15,fe=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ce=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ue=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),we=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var me=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=_e;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=_e;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=_e;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<_e;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=fe,D=ce,u=257):(A=ue,D=we,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:be,Z_BLOCK:ge,Z_TREES:pe,Z_OK:ke,Z_STREAM_END:ve,Z_NEED_DICT:ye,Z_STREAM_ERROR:xe,Z_DATA_ERROR:ze,Z_MEM_ERROR:Ae,Z_BUF_ERROR:Ee,Z_DEFLATED:Re}=K,Ze=16180,Ue=16190,Se=16191,De=16192,Te=16194,Oe=16199,Ie=16200,Fe=16206,Le=16209,Ne=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Be(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ce=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<Ze||e.mode>16211?1:0},Me=t=>{if(Ce(t))return xe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=Ze,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,ke},He=t=>{if(Ce(t))return xe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Me(t)},je=(t,e)=>{let a;if(Ce(t))return xe;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?xe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,He(t))},Ke=(t,e)=>{if(!t)return xe;const a=new Be;t.state=a,a.strm=t,a.window=null,a.mode=Ze;const i=je(t,e);return i!==ke&&(t.state=null),i};let Pe,Ye,Ge=!0;const Xe=t=>{if(Ge){Pe=new Int32Array(512),Ye=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(me(1,t.lens,0,288,Pe,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;me(2,t.lens,0,32,Ye,0,t.work,{bits:5}),Ge=!1}t.lencode=Pe,t.lenbits=9,t.distcode=Ye,t.distbits=5},We=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var qe={inflateReset:He,inflateReset2:je,inflateResetKeep:Me,inflateInit:t=>Ke(t,15),inflateInit2:Ke,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ce(t)||!t.output||!t.input&&0!==t.avail_in)return xe;a=t.state,a.mode===Se&&(a.mode=De),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=ke;t:for(;;)switch(a.mode){case Ze:if(0===a.wrap){a.mode=De;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=Le;break}if((15&h)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=Le;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:Se,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=Le;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=H(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=Le;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=Se;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ne(h),h=0,d=0,a.mode=Ue;case Ue:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,ye;t.adler=a.check=1,a.mode=Se;case Se:if(e===ge||e===pe)break t;case De:if(a.last){h>>>=7&d,d-=7&d,a.mode=Fe;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Xe(a),a.mode=Oe,e===pe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=Le}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=Le;break}if(a.length=65535&h,h=0,d=0,a.mode=Te,e===pe)break t;case Te:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=Se;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=Le;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=me(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=Le;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=Le;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=Le;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===Le)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=Le;break}if(a.lenbits=9,E={bits:a.lenbits},x=me(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=Le;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=me(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=Le;break}if(a.mode=Oe,e===pe)break t;case Oe:a.mode=Ie;case Ie:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,a.mode===Se&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=Se;break}if(64&b){t.msg="invalid literal/length code",a.mode=Le;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=Le;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=Le;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=Le;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=Ie);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=Ie;break;case Fe:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,r-f):C(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:Ne(h))!==a.check){t.msg="incorrect data check",a.mode=Le;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=Le;break}h=0,d=0}a.mode=16208;case 16208:x=ve;break t;case Le:x=ze;break t;case 16210:return Ae;default:return xe}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<Le&&(a.mode<Fe||e!==be))&&We(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,t.next_out-f):C(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===Se?128:0)+(a.mode===Oe||a.mode===Te?256:0),(0===_&&0===f||e===be)&&x===ke&&(x=Ee),x},inflateEnd:t=>{if(Ce(t))return xe;let e=t.state;return e.window&&(e.window=null),t.state=null,ke},inflateGetHeader:(t,e)=>{if(Ce(t))return xe;const a=t.state;return 0==(2&a.wrap)?xe:(a.head=e,e.done=!1,ke)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return Ce(t)?xe:(i=t.state,0!==i.wrap&&i.mode!==Ue?xe:i.mode===Ue&&(n=1,n=C(n,e,a,0),n!==i.check)?ze:(s=We(t,e,a,a),s?(i.mode=16210,Ae):(i.havedict=1,ke)))},inflateInfo:"pako inflate (from Nodeca project)"};var Je=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Qe=Object.prototype.toString,{Z_NO_FLUSH:Ve,Z_FINISH:$e,Z_OK:ta,Z_STREAM_END:ea,Z_NEED_DICT:aa,Z_STREAM_ERROR:ia,Z_DATA_ERROR:na,Z_MEM_ERROR:sa}=K;function ra(t){this.options=jt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=qe.inflateInit2(this.strm,e.windowBits);if(a!==ta)throw new Error(j[a]);if(this.header=new Je,qe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Gt(e.dictionary):"[object ArrayBuffer]"===Qe.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=qe.inflateSetDictionary(this.strm,e.dictionary),a!==ta)))throw new Error(j[a])}function oa(t,e){const a=new ra(e);if(a.push(t),a.err)throw a.msg||j[a.err];return a.result}ra.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?$e:Ve,"[object ArrayBuffer]"===Qe.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=qe.inflate(a,r),s===aa&&n&&(s=qe.inflateSetDictionary(a,n),s===ta?s=qe.inflate(a,r):s===na&&(s=aa));a.avail_in>0&&s===ea&&a.state.wrap>0&&0!==t[a.next_in];)qe.inflateReset(a),s=qe.inflate(a,r);switch(s){case ia:case na:case aa:case sa:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===ea))if("string"===this.options.to){let t=Wt(a.output,a.next_out),e=a.next_out-t,n=Xt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==ta||0!==o){if(s===ea)return s=qe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},ra.prototype.onData=function(t){this.chunks.push(t)},ra.prototype.onEnd=function(t){t===ta&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var la={Inflate:ra,inflate:oa,inflateRaw:function(t,e){return(e=e||{}).raw=!0,oa(t,e)},ungzip:oa,constants:K};const{Deflate:ha,deflate:da,deflateRaw:_a,gzip:fa}=le,{Inflate:ca,inflate:ua,inflateRaw:wa,ungzip:ma}=la;var ba=ha,ga=da,pa=_a,ka=fa,va=ca,ya=ua,xa=wa,za=ma,Aa=K,Ea={Deflate:ba,deflate:ga,deflateRaw:pa,gzip:ka,Inflate:va,inflate:ya,inflateRaw:xa,ungzip:za,constants:Aa};t.Deflate=ba,t.Inflate=va,t.constants=Aa,t.default=Ea,t.deflate=ga,t.deflateRaw=pa,t.gzip=ka,t.inflate=ya,t.inflateRaw=xa,t.ungzip=za,Object.defineProperty(t,"__esModule",{value:!0})}));
	const base64ToUint8Array = value => {
		const base64Data = (value + '='.repeat((4 - value.length % 4) % 4)).replace(/\-/g, '+').replace(/_/g, '/'),
		rawData = atob(base64Data);
		let outputArray = new Uint8Array(rawData.length);
		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	},
	uint8arrayToBase64 = value => {
		const chunk = 0x8000;
		let [index, result, slice] = [0, ''];
		while (index < value.length) {
			slice = value.subarray(index, Math.min(index + chunk, value.length));
			result += String.fromCharCode.apply(null, slice);
			index += chunk;
		}
		return btoa(result);
	};
	function AnYiMirrorPublicMethod() {console.log(this)}
	AnYiMirrorPublicMethod.prototype.getRealText = AnYiMirrorPrivateMethod.getRealText;
	AnYiMirrorPublicMethod.prototype.deflateRaw = (value, prefix = 'rawdeflate,') => {
		return prefix + uint8arrayToBase64(pako.deflateRaw(value, {
			to: 'string',
			level: 5,
		}));
	};
	AnYiMirrorPublicMethod.prototype.inflateRaw = (value, prefix = 'rawdeflate,') => {
		return pako.inflateRaw(base64ToUint8Array(value.replace(prefix, '')), {
			to: 'string',
			level: 5,
		});
	};
	AnYiMirrorPublicMethod.prototype.ahCallback_Request = config => {
		const [textArr, getObj, postObj] = [['apfrom', 'appendtext', 'apprefix', 'claim', 'content', 'ehcontent', 'epcontent', 'etcontent', 'etssummary', 'fromtext', 'fromtext-main', 'html', 'ntcontent', 'nttopic', 'prependtext', 'repcontent', 'search', 'summary', 'text', 'titles', 'totext', 'totext-main', 'url', 'wikitext'], new URL(config.url, location.origin), new URL(`${location.origin}/w/api.php?${config.body}`)];
		try {
			if (config.body === null) throw new ReferenceError('Request body is null.');
			const bodyObj = JSON.parse(config.body);
			delete bodyObj.md5;
			for (const text of textArr) {
				const value = bodyObj.query?.[text];
				value && (bodyObj.query[text] = AnYiMirror.getRealText(value));
			}
			config.body = JSON.stringify(bodyObj);
		} catch (e) {
			if (config.body && /^\?(?:\[object%20FormData\]|null)$/.test(postObj.search)) {
				config.body.delete('md5');
				if (config.body.get('action') === 'visualeditoredit') {
					if (config.body.has('html')) {
						let html = config.body.get('html');
						const isDeflate = html.startsWith('rawdeflate');
						isDeflate && (html = AnYiMirror.inflateRaw(html));
						html = AnYiMirror.getRealText(html);
						config.body.set('html', isDeflate ? AnYiMirror.deflateRaw(html) : html);
					} else if (config.body.has('wikitext')) {
						config.body.set('wikitext', AnYiMirror.getRealText(config.body.get('wikitext')));
					}
				} else {
					for (const text of textArr) {
						config.body.has(text) && config.body.set(text, AnYiMirror.getRealText(config.body.get(text)));
					}
				}
			} else {
				const [getDeflateRaw, getParams, postParams] = [deflateRawValue => AnYiMirror.deflateRaw(AnYiMirror.getRealText(AnYiMirror.inflateRaw(deflateRawValue))), getObj.searchParams, postObj.searchParams];
				postParams.delete('md5');
				for (const text of textArr) {
					getParams.has(text) && getParams.set(text, AnYiMirror.getRealText(getParams.get(text)));
					postParams.has(text) && postParams.set(text, AnYiMirror.getRealText(postParams.get(text)));
				}
				switch (postParams.get('action')) {
				case 'cxpublish':
					postParams.set('html', getDeflateRaw(postParams.get('html')));
					break;
				case 'cxsave':
					postParams.set('content', getDeflateRaw(postParams.get('content')));
					break;
				case 'logout':
					for (const CookiePrefix of ['lastLogin', 'lastLoginWikitech']) {
						document.cookie.includes(`${CookiePrefix}Password`) && (document.cookie = `${CookiePrefix}Password=deleted;domain=.${BaseMirrorDomain};path=/;Secure;expires=Thu, 01 Jan 1970 00:00:00 GMT`);
					}
					break;
				case 'shortenurl':
					getObj.host = location.host;
					break;
				}
				for (const regex of [/^([^.]+(?:\.m)?\.planet)\.wikimedia\.org$/, /^([^.]+(?:\.m)?\.(?:wiki(?:books|data|news|pedia|quote|source|versity|voyage)|wiktionary|mediawiki))\.org$/, /^(advisors(?:\.m)?|advisory(?:\.m)?|affcom|am(?:\.m)?|analytics|annual|api(?:\.m)?|ar(?:\.m)?|auditcom|bd(?:\.m)?|be(?:\.m)?|blog|board|boardgovcom|br(?:\.m)?|bugzilla|ca(?:\.m)?|chair|checkuser(?:\.m)?|cn(?:\.m)?|co(?:\.m)?|collab|(?:test-)?commons(?:\.m)?|config-master|cxserver|dbtree|design|developer|diff|dk(?:\.m)?|doc|ec(?:\.m)?|ee(?:\.m)?|electcom(?:\.m)?|etherpad|exec(?:\.m)?|fdc(?:\.m)?|fi(?:\.m)?|foundation(?:\.m)?|ge(?:\.m)?|gerrit|gitlab|gr(?:\.m)?|grafana|grants(?:\.m)?|graphite|hi(?:\.m)?|horizon|id(?:\.m)?|id-internal(?:\.m)?|idp|iegcom(?:\.m)?|il|incubator(?:\.m)?|intake-(?:analytics|logging)|integration|internal|labtestwikitech|legalteam(?:\.m)?|lists|login(?:\.m)?|logstash|mai(?:\.m)?|maps|meta(?:\.m)?|mk(?:\.m)?|movementroles|mx(?:\.m)?|ng(?:\.m)?|nl(?:\.m)?|no(?:\.m)?|noboard-chapters|noc|nyc(?:\.m)?|nz(?:\.m)?|office(?:\.m)?|ombuds(?:\.m)?|ombudsmen|ores|otrs-wiki(?:\.m)?|outreach(?:\.m)?|pa-us(?:\.m)?|people|pl(?:\.m)?|performance|phabricator|planet|policy|pt(?:\.m)?|projectcom|punjabi(?:\.m)?|quality(?:\.m)?|research|romd(?:\.m)?|rs(?:\.m)?|rt|ru(?:\.m)?|se(?:\.m)?|searchcom|schema|secure|spcom|species(?:\.m)?|static-bugzilla|steward(?:\.m)?|strategy(?:\.m)?|stream|svn|techblog|techconduct|ticket|tr(?:\.m)?|transitionteam(?:\.m)?|toolsadmin|transparency|ua(?:\.m)?|upload|usability|vote(?:\.m)?|vrt-wiki(?:\.m)?|wb(?:\.m)?|wikimania(?:200[5-9]|201[0-8]|wikitech-static|team)?(?:\.m)?|wikitech)\.wikimedia\.org$/]) {
					regex.test(getObj.host) && (getObj.host = getObj.host.replace(regex, `$1.${BaseMirrorDomain}`));
				}
				getObj.host === 'recommend.wmflabs.org' && (getObj.host = `recommend.${BaseMirrorDomain}`);
				getObj.host === 'wma.wmcloud.org' && (getObj.host = `wma.${BaseMirrorDomain}`);
				const XtoolsApi = 'xtools.wmflabs.org/api/';
				if (`${getObj.host}${getObj.pathname}`.includes(XtoolsApi)) {
					const path = AnYiMirror.getRealText(getObj.pathname);
					getObj.host = `xtools-api.${BaseMirrorDomain}`;
					getObj.path = path.replace('/api/', '/');
				}
				config.body && (config.body = postObj.toString().replace(`${location.origin}/w/api.php?`, ''));
				config.url && (config.url = getObj.toString());
			}
		}
		return config;
	};
	AnYiMirrorPublicMethod.prototype.ahCallback_Response = response => {
		const recursiveObj = (obj, callback, preKey) => {
			for (const key in obj) {
				if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
				typeof obj[key] === 'object' ? recursiveObj(obj[key], callback, key) : callback(obj, key, preKey);
			}
		},
		domParse = (domStr = '', mimeType = 'text/html') => {
			const doc = new DOMParser().parseFromString(domStr, mimeType.match(/^([a-z-/]+?)(?:;|$)/)[1]),
			dom = doc.documentElement;
			dom.querySelector('parsererror')?.remove();
			for (const el of dom.querySelectorAll('span[data-mw-variant]')) {
				const mwVariantObj = JSON.parse(el.dataset.mwVariant);
				recursiveObj(mwVariantObj, (obj, key) => {
					const value = obj[key];
					key === 't' && /^<(\w+?)\s.+?>.*?<\/\1>$/.test(value) && (obj[key] = (domParse(value).dom).querySelector('body').innerHTML);
				});
				el.dataset.mwVariant = JSON.stringify(mwVariantObj);
			}
			for (const el of dom.querySelectorAll('audio,base,img,source,video')) {
				for (const attr of ['href', 'poster', 'src', 'srcset']) {
					const value = el[attr];
					value && (el[attr] = value.replace(new RegExp(BaseMirrorDomainRegex, 'g'), 'r-e-p-l-a-c-e.org'));
				}
			}
			return {
				dec: domStr.match(/^\s*?(<\?xml.+?\?>)/)?.[0] || '',
				dom,
				dtd: doc.doctype ? `${new XMLSerializer().serializeToString(doc.doctype)}\n` : '',
			};
		};
		try {
			const responseObj = JSON.parse(response.response);
			if (responseObj.discussiontoolspreview?.parse?.text) {
				const htmlDom = domParse(responseObj.discussiontoolspreview.parse.text).dom;
				responseObj.discussiontoolspreview.parse.text = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
			}
			if (responseObj.visualeditor || responseObj.visualeditoredit) {
				const mode = responseObj.visualeditor ? 'visualeditor' : 'visualeditoredit';
				const content = responseObj[mode].content;
				if (content) {
					if (responseObj[mode].etag) {
						const htmlObj = domParse(content);
						responseObj[mode].content = `${htmlObj.dtd}${AnYiMirror.getRealText(htmlObj.dom.outerHTML)}`;
					} else if (/^<\S+?\sid=\S+?>/.test(content)) {
						const htmlDom = domParse(content).dom;
						responseObj[mode].content = AnYiMirror.getRealText(htmlDom.querySelector('body').innerHTML);
					} else {
						responseObj[mode].content = AnYiMirror.getRealText(content);
					}
				}
			}
			(responseObj.compare || responseObj.expandtemplates || responseObj.query?.pages) && recursiveObj(responseObj.compare || responseObj.expandtemplates || responseObj.query?.pages, (obj, key) => ['content', '*'].includes(key) && (obj[key] = AnYiMirror.getRealText(obj[key])));
			if (responseObj.html) {
				const htmlDom = domParse(responseObj.html).dom;
				responseObj.html = AnYiMirror.getRealText(htmlDom.querySelector('div').outerHTML);
			}
			if (responseObj.parse?.parsedsummary || responseObj.parse?.text || responseObj.parse?.wikitext) {
				recursiveObj(responseObj.parse, (obj, key, preKey) => {
					if (['parsedsummary', 'text'].includes(preKey)) {
						const htmlDom = domParse(obj[key]).dom;
						obj[key] = AnYiMirror.getRealText(htmlDom.querySelector('.mw-parser-output').outerHTML);
					} else if (preKey === 'wikitext') {
						obj[key] = AnYiMirror.getRealText(obj[key]);
					}
				});
			}
			if (responseObj.segmentedContent) {
				const htmlDom = domParse(responseObj.segmentedContent).dom;
				responseObj.segmentedContent = AnYiMirror.getRealText(htmlDom.outerHTML);
			}
			responseObj[0]?.url && (responseObj[0].url = AnYiMirror.getRealText(responseObj[0].url));
			response.response = JSON.stringify(responseObj);
		} catch (e) {
			const [headers, responseText, url] = [response.origResponse?.headers || response.headers, response.response, response.config.url];
			const contentType = typeof headers.get === 'function' ? headers.get('content-type') : headers['content-type'];
			if (contentType.includes('xml')) {
				const xmlObj = domParse(responseText || response.config.xhr?.responseXML, contentType);
				for (const dom of xmlObj.dom.querySelectorAll('a,rev,text')) {
					dom.innerHTML = AnYiMirror.getRealText(dom.innerHTML);
				}
				response.response = `${xmlObj.dec}${xmlObj.dtd}${xmlObj.dom.outerHTML}`;
			} else if (url.includes('/w/index.php')) {
				if (url.includes('action=render')) {
					const htmlDom = domParse(responseText).dom,
					dom = htmlDom.querySelector('.mw-parser-output');
					dom && (response.response = AnYiMirror.getRealText(dom.outerHTML));
				} else if (/json|text/.test(contentType) && !/css|html|(?:ecma|java)script/.test(contentType)) {
					response.response = AnYiMirror.getRealText(responseText);
				}
			} else if ((url.includes('/api/rest_v1/page/html') || url.includes('/api/rest_v1/transform/wikitext/to/html') || url.includes('/api/rest_v1/transform/wikitext/to/mobile-html'))) {
				const htmlObj = domParse(responseText);
				response.response = `${htmlObj.dtd}${AnYiMirror.getRealText(htmlObj.dom.outerHTML)}`;
			} else if (url.includes('/api/rest_v1/transform/html/to/wikitext')) {
				response.response = AnYiMirror.getRealText(responseText);
			} else if (url.includes(`xtools-api.${BaseMirrorDomain}`) && /format=html/.test(url)) {
				response.response = responseText.replace(/\/\/([a-z-]+(?:\.m)?)\.wikimedia\.org/g, `//$1.${BaseMirrorDomain}`).replace(/\/\/([a-z-]+)?(\.wiki(?:books|data|news|pedia|quote|versity|voyage)|\.?wikisource|\.wiktionary|\.mediawiki)\.org/g, `//$1$2.${BaseMirrorDomain}`);
			}
		}
		return response;
	};
	window.AnYiMirror = new AnYiMirrorPublicMethod();
	Object.seal(AnYiMirror);
	ah.proxy({
		onError: (err, handler) => {
			err.type === 'error' && console.log(err);
			handler.next(err);
		},
		onRequest: (config, handler) => {
			!/^%5Bobject\+(?:ArrayBuffer|Blob|DataView|Document)%5D=$/.test(config.body) && (config = AnYiMirror.ahCallback_Request(config));
			handler.next(config);
		},
		onResponse: (response, handler) => {
			const contentType = response.headers['content-type'];
			/json|text|xml/.test(contentType) && !/css|(?:ecma|java)script/.test(contentType) && (response = AnYiMirror.ahCallback_Response(response));
			handler.next(response);
		},
	});
	const {fetch: origFetch} = window;
	window.fetch = async(url, options) => {
		if (['[object Object]', '[object String]', '[object URL]'].includes(Object.prototype.toString.call(url))) {
			typeof url === 'object' && (url = url.toString());
			const urlObj = new URL(url, location.origin);
			url = AnYiMirror.ahCallback_Request({
				url: urlObj.toString(),
			}).url;
		}
		options?.body && ['[object FormData]', '[object String]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(options.body)) && (options.body = AnYiMirror.ahCallback_Request(options).body);
		let isError = false;
		const response = await origFetch(url, options).catch(err => {
			isError = true;
			console.log({err: e, options, url});
		});
		if (isError) return;
		const contentType = response.headers.get('content-type');
		if (/css|(?:ecma|java)script/.test(contentType) || !/json|text|xml/.test(contentType)) return response;
		let responseOptions = {};
		for (const item of ['headers', 'status', 'statusText']) {
			responseOptions[item] = response[item];
		}
		return new Response((AnYiMirror.ahCallback_Response({
			config: {
				url,
				options,
			},
			origResponse: response,
			response: await response.text(),
		})).response, responseOptions);
	};
	const {sendBeacon: origSendBeacon} = navigator;
	navigator.sendBeacon = (url, data) => {
		if (/intake-(?:analytics|logging)/.test(url)) return true;
		return origSendBeacon(url, data);
	};
	console.log(await AnYiMirrorPrivateHolder());
})();
} else {document.documentElement.style.display = 'none'}