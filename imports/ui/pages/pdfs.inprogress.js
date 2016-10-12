import './pdfs.inprogress.html';

let inProgress = new ReactiveVar();

Meteor.call('pdfInProgress', (err, res) => {
	inProgress.set(res);
});

Template.pdfsInProgress.helpers({
	list: function() {
		return inProgress.get();
	}
});

FlowRouter.route('/pdfs/inprogress', {
	name: 'pdfs.inprogress',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsInProgress' });
	}
});
