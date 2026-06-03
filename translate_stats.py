import json
from deep_translator import GoogleTranslator
import concurrent.futures

strings_to_translate = [
    'Active Schemes',
    'Total Budget',
    'Farmers Covered',
    'States Covered',
    '₹1.5L Cr+',
    '15+ Cr'
]

langs = ['hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'or']

# Load existing translations
with open('Frontend/src/data/schemesTranslations.js', 'r', encoding='utf-8') as f:
    content = f.read()
    # It starts with export const schemeTranslations = { ... };
    json_str = content.replace('export const schemeTranslations = ', '').rstrip(';\n')
    translations = json.loads(json_str)

for s in strings_to_translate:
    translations['en'][s] = s

def translate_string(s, lang):
    translator = GoogleTranslator(source='en', target=lang)
    try:
        return s, translator.translate(s)
    except Exception as e:
        return s, s

print("Translating new strings concurrently...")
with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    for lang in langs:
        futures = {executor.submit(translate_string, s, lang): s for s in strings_to_translate}
        for future in concurrent.futures.as_completed(futures):
            s, trans = future.result()
            translations[lang][s] = trans

with open('Frontend/src/data/schemesTranslations.js', 'w', encoding='utf-8') as f:
    f.write("export const schemeTranslations = ")
    json.dump(translations, f, ensure_ascii=False, indent=2)
    f.write(";\n")
print("Done!")
