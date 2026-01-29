import { useEffect, useCallback } from 'react';

export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; meta?: boolean; shift?: boolean; alt?: boolean } = {}
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { ctrl = false, meta = false, shift = false, alt = false } = modifiers;

      const ctrlMatch = ctrl ? event.ctrlKey : !event.ctrlKey;
      const metaMatch = meta ? event.metaKey : !event.metaKey;
      const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
      const altMatch = alt ? event.altKey : !event.altKey;

      // Handle Cmd/Ctrl as interchangeable
      const modifierMatch = modifiers.meta || modifiers.ctrl
        ? (event.metaKey || event.ctrlKey) && shiftMatch && altMatch
        : ctrlMatch && metaMatch && shiftMatch && altMatch;

      if (event.key.toLowerCase() === key.toLowerCase() && modifierMatch) {
        event.preventDefault();
        callback();
      }
    },
    [key, callback, modifiers]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcut;
