import './pdfs.pending.html';

Template.pdfsPending.onCreated(function() {
	Meteor.subscribe('list.pdfs', ['pending']);
});

Template.pdfsPending.helpers({
	list() {
		return Upload.find().fetch();
	}
});

Template.pdfsPending.events({
	'click .start'(event) {
		Meteor.call('startPdfProcess', event.target.dataset.id, (err, res) => {
			if (err) {
				console.log(err);
				return;
			}

			FlowRouter.go('/pdfs/inprogress');
		});
	}
});

FlowRouter.route('/pdfs/pending', {
	name: 'pdfs.all',
	action: () => {
		BlazeLayout.render('mainLayout', { content: 'pdfsPending' });
	}
});
