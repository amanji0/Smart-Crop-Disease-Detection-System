import re
from deep_translator import GoogleTranslator
import concurrent.futures

keys_to_translate = {
    'mktAccess': "Marketplace Access",
    'mktAccessDesc': "Please login to access the B2B Marketplace and start trading directly.",
    'loginGoogle': "Login with Google",
    'directTrade': "Direct Trade",
    'mktTitle': "B2B Marketplace",
    'mktDesc': "Connect directly with buyers and sellers. Trade high-quality crops at the best prices with zero middlemen.",
    'schemesLabel': "GOVERNMENT INITIATIVES",
    'schemesTitle': "Farmer Welfare Schemes",
    'schemesDesc': "Complete guide to Central & State government schemes — with benefits, eligibility, and direct apply links.",
    'centralSchemes': "🏛️ Central Govt Schemes",
    'stateSchemes': "🗺️ State-wise Schemes",
}

langs = ['bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'or']

def translate_string(s, lang):
    translator = GoogleTranslator(source='en', target=lang)
    try:
        return s, translator.translate(s)
    except Exception as e:
        return s, s

print("Translating missing keys concurrently...")

lang_translations = {}

with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    for lang in langs:
        lang_translations[lang] = {}
        futures = {executor.submit(translate_string, v, lang): k for k, v in keys_to_translate.items()}
        for future in concurrent.futures.as_completed(futures):
            k = futures[future]
            _, trans = future.result()
            lang_translations[lang][k] = trans

with open('Frontend/src/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

for lang in langs:
    # Build the string to insert
    insert_str = "\n    // Marketplace & Schemes\n"
    for k, v in lang_translations[lang].items():
        # Escape quotes
        v_escaped = v.replace('"', '\\"')
        insert_str += f'    {k}: "{v_escaped}",\n'
    
    # We find the end of the lang block. It usually ends with footerTagline: "..."
    # We'll use regex to inject right before the closing brace of that lang's object.
    pattern = r'(  ' + lang + r': \{[\s\S]*?)(  \},)'
    match = re.search(pattern, content)
    if match:
        content = content[:match.end(1)] + insert_str + content[match.start(2):]
    else:
        print(f"Could not find block for {lang}")

with open('Frontend/src/i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating i18n.js")
