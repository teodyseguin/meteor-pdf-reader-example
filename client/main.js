// meteor packages
import { Template } from 'meteor/templating';
// npm packages
import _ from 'lodash';
// templates
import './main.html';
// UI imports
import '../imports/ui/pages/pdfs.pending.js';
import '../imports/ui/pages/pdfs.inprogress.js';
import '../imports/ui/pages/pdfs.complete.js';
import '../imports/ui/pages/pdfs.id.js';

let totalUploads = 0;

Template.mainContent.onCreated(function() {
	Meteor.subscribe('list.pdfs', [
		'pending', 
		'inprogress', 
		'complete'
	]);
});

/**
 * Helper functions to get the total count of PDF's
 * per complete, in progress and pending

 * @TODO
 * 1. on each of this helper, check to see if the file
 * they are checking in from the database, also exists
 * physically on the corresponding directory path
 */
Template.mainContent.helpers({
	pdfComplete: function() {
		let result = Upload.find().fetch(),
			totalComplete = _.filter(result, ['status', 'complete']).length;

		totalUploads += totalComplete;

		return totalComplete;
	},
	pdfInProgress: function() {
		let result = Upload.find().fetch(),
			totalInProgress = _.filter(result, ['status', 'inprogress']).length;

		totalUploads += totalInProgress;

		return totalInProgress;
	},
	pdfPending: function() {
		let result = Upload.find().fetch(),
			totalPending = _.filter(result, ['status', 'pending']).length;

		totalUploads += totalPending;

		return totalPending;
	},
	pdfTotalUploads: function() {
		return totalUploads;
	}
});

FlowRouter.route('/', {
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'mainContent' });
	}
});
