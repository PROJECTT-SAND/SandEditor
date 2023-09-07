import { useBoundStore } from '../store';
import moment from 'moment';
import { LOG } from '@/constants';

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
	command: (content: string) => _log(LOG.Command, content),
	text: (content: string) => _log(LOG.Text, content),
	warning: (content: string) => _log(LOG.Warning, content),
	error: (content: string) => _log(LOG.Error, content),
};
