import _ from 'lodash';

const mhs = [
	{ name: 'Yusril Arzaqi', kelas: 'TKJ2' },
	{ name: 'Bimo Alamsya', kelas: 'TKJ2' },
	{ name: 'Adam Saputra', kelas: 'TKJ2' },
	{ name: 'Dimas Rafif', kelas: 'TKJ2' },
];

const dimas = _.find(mhs, { name: 'Dimas Rafif' });

console.log(dimas);
