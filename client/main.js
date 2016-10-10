import { Template } from 'meteor/templating';

import _ from 'lodash';

import './main.html';

Template.mainContent.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['uploaded', 'inprogress', 'complete']);
});

Template.mainContent.helpers({
	pdfComplete: function() {
		let result = Uploads.find().fetch();
		return _.filter(result, ['status', 'complete']).length;
	},
	pdfInProgress: function() {
		let result = Uploads.find().fetch();
		return _.filter(result, ['status', 'inprogress']).length;
	},
	pdfUploaded: function() {
		let result = Uploads.find().fetch();
		return _.filter(result, ['status', 'uploaded']).length;
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
