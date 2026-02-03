import type { FormFieldFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  field: FormFieldFragmentType;
  value: string | string[] | boolean;
  error?: string;
  onChange: (name: string, value: string | string[] | boolean) => void;
  onBlur: (name: string) => void;
}

export default function FormField({ field, value, error, onChange, onBlur }: FormFieldProps) {
  const fieldName = field.name?.current || field._key || '';
  const fieldType = field.fieldType || 'text';
  const fieldLabel = field.label || '';
  const fieldPlaceholder = field.placeholder || '';
  const fieldRequired = field.required || false;
  const fieldHelpText = field.helpText || '';
  const fieldOptions = field.options || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (fieldType === 'checkbox') {
      onChange(fieldName, (e.target as HTMLInputElement).checked);
    } else if (fieldType === 'checkboxGroup') {
      const checkboxValue = (e.target as HTMLInputElement).value;
      const currentValues = Array.isArray(value) ? value : [];

      if ((e.target as HTMLInputElement).checked) {
        onChange(fieldName, [...currentValues, checkboxValue]);
      } else {
        onChange(fieldName, currentValues.filter(v => v !== checkboxValue));
      }
    } else {
      onChange(fieldName, e.target.value);
    }
  };

  const handleBlur = () => {
    onBlur(fieldName);
  };

  const renderInput = () => {
    switch (fieldType) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={fieldType}
            id={fieldName}
            name={fieldName}
            value={value as string || ''}
            placeholder={fieldPlaceholder}
            required={fieldRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error ? 'error' : ''}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={fieldName}
            name={fieldName}
            value={value as string || ''}
            placeholder={fieldPlaceholder}
            required={fieldRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className={error ? 'error' : ''}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
          />
        );

      case 'select':
        return (
          <select
            id={fieldName}
            name={fieldName}
            value={value as string || ''}
            required={fieldRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error ? 'error' : ''}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
          >
            <option value="">Please select an option</option>
            {fieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={fieldName}
              name={fieldName}
              checked={value as boolean || false}
              required={fieldRequired}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-invalid={!!error}
              aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
            />
            <label htmlFor={fieldName}>
              {fieldLabel}
              {fieldRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case 'checkboxGroup':
        return (
          <div className="space-y-2">
            {fieldOptions.map((option) => {
              const optionId = `${fieldName}-${option.value}`;
              const isChecked = Array.isArray(value) && value.includes(option.value);

              return (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={optionId}
                    name={fieldName}
                    value={option.value}
                    checked={isChecked}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-invalid={!!error}
                  />
                  <label htmlFor={optionId}>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {fieldOptions.map((option) => {
              const optionId = `${fieldName}-${option.value}`;

              return (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={optionId}
                    name={fieldName}
                    value={option.value}
                    checked={value === option.value}
                    required={fieldRequired}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-invalid={!!error}
                  />
                  <label htmlFor={optionId}>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            id={fieldName}
            name={fieldName}
            required={fieldRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              'w-full',
              error ? 'text-red-500' : ''
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
          />
        );

      case 'date':
      case 'datetime':
        return (
          <input
            type={fieldType === 'date' ? 'date' : 'datetime-local'}
            id={fieldName}
            name={fieldName}
            value={value as string || ''}
            required={fieldRequired}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error ? 'error' : ''}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldName}-error` : fieldHelpText ? `${fieldName}-help` : undefined}
          />
        );

      default:
        return null;
    }
  };

  // Don't render label for checkbox (it's rendered inline)
  const showLabel = fieldType !== 'checkbox';

  return (
    <div className="component-form-field">
      {showLabel && (
        <label htmlFor={fieldName}>
          {fieldLabel}
          {fieldRequired && <span className="marker-required">*</span>}
        </label>
      )}

      {renderInput()}

      {fieldHelpText && (
        <p id={`${fieldName}-help`} className="text-sm text-gray-600 mt-1">
          {fieldHelpText}
        </p>
      )}

      {error && (
        <p id={`${fieldName}-error`} className="message-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
