import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveDict } from 'meteor/reactive-dict';
import SimpleSchema from 'simpl-schema';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

SimpleSchema.extendOptions(['autoform']);

import { schemas } from "../imports/schemas/schemas";
import { Tags } from "../imports/tags/tags";

import './main.css';
import './main.html';

Template.body.onCreated(function helloOnCreated() {
	// counter starts at 0
	const instance = this;
	instance.state = new ReactiveDict();
	instance.state.set('types', Object.values(schemas));
	instance.state.set('insertDoc', "");
	instance.state.set('doc', null);

	instance.autorun(function () {
		const doc = instance.state.get('doc');
		if (doc) {
			instance.state.set('insertDoc', JSON.stringify(doc, null, 2));
		}
	});
});

Template.body.helpers({
	schema(type) {
		const def = schemas[type];
		return new SimpleSchema(def.schema, { tracker: Tracker });
	},
	tags() {
		return Tags.find();
	},
	types() {
		return Template.instance().state.get('types');
	},
	active(type) {
		return Template.instance().state.get('current') === type;
	},
	current() {
		return Template.instance().state.get('current');
	},
	code(type) {
		const def = schemas[type];
		return JSON.stringify(def.schema, (key, value) => typeof  value === 'function' ? value.name : value, 2);
	},
	insertDoc() {
		return Template.instance().state.get('insertDoc');
	},
	docs() {
		return Tags.find()
	},
	doc() {
		const doc = Template.instance().state.get('doc');
		console.log("return doc", doc);
		return doc;
	},
	initialValuesSchema() {
		return new SimpleSchema(initialValuesSchema, { tracker: Tracker });
	},
});

Template.body.events({
	'submit #tagsForm'(event, templateInstance) {
		event.preventDefault();
		const values = AutoForm.getFormValues('tagsForm');
		templateInstance.state.set('insertDoc', JSON.stringify(values.insertDoc, null, 2));

		const doc = templateInstance.state.get('doc');
		if (doc) {
			const { updateDoc } = values;
			Tags.update(doc._id, { $set: updateDoc.$set });
		} else {
			Tags.insert(values.insertDoc);
		}
		AutoForm.resetForm('tagsForm');
		templateInstance.state.set('doc', "");
	},
	'click .tab'(event, templateInstance) {
		event.preventDefault();
		AutoForm.resetForm('tagsForm');
		templateInstance.state.set('insertDoc', "");
		templateInstance.state.set('doc', "");
		const value = $(event.currentTarget).attr('data-target');
		templateInstance.state.set('current', value);
	},
	'click .edit-doc'(event, templateInstance) {
		event.preventDefault();

		const targetId = $(event.currentTarget).attr('data-target');
		console.log(targetId);
		const doc = Tags.findOne(targetId);
		console.log(doc);
		templateInstance.state.set('doc', doc);
	},
});
