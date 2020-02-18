// @flow

export const formatSuggestions = (
  suggestions: Array<string>
): Array<Object> => {
  if (!suggestions) {
    return [];
  }
  return suggestions.map(name => ({ name: `(${name})`, suggestion: name }));
};

export const suggestionsFilter = (
  searchValue: string,
  suggestions: Array<string>
): Array<Object> => {
  if (!suggestions) {
    return [];
  }

  const v = searchValue.toLowerCase();
  const filtered = suggestions.filter(
    s => !v || s.toLowerCase().indexOf(v) > -1
  );

  const length = filtered.length < 10 ? filtered.length : 10;

  return formatSuggestions(filtered.slice(0, length));
};
