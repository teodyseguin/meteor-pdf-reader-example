import { Template } from 'meteor/templating';

import './main.html';

let complete = new ReactiveVar(),
	inProgress = new ReactiveVar(),
	list = new ReactiveVar();

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

FlowRouter.route('/', {
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'mainContent' });
	}
});

FlowRouter.route('/pdfs/:pdfId', {
	name: 'pdfs.id',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsId' });
	}
});
