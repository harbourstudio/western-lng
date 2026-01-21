'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { Search, ChevronDown, LoaderCircle } from 'lucide-react';

type Category = {
  _id: string;
  title: string | null;
  slug: string | null;
};

type PostFiltersProps = {
  categories: Category[];
};

type FilterDropdownProps = {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = 'Please select an option',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const displayText =
    selectedValues.length === 0
      ? placeholder
      : selectedValues.length === 1
        ? options.find((o) => o.value === selectedValues[0])?.label || placeholder
        : `${selectedValues.length} selected`;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-heading font-medium mb-3">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full text-left py-5 px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <span className={`text-left ${selectedValues.length === 0 ? 'text-base/50' : '' }`}>
          {displayText}
        </span>
        <ChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
          <ul className='max-h-60 overflow-auto'>
            {options.map((option) => (
              <li>
                <label
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleToggle(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mr-3"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function PostFilters({ categories }: PostFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for filters (not applied until "Apply" is clicked)
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedDates, setSelectedDates] = useState<string[]>(
    searchParams.get('date')?.split(',').filter(Boolean) || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category')?.split(',').filter(Boolean) || []
  );

  const hasActiveFilters =
    searchParams.get('search') ||
    searchParams.get('date') ||
    searchParams.get('category');

  const applyFilters = useCallback(() => {
    startTransition(() => {
      const params = new URLSearchParams();

      if (search) params.set('search', search);
      if (selectedDates.length > 0) params.set('date', selectedDates.join(','));
      if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));

      const queryString = params.toString();
      router.push(queryString ? `/news?${queryString}` : '/news');
    });
  }, [search, selectedDates, selectedCategories, router]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedDates([]);
    setSelectedCategories([]);

    startTransition(() => {
      router.push('/news');
    });
  }, [router]);

  // Generate date options (last 12 months)
  const dateOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
  });

  const categoryOptions = categories.map((cat) => ({
    value: cat.slug || '',
    label: cat.title || '',
  }));

  return (
    <div className="postFilters mb-7 flex gap-5">
      <div className="filter-fields grow grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-heading font-medium mb-3">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base" />
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Please type a term"
              className="w-full placeholder:text-base/50 pl-[3rem] py-5 pr-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Date Filter */}
        <FilterDropdown
          label="Date"
          options={dateOptions}
          selectedValues={selectedDates}
          onChange={setSelectedDates}
        />

        {/* Category Filter */}
        <FilterDropdown
          label="Article Type"
          options={categoryOptions}
          selectedValues={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>

      {/* Action Buttons */}
      <div className="filter-actions flex justify-end items-end gap-4 mt-4">
        <button
          type="button"
          onClick={applyFilters}
          className="btn h-[4.75rem]"
        >
          {isPending ? 
          <span className='inline-flex justify-center items-center'>
            <svg aria-hidden="true" className="w-4 h-4 text-white/50 animate-spin fill-white me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          Loading...
          </span>
          : 'Apply Filters'}
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            disabled={isPending}
            className="btn !bg-gray-200 text-heading h-[4.75rem]"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
