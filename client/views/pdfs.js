Template.pdfsAll.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['uploaded']);
});

Template.pdfsAll.helpers({
	list() {
		return Uploads.find().fetch();
	}
});

FlowRouter.route('/pdfs', {
	name: 'pdfs.all',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsAll' });
	}
});
