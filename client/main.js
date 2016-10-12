// meteor packages
import { Template } from 'meteor/templating';
// npm packages
import _ from 'lodash';
// templates
import './main.html';

import '../imports/ui/pages/pdfs.pending.js';
import '../imports/ui/pages/pdfs.inprogress.js';
import '../imports/ui/pages/pdfs.complete.js';

Template.mainContent.onCreated(function() {
	Meteor.subscribe('list.pdfs', [
		'pending', 
		'inprogress', 
		'complete'
	]);
});

Template.mainContent.helpers({
	pdfComplete: function() {
		let result = Upload.find().fetch();
		return _.filter(result, ['status', 'complete']).length;
	},
	pdfInProgress: function() {
		let result = Upload.find().fetch();
		return _.filter(result, ['status', 'inprogress']).length;
	},
	pdfPending: function() {
		let result = Upload.find().fetch();
		return _.filter(result, ['status', 'pending']).length;
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
