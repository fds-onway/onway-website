import React from 'react';

interface TagsSelectProps {
  value: string[];
  onChange: (tags: string[]) => void;
  availableTags?: string[];
}

export function TagsSelect({
  value,
  onChange,
  availableTags = [],
}: TagsSelectProps) {
  const [input, setInput] = React.useState('');

  function handleAddTag(tag: string) {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
      setInput('');
    }
  }

  function handleRemoveTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && input.trim()) {
      handleAddTag(input.trim());
    }
  }

  return (
    <div>
      <label>Tags</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
          >
            {tag}
            <button
              type="button"
              className="ml-1 text-xs"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="border rounded px-2 py-1"
          placeholder="Adicionar tag"
          list="tags-list"
        />
        <datalist id="tags-list">
          {availableTags.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
