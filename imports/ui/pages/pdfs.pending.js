import './pdfs.pending.html';

Template.pdfsPending.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['uploaded']);
});

Template.pdfsPending.helpers({
	list() {
		return Upload.find().fetch();
	}
});

FlowRouter.route('/pdfs/pending', {
	name: 'pdfs.all',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsPending' });
	}
});
