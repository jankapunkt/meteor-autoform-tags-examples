export const schemas = {

	minimal: {
		value: 'minimal',
		label: 'Minimal',
		schema: {
			tags: {
				type: Array,			// all tags will be saved in an array
				autoform: {
					type: 'tags',		// indicate to use tags add-on
				},
			},
			'tags.$': {
				type: String,
			}
		}
	},

	limitations: {
		value: 'limitations',
		label: 'With limitations',
		schema: {
			tags: {
				type: Array,			// all tags will be saved in an array
				minCount: 2,			// minimum number of tags
				maxCount: 8,			// maximum number of tags
				autoform: {
					type: 'tags',		// indicate to use tags add-on
					max: 16,			// max length of a tag in chars
					min: 4,				// min length of a tag in chars
				},
			},
			'tags.$': {
				type: String,
			}
		}
	},

	supportive: {
		value: 'supportive',
		label: 'Supportive',
		schema: {
			tags: {
				type: Array,			// all tags will be saved in an array
				autoform: {
					placeholder: 'Enter a tag...',
					type: 'tags',		// indicate to use tags add-on
					options: () => ['apple', 'cherry', 'orange'],	// list of tags to be suggested
				},
			},
			'tags.$': {
				type: String,
			}
		}
	},

	full: {
		value: 'full',
		label: 'Full functionality',
		schema: {
			tags: {
				type: Array,			// all tags will be saved in an array
				minCount: 2,			// minimum number of tags
				maxCount: 8,			// maximum number of tags
				autoform: {
					placeholder: 'Enter a tag...',
					type: 'tags',		// indicate to use tags add-on
					max: 16,			// max length of a tag in chars
					min: 4,				// min length of a tag in chars
					options: () => ['apple', 'cherry', 'orange'],	// list of tags to be suggested
					onlyOptions: true,  // if true only values in options are allowed
				},
			},
			'tags.$': {
				type: String,
			}
		}
	}
};
