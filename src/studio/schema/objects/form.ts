import { defineField, defineType } from 'sanity';
import { heading } from '../fields/heading';
import { content } from '../fields/content';
import { spacing } from '../fields/spacing';

export default defineType({
  name: 'form',
  type: 'object',
  title: 'Form',
  fields: [
    heading,
    content,
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formField' }],
      validation: (Rule) => Rule.min(1).error('Add at least one form field'),
    }),
    defineField({
      name: 'submitButton',
      title: 'Submit Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Submit',
          validation: (Rule) => Rule.required(),
        })
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      description: 'Message displayed after successful form submission',
      validation: (Rule) => Rule.required(),
      initialValue: 'Thank you for your submission!',
    }),
    defineField({
      name: 'mailchimpConfig',
      title: 'Mailchimp Configuration',
      type: 'object',
      description: 'Mailchimp integration settings',
      fields: [
        defineField({
          name: 'audienceId',
          title: 'Audience ID',
          type: 'string',
          description: 'Your Mailchimp audience/list ID',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    {
      ...spacing,
      fields: spacing.fields?.map((field) => {
        if (field.name === 'top') {
          return { ...field, initialValue: 'pt-10' };
        }
        return field;
      }),
    },
  ],
  preview: {
    select: {
      fields: 'fields',
      heading: 'heading.content',
    },
    prepare({ fields, heading }) {
      const fieldCount = fields?.length || 0;
      return {
        title: heading || 'Form',
        subtitle: `${fieldCount} field${fieldCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
