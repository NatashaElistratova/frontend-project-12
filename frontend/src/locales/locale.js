export default {
  string: {
    required: () => ({ key: 'errors.validation.required' }),
  },
  mixed: {
    notOneOf: () => ({ key: 'errors.validation.notOneOf' }),
  },
};
