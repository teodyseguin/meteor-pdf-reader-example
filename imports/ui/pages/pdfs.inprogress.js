import './pdfs.inprogress.html';

Template.pdfsInProgress.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['inprogress']);
});

Template.pdfsInProgress.helpers({
	list() {
		return Upload.find().fetch();
	}
});

FlowRouter.route('/pdfs/inprogress', {
	name: 'pdfs.inprogress',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsInProgress' });
	}
});
