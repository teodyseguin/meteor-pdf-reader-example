let list = new ReactiveVar();

Meteor.call('pdfList', (err, res) => {
	list.set(res);
});

Template.pdfsAll.helpers({
	list: function() {
		return list.get();
	}
});

FlowRouter.route('/pdfs', {
	name: 'pdfs.all',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsAll' });
	}
});
