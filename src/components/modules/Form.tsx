'use client';

import { useState, FormEvent } from 'react';
import type { PortableTextBlock } from 'next-sanity';
import type { FormFragmentType, FormFieldFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import PortableText from '@/components/modules/PortableText';
import FormField from '@/components/modules/FormField';
import { Button } from '@/components/ui/Button';
import { cn, cleanString } from '@/lib/utils';

type FormValues = Record<string, string | string[] | boolean>;
type FormErrors = Record<string, string>;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type HeadingLevel = (typeof validHeadingLevels)[number];

function getHeadingTag(level: string | undefined): HeadingLevel {
  const cleaned = cleanString(level);
  if (validHeadingLevels.includes(cleaned as HeadingLevel)) {
    return cleaned as HeadingLevel;
  }
  return 'h2';
}

function validateField(field: FormFieldFragmentType, value: string | string[] | boolean): string | null {
  const stringValue = typeof value === 'string' ? value : '';
  const arrayValue = Array.isArray(value) ? value : [];
  const boolValue = typeof value === 'boolean' ? value : false;

  // Required check
  if (field.required) {
    if (field.fieldType === 'checkbox' && !boolValue) {
      return `${field.label} is required`;
    }
    if (field.fieldType === 'checkboxGroup' && arrayValue.length === 0) {
      return `${field.label} is required`;
    }
    if (field.fieldType !== 'checkbox' && field.fieldType !== 'checkboxGroup' && !stringValue) {
      return `${field.label} is required`;
    }
  }

  // Skip other validations if empty and not required
  if (!stringValue && !field.required) {
    return null;
  }

  // Email validation
  if (field.fieldType === 'email' && stringValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(stringValue)) {
      return 'Please enter a valid email address';
    }
  }

  // Phone validation with pattern
  if (field.fieldType === 'tel' && stringValue && field.validation?.pattern) {
    try {
      const phoneRegex = new RegExp(field.validation.pattern);
      if (!phoneRegex.test(stringValue)) {
        return 'Please enter a valid phone number';
      }
    } catch {
      // Invalid regex pattern
    }
  }

  // Pattern validation for text fields
  if (field.fieldType === 'text' && stringValue && field.validation?.pattern) {
    try {
      const patternRegex = new RegExp(field.validation.pattern);
      if (!patternRegex.test(stringValue)) {
        return 'Please enter a valid format';
      }
    } catch {
      // Invalid regex pattern
    }
  }

  // Length validation
  if (stringValue && field.validation?.minLength && stringValue.length < field.validation.minLength) {
    return `Minimum ${field.validation.minLength} characters required`;
  }

  if (stringValue && field.validation?.maxLength && stringValue.length > field.validation.maxLength) {
    return `Maximum ${field.validation.maxLength} characters allowed`;
  }

  return null;
}

export default function Form({ section }: { section: FormFragmentType }) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const HeadingTag = section.heading ? getHeadingTag(section.heading.level) : 'h2';
  const headingContent = section.heading?.content;
  const headingSize = section.heading?.size;
  const headingColor = section.heading?.color;

  const spacingTop = cleanString(section?.spacing?.top) || '';
  const spacingBottom = cleanString(section?.spacing?.bottom) || '';

  const handleFieldChange = (name: string, value: string | string[] | boolean) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear success/error state when user modifies form
    if (submitState !== 'idle' && submitState !== 'submitting') {
      setSubmitState('idle');
      setErrorMessage('');
    }
  };

  const handleFieldBlur = (name: string) => {
    const field = section.fields?.find(f => f.name?.current === name);
    if (!field) return;

    const error = validateField(field, formValues[name]);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};

    section.fields?.forEach(field => {
      const fieldName = field.name?.current || field._key || '';
      if (!fieldName) return;

      const error = validateField(field, formValues[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audienceId: section.mailchimpConfig?.audienceId,
          formData: formValues,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitState('success');
      setFormValues({}); // Reset form
    } catch (error) {
      setSubmitState('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={cn('component-form row', spacingTop, spacingBottom)}>

      {(headingContent || section.content) &&
        <div className='col lg:w-5/12'>
          <div className='max-w-3xl lg:pr-8'>
            {headingContent && (
              <HeadingTag className={cn('mb-4', headingSize, headingColor)}>
                {headingContent}
              </HeadingTag>
            )}

            {section.content && (
              <PortableText value={section.content as PortableTextBlock[]} />
            )}
          </div>
        </div>
      }
      <form onSubmit={handleSubmit} noValidate className='col lg:w-7/12'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.fields?.map((field) => {
            const fieldName = field.name?.current || field._key || '';
            if (!fieldName) return null;

            return (
              <div
                key={fieldName}
                className={field.width == 'half' ? 'col-span-1' : 'col-span-full'}
              >
                <FormField
                  field={field}
                  value={formValues[fieldName] || (field.fieldType === 'checkboxGroup' ? [] : field.fieldType === 'checkbox' ? false : '')}
                  error={errors[fieldName]}
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                />
              </div>
            );
          })}
        </div>

        {submitState === 'success' && section.successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-sm mt-6 animate-in fade-in duration-300">
            {section.successMessage}
          </div>
        )}

        {submitState === 'error' && errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-sm mt-6 animate-in fade-in duration-300">
            {errorMessage}
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            disabled={submitState === 'submitting'}
            className={cn(
              submitState === 'submitting' && 'opacity-50 cursor-not-allowed'
            )}
          >
            {submitState === 'submitting' ? 'Submitting...' : (section.submitButton?.text || 'Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
