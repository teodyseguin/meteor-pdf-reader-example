import { Template } from 'meteor/templating';

import './main.html';

let list = new ReactiveVar(),
	complete = new ReactiveVar(),
	inProgress = new ReactiveVar();

Meteor.call('pdfList', (err, res) => {
	list.set(res);
});
Meteor.call('pdfComplete', (err, res) => {
	complete.set(res);
});
Meteor.call('pdfInProgress', (err, res) => {
	inProgress.set(res);
});

Template.mainContent.helpers({
	pdfComplete: function() {
		return complete.get();
	},
	pdfInProgress: function() {
		return inProgress.get();
	},
	pdfUploaded: function() {
		return list.get();
	}
});

Template.pdfsAll.helpers({
	list: function() {
		return list.get();
	}
});

Template.pdfsInProgress.helpers({
	list: function() {
		return inProgress.get();
	}
});

Template.pdfsComplete.helpers({
	list: function() {
		return complete.get();
	}
});

FlowRouter.route('/', {
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'mainContent' });
	}
});

let pdfs = FlowRouter.group({
	prefix: '/pdfs'
});

pdfs.route('/', {
	name: 'pdfs.all',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsAll' });
	}
});

pdfs.route('/inprogress', {
	name: 'pdfs.inprogress',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsInProgress' });
	}
});

pdfs.route('/complete', {
	name: 'pdfs.complete',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsComplete' });
	}
});
