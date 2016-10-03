import { Template } from 'meteor/templating';

import './main.html';

Template.status.onCreated(function() {
	let self = this;

	self.complete = new ReactiveVar();
	self.inProgress = new ReactiveVar();
	self.list = new ReactiveVar();

	Meteor.call('pdfComplete', (err, res) => {
		self.complete.set(res);
	});
	Meteor.call('pdfList', (err, res) => {
		self.list.set(res);
	});
	Meteor.call('pdfInProgress', (err, res) => {
		self.inProgress.set(res);
	})
});

Template.status.helpers({
	pdfComplete: function() {
		return Template.instance().complete.get();
	},
	pdfInProgress: function() {
		return Template.instance().inProgress.get();
	},
	pdfUploaded: function() {
		return Template.instance().list.get();
	}
});
