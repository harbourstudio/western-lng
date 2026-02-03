import { defineField, defineType } from 'sanity';
import { createRadioListLayout } from '@/utils/schema';

const fieldTypes = [
  'text',
  'email',
  'tel',
  'textarea',
  'select',
  'checkbox',
  'checkboxGroup',
  'radio',
  'file',
  'date',
  'datetime',
];

const widthOptions = [
  { title: 'Full Width', value: 'full' },
  { title: 'Half Width', value: 'half' },
];

export default defineType({
  name: 'formField',
  type: 'object',
  title: 'Form Field',
  fields: [
    defineField({
      name: 'fieldType',
      title: 'Field Type',
      type: 'string',
      options: createRadioListLayout(fieldTypes),
      validation: (Rule) => Rule.required(),
      initialValue: 'text',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The label displayed above the field',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Field Name',
      type: 'slug',
      description: 'Unique identifier for this field (used for form submission). Click "Generate" to create from label.',
      options: {
        source: 'label',
        maxLength: 50,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 50),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description: 'Placeholder text shown in the input field',
    }),
    defineField({
      name: 'helpText',
      title: 'Help Text',
      type: 'string',
      description: 'Additional help text displayed below the field',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      description: 'Mark this field as required',
      initialValue: false,
    }),
    defineField({
      name: 'width',
      title: 'Field Width',
      type: 'string',
      options: {
        list: widthOptions,
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description: 'Options for select, radio, or checkbox group fields',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({ label, value }) {
              return {
                title: label,
                subtitle: `Value: ${value}`,
              };
            },
          },
        },
      ],
      hidden: ({ parent }) =>
        !['select', 'radio', 'checkboxGroup'].includes(parent?.fieldType),
      validation: (Rule) =>
        Rule.custom((options, context) => {
          const fieldType = (context.parent as { fieldType?: string })?.fieldType;
          if (['select', 'radio', 'checkboxGroup'].includes(fieldType || '')) {
            if (!options || options.length === 0) {
              return 'At least one option is required for this field type';
            }
          }
          return true;
        }),
    }),
    defineField({
      name: 'validation',
      title: 'Validation',
      type: 'object',
      description: 'Validation rules for this field',
      fields: [
        defineField({
          name: 'minLength',
          title: 'Minimum Length',
          type: 'number',
          description: 'Minimum number of characters',
          hidden: ({ parent }) => {
            const fieldType = parent?._type;
            return !['text', 'textarea', 'email', 'tel'].includes(fieldType || '');
          },
        }),
        defineField({
          name: 'maxLength',
          title: 'Maximum Length',
          type: 'number',
          description: 'Maximum number of characters',
          hidden: ({ parent }) => {
            const fieldType = parent?._type;
            return !['text', 'textarea', 'email', 'tel'].includes(fieldType || '');
          },
        }),
        defineField({
          name: 'pattern',
          title: 'Pattern (Regex)',
          type: 'string',
          description: 'Regular expression pattern for validation',
          hidden: ({ parent }) => {
            const fieldType = parent?._type;
            return !['text', 'tel'].includes(fieldType || '');
          },
        }),
      ],
      hidden: ({ parent }) =>
        !['text', 'textarea', 'email', 'tel'].includes(parent?.fieldType),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      fieldType: 'fieldType',
      required: 'required',
    },
    prepare({ label, fieldType, required }) {
      return {
        title: label || 'Untitled Field',
        subtitle: `${fieldType}${required ? ' (Required)' : ''}`,
      };
    },
  },
});
