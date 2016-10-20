import './pdfs.complete.html';

Template.pdfsComplete.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['complete']);
});

Template.pdfsComplete.helpers({
	list() {
		return Upload.find().fetch();
	}
});

FlowRouter.route('/pdfs/complete', {
	name: 'pdfs.complete',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsComplete' });
	}
});
