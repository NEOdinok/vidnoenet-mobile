import axios from "axios";
import qs from "qs";
const DOMParser = require('react-native-html-parser').DOMParser;

const loginUser = async (login: string, password: string) => {
	let data = qs.stringify({
		'action_id': 'AUTH',
		'login': login,
		'password': password
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://lk.vidnoe.net/',
		headers: { 
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0', 
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
			'Accept-Language': 'en-US,en;q=0.5', 
			'Accept-Encoding': 'gzip, deflate, br', 
			'Referer': 'https://lk.vidnoe.net/', 
			'Content-Type': 'application/x-www-form-urlencoded', 
			'Origin': 'https://lk.vidnoe.net', 
			'Connection': 'keep-alive', 
			'Upgrade-Insecure-Requests': '1', 
			'Sec-Fetch-Dest': 'document', 
			'Sec-Fetch-Mode': 'navigate', 
			'Sec-Fetch-Site': 'same-origin'
		},
			// 'Cookie': 'supportOnlineTalkID=F9Tb1C0mEyUwWApWOTMF2TIVoCyDzDrm; __ddg1_=oELDeObJN30U7BzpfAeu; customer_portal_session_uid=135107B874E90AAC1B3A8F586BCB44615AB9B10471B57E9826FC607D448B0276', 
		data : data
	};

	axios.request(config)
	.then((response) => {
		const htmlSTRING = JSON.stringify(response.data);
		if (htmlSTRING.includes('Неправильный логин или пароль')) {
			console.log('fail');
		} else {
			console.log({rawSuccess: htmlSTRING});
			const doc = new DOMParser().parseFromString(
				'<html><body>'+
				'<div id="a" class="a">'+
						'<a class="b">abcd</a>'+
				'</div>'+
				'<div class="b">'+
						'<a href="aa" id="b">'+
				'</div>'+
				'</body></html>'
				,'text/html'
			);
			console.log({parsedTest: doc});
		}

	})
	.catch((error) => {
		console.log(error);
	});
}

export {
	loginUser,
}
