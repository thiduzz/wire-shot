const baseUrl = "https://api.airtable.com/v0/appsi42NfUICeXTZy/";
const makeUrl = (tableName: string) => {
  return `${baseUrl}${tableName}?api_key=${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`;
};

export { makeUrl };
