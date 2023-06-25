import { useBoundStore } from '../store';
import moment from 'moment';
import { LOG_KIND } from '@/constants';

function _log(kind: number, content: string) {
	let logsValue = useBoundStore.getState().logs;

	logsValue.push({
		kind,
		content,
		time: moment().format('hh:mm:ss'),
	});

	useBoundStore.setState({
		logs: logsValue,
		...useBoundStore,
	});
}

export default {
	command: (content: string) => _log(LOG_KIND.Command, content),
	text: (content: string) => _log(LOG_KIND.Text, content),
	warning: (content: string) => _log(LOG_KIND.Warning, content),
	error: (content: string) => _log(LOG_KIND.Error, content),
};
