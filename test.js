import test from 'ava';
import Promise from 'pinkie-promise';
import fn from './';

const delay = (ms, reject) => {
	var deferred = fn();

	setTimeout(() => {
		if (reject === true) {
			deferred.reject(new Error('unknown error'));
			return;
		}

		deferred.resolve();
	}, ms);

	return new Promise(deferred);
};

test('resolve', async t => {
	const time = new Date().getTime();

	await delay(300);

	const ms = new Date().getTime() - time;

	t.true(ms >= 300);
});

test('reject', async t => {
	const time = new Date().getTime();

	try {
		await delay(300, true);
		t.fail();
	} catch (err) {
		const ms = new Date().getTime() - time;

		t.true(ms >= 300);
		t.is(err.message, 'unknown error');
	}
});
