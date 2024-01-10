export const TEST_CONFIG = {
  city: 'gdańsk',
  showSlug: 'kiedy-kota-nie-ma-44',
  eventId: '255346',
};

export function removePolishCharacters(input: string): string {
  const polishChars = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
  };
  
  return input.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, char => polishChars[char] || char);
}

export const ANY_SIGN = new RegExp(/^\s*\S.*\S\s*$/);

